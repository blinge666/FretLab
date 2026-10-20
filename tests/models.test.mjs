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
