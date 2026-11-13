import test from "node:test";
import assert from "node:assert/strict";
import { modelCatalog, findModel, applyModelSpecs } from "../src/models.mjs";
const id = "gibson-les-paul-standard-50s";
test("historical production years never match modern 50s reissue series", () => {
  assert.equal(findModel(id, 1959).kind, "not-found");
  assert.equal(findModel(id, 2018).kind, "not-found");
  assert.equal(findModel(id, 2021).kind, "match");
});
test("unknown model, malformed year and future year cannot return specifications", () => {
  assert.equal(findModel("unknown", 2021).kind, "not-found");
  for (const y of [
    "",
    "202",
    "2021junk",
    "1e03",
    String(new Date().getFullYear() + 1),
  ])
    assert.equal(findModel(id, y).kind, "invalid-year");
});
test("model variants have distinct pickups and neck profiles", () => {
  const a = findModel(id, 2021).model;
  const b = findModel("gibson-les-paul-standard-60s", 2021).model;
  assert.notEqual(a.specs.neckPickup, b.specs.neckPickup);
  assert.notEqual(a.specs.neckProfile, b.specs.neckProfile);
});
test("applying selected construction specs preserves measurements, strings and unselected overrides", () => {
  const original = {
    model: "Custom",
    year: "2000",
    scale: "Measured 630 mm",
    radius: "Measured",
    neckPickup: "Custom PAF",
    strings: "11–52",
    relief: "0.2 mm",
  };
  const copy = { ...original };
  const model = modelCatalog[0];
  const next = applyModelSpecs(original, model, 2021, [
    "radius",
    "__proto__",
    "relief",
  ]);
  assert.equal(next.radius, model.specs.radius);
  assert.equal(next.scale, original.scale);
  assert.equal(next.neckPickup, original.neckPickup);
  assert.equal(next.strings, original.strings);
  assert.equal(next.relief, original.relief);
  assert.equal(next.model, model.model);
  assert.equal(next.year, "2021");
  assert.deepEqual(original, copy);
});
test("unverified records never masquerade as verified factory sources or setup targets", () => {
  for (const model of modelCatalog) {
    assert.equal(model.status, "assumed");
    assert.equal(model.source.verifiedAt, null);
    for (const key of ["relief", "action", "pickupHeight"])
      assert.equal(Object.hasOwn(model.specs, key), false);
  }
});
test("catalogue ids are unique, stable and every spec key has a label", async () => {
  const { specLabels } = await import("../src/models.mjs");
  const ids = modelCatalog.map((m) => m.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes(id));
  assert.ok(ids.includes("epiphone-les-paul-standard-50s"));
  for (const model of modelCatalog) {
    assert.ok(model.introduced <= model.lastCatalogYear);
    for (const [key, value] of Object.entries(model.specs)) {
      assert.ok(Object.hasOwn(specLabels, key), `${model.id}: ${key}`);
      assert.ok(value.trim());
    }
  }
});
test("same model name from different manufacturers stays distinct and year-limited", () => {
  const gibson = findModel(id, 2021).model;
  const epiphone = findModel("epiphone-les-paul-standard-50s", 2021).model;
  assert.equal(gibson.model, epiphone.model);
  assert.notEqual(gibson.manufacturer, epiphone.manufacturer);
  assert.notEqual(gibson.specs.fingerboard, epiphone.specs.fingerboard);
  assert.equal(
    findModel("epiphone-les-paul-standard-50s", 2019).kind,
    "not-found",
  );
  assert.equal(findModel("gibson-les-paul-studio", 2023).kind, "match");
  assert.equal(findModel("gibson-les-paul-studio", 2024).kind, "not-found");
});
test("picker steps narrow from manufacturer to family to model without losing entries", async () => {
  const { catalogManufacturers, catalogFamilies, catalogModels } =
    await import("../src/models.mjs");
  assert.deepEqual(catalogManufacturers(), [
    "Gibson",
    "Epiphone",
    "Fender",
    "Ibanez",
  ]);
  assert.deepEqual(catalogFamilies("Gibson"), ["Les Paul", "SG"]);
  assert.deepEqual(catalogFamilies("Fender"), ["Stratocaster", "Telecaster"]);
  assert.deepEqual(catalogFamilies("Ukjent"), []);
  assert.deepEqual(catalogModels("Fender", "SG"), []);
  const reached = catalogManufacturers().flatMap((maker) =>
    catalogFamilies(maker).flatMap((family) => catalogModels(maker, family)),
  );
  assert.deepEqual(
    reached.map((m) => m.id).sort(),
    modelCatalog.map((m) => m.id).sort(),
  );
  for (const m of catalogModels("Epiphone", "Les Paul"))
    assert.equal(m.manufacturer, "Epiphone");
});
test("every entry belongs to a family and Fender shapes differ only where they should", () => {
  for (const model of modelCatalog) {
    assert.ok(model.family, model.id);
    assert.match(model.id, /^[a-z0-9-]+$/);
  }
  const strat = findModel("fender-player-ii-stratocaster", 2025).model;
  const tele = findModel("fender-player-ii-telecaster", 2025).model;
  assert.equal(strat.family, "Stratocaster");
  assert.equal(tele.family, "Telecaster");
  assert.ok(strat.specs.middlePickup);
  assert.equal(Object.hasOwn(tele.specs, "middlePickup"), false);
  assert.notEqual(strat.specs.bridge, tele.specs.bridge);
  assert.equal(strat.specs.scale, tele.specs.scale);
  assert.equal(findModel("fender-player-stratocaster", 2025).kind, "not-found");
  assert.equal(
    findModel("fender-player-ii-stratocaster", 2023).kind,
    "not-found",
  );
  assert.equal(findModel("gibson-sg-standard-61", 2021).kind, "match");
});
test("Ibanez families come from the record, not from letters in the model name", async () => {
  const { catalogFamilies, catalogModels } = await import("../src/models.mjs");
  assert.deepEqual(catalogFamilies("Ibanez"), ["RG", "S", "AZ"]);
  assert.deepEqual(
    catalogModels("Ibanez", "S").map((m) => m.id),
    ["ibanez-s521"],
  );
  assert.equal(findModel("ibanez-azes40", 2020).kind, "not-found");
  const azes = findModel("ibanez-azes40", 2022).model;
  assert.notEqual(
    azes.specs.scale,
    findModel("ibanez-rg421", 2022).model.specs.scale,
  );
  for (const m of modelCatalog.filter((x) => x.manufacturer !== "Ibanez"))
    assert.notEqual(m.family, "S");
});
