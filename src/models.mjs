// Curated reference data. A model match never verifies an individual instrument.
export const catalogVersion = "2026-11-13.2";
const unverifiedNote =
  "Produsentens nettside kunne ikke kontrolleres under registrering. Verdiene er antatte modellstandarder og ikke dokumenterte fabrikkdata for valgt årgang.";
const gibsonSource = {
  title: "Gibson – Les Paul-kolleksjonen",
  url: "https://www.gibson.com/en-US/Collection/les-paul",
  verifiedAt: null,
  note: unverifiedNote,
};
const epiphoneSource = {
  title: "Epiphone – Les Paul-kolleksjonen",
  url: "https://www.epiphone.com/en-US/Collection/les-paul",
  verifiedAt: null,
  note: unverifiedNote,
};
const base = {
  scale: "24,75 tommer (628,65 mm)",
  radius: "12 tommer (304,8 mm)",
  fretCount: "22",
  fretSize: "Medium jumbo",
};
const gibsonUsa = {
  ...base,
  nut: "Graph Tech",
  nutWidth: "1,695 tommer (ca. 43,05 mm)",
  fingerboard: "Palisander",
};
const common = {
  ...gibsonUsa,
  bridge: "ABR-1 Tune-o-matic / aluminium Stop Bar",
  body: "Mahogni med lønnetopp",
};
const nashville = "Nashville Tune-o-matic (aluminium) / aluminium Stop Bar";
const epiphoneStandard = {
  ...base,
  nut: "Graph Tech",
  nutWidth: "43 mm (ca. 1,69 tommer)",
  bridge: "Epiphone LockTone Tune-o-matic / LockTone Stop Bar",
  fingerboard: "Indisk laurbær",
  body: "Mahogni med lønnetopp",
};
/** Fields left out of a record are unknown or too uncertain to suggest. */
const entry = (manufacturer, model, source, specs, range = {}) => ({
  family: "Les Paul",
  id: `${manufacturer} ${model}`.toLowerCase().replaceAll(" ", "-"),
  manufacturer,
  model,
  introduced: 2019,
  lastCatalogYear: 2026,
  status: "assumed",
  source,
  specs,
  ...range,
});
/** @typedef {{id:string, manufacturer:string, family:string, model:string, introduced:number, lastCatalogYear:number, status:string, source: typeof gibsonSource, specs:Record<string,string>}} ModelEntry */
/** @type {ModelEntry[]} */
export const modelCatalog = [
  entry("Gibson", "Les Paul Standard 50s", gibsonSource, {
    ...common,
    neckProfile: "Vintage 50s",
    neckPickup: "Burstbucker 1 (humbucker)",
    bridgePickup: "Burstbucker 2 (humbucker)",
  }),
  entry("Gibson", "Les Paul Standard 60s", gibsonSource, {
    ...common,
    neckProfile: "SlimTaper",
    neckPickup: "Burstbucker 61R (humbucker)",
    bridgePickup: "Burstbucker 61T (humbucker)",
  }),
  entry("Gibson", "Les Paul Classic", gibsonSource, {
    ...gibsonUsa,
    bridge: nashville,
    body: "Mahogni med lønnetopp (9-hulls vektlette)",
    neckProfile: "SlimTaper",
    neckPickup: "Burstbucker 61R (åpen humbucker)",
    bridgePickup: "Burstbucker 61T (åpen humbucker)",
  }),
  // The Studio was respecified for 2024 (pickups, neck binding); only the earlier version is covered.
  entry(
    "Gibson",
    "Les Paul Studio",
    gibsonSource,
    {
      ...gibsonUsa,
      bridge: nashville,
      body: "Mahogni med lønnetopp (Ultra-Modern vektlette)",
      neckProfile: "SlimTaper",
      neckPickup: "490R (humbucker)",
      bridgePickup: "498T (humbucker)",
    },
    { lastCatalogYear: 2023 },
  ),
  entry("Gibson", "Les Paul Modern", gibsonSource, {
    ...gibsonUsa,
    radius: "Sammensatt, 10–16 tommer (254–406,4 mm)",
    fingerboard: "Ibenholt",
    bridge: nashville,
    body: "Mahogni med lønnetopp (Ultra-Modern vektlette)",
    neckProfile: "Asymmetrisk SlimTaper",
    neckPickup: "Burstbucker Pro Rhythm (humbucker)",
    bridgePickup: "Burstbucker Pro Lead (humbucker)",
  }),
  // Nut material and neck profile vary between Custom Shop runs and are left out.
  entry("Gibson", "Les Paul Custom", gibsonSource, {
    ...base,
    nutWidth: "1,695 tommer (ca. 43,05 mm)",
    fingerboard: "Ibenholt",
    bridge: "ABR-1 Tune-o-matic / Stop Bar",
    body: "Mahogni med lønnetopp",
    neckPickup: "490R (humbucker)",
    bridgePickup: "498T (humbucker)",
  }),
  entry("Gibson", "Les Paul Junior", gibsonSource, {
    ...gibsonUsa,
    bridge: "Wraparound-stol",
    body: "Mahogni (flat, uten lønnetopp)",
    neckProfile: "Vintage 50s",
    neckPickup: "Ingen",
    bridgePickup: "P-90 Dog Ear (single coil)",
  }),
  entry("Gibson", "Les Paul Special", gibsonSource, {
    ...gibsonUsa,
    bridge: "Wraparound-stol",
    body: "Mahogni (flat, uten lønnetopp)",
    neckProfile: "Vintage 50s",
    neckPickup: "P-90 Soapbar (single coil)",
    bridgePickup: "P-90 Soapbar (single coil)",
  }),
  entry(
    "Epiphone",
    "Les Paul Standard 50s",
    epiphoneSource,
    {
      ...epiphoneStandard,
      neckProfile: "50s Rounded Medium C",
      neckPickup: "ProBucker 1 (humbucker)",
      bridgePickup: "ProBucker 2 (humbucker)",
    },
    { introduced: 2020 },
  ),
  entry(
    "Epiphone",
    "Les Paul Standard 60s",
    epiphoneSource,
    {
      ...epiphoneStandard,
      neckProfile: "SlimTaper 60s C",
      neckPickup: "ProBucker 2 (humbucker)",
      bridgePickup: "ProBucker 3 (humbucker)",
    },
    { introduced: 2020 },
  ),
];
/** Picker steps: manufacturer, then model family, then exact model. Catalogue order is kept. */
export const catalogManufacturers = () => [
  ...new Set(modelCatalog.map((m) => m.manufacturer)),
];
export const catalogFamilies = (manufacturer) => [
  ...new Set(
    modelCatalog
      .filter((m) => m.manufacturer === manufacturer)
      .map((m) => m.family),
  ),
];
export const catalogModels = (manufacturer, family) =>
  modelCatalog.filter(
    (m) => m.manufacturer === manufacturer && m.family === family,
  );
export const specLabels = {
  scale: "Mensur",
  radius: "Gripebrettradius",
  nut: "Oversadelmateriale",
  nutWidth: "Oversadelbredde",
  bridge: "Stoltype",
  fretCount: "Antall bånd",
  fretSize: "Båndstørrelse",
  fingerboard: "Gripebrett",
  body: "Kropp",
  neckProfile: "Halsprofil",
  neckPickup: "Pickup – hals",
  bridgePickup: "Pickup – stol",
};
/** @returns {{kind:'match', model:ModelEntry, year:number, message:string} | {kind:'invalid-year'|'not-found',message:string}} */
export function findModel(modelId, year) {
  const model = modelCatalog.find((m) => m.id === modelId);
  const text = String(year).trim();
  if (!/^\d{4}$/.test(text))
    return {
      kind: "invalid-year",
      message: "Oppgi et firesifret produksjonsår.",
    };
  const number = Number(text);
  if (number < 1900 || number > new Date().getFullYear())
    return {
      kind: "invalid-year",
      message: "Oppgi et gyldig produksjonsår, senest inneværende år.",
    };
  if (!model)
    return {
      kind: "not-found",
      message:
        "Modellen finnes ikke i biblioteket ennå. Du kan registrere gitaren manuelt.",
    };
  if (number < model.introduced || number > model.lastCatalogYear)
    return {
      kind: "not-found",
      message: `Biblioteket dekker ${model.model} fra ${model.introduced} til ${model.lastCatalogYear}. Ingen spesifikasjoner er hentet for ${number}.`,
    };
  return {
    kind: "match",
    model,
    year: number,
    message:
      "Modell funnet. Årgangsdata er ikke verifisert; kontroller variant og eventuelle modifikasjoner.",
  };
}
export function applyModelSpecs(guitar, model, year, keys) {
  const next = {
    ...guitar,
    manufacturer: model.manufacturer,
    model: model.model,
    year: String(year),
  };
  for (const key of keys)
    if (Object.hasOwn(model.specs, key)) next[key] = model.specs[key];
  return next;
}
