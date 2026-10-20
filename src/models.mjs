// Curated reference data. A model match never verifies an individual instrument.
export const catalogVersion = "2026-10-20.1";
const gibsonSource = {
  title: "Gibson – Les Paul-kolleksjonen",
  url: "https://www.gibson.com/en-US/Collection/les-paul",
  verifiedAt: null,
  note: "Produsentens nettside kunne ikke kontrolleres under registrering. Verdiene er antatte modellstandarder og ikke dokumenterte fabrikkdata for valgt årgang.",
};
const common = {
  scale: "24,75 tommer (628,65 mm)",
  radius: "12 tommer (304,8 mm)",
  nut: "Graph Tech",
  nutWidth: "1,695 tommer (ca. 43,05 mm)",
  bridge: "ABR-1 Tune-o-matic / aluminium Stop Bar",
  fretCount: "22",
  fretSize: "Medium jumbo",
  fingerboard: "Palisander",
  body: "Mahogni med lønnetopp",
};
/** @typedef {{id:string, manufacturer:string, model:string, introduced:number, lastCatalogYear:number, status:string, source: typeof gibsonSource, specs:Record<string,string>}} ModelEntry */
/** @type {ModelEntry[]} */
export const modelCatalog = [
  {
    id: "gibson-les-paul-standard-50s",
    manufacturer: "Gibson",
    model: "Les Paul Standard 50s",
    introduced: 2019,
    lastCatalogYear: 2026,
    status: "assumed",
    source: gibsonSource,
    specs: {
      ...common,
      neckProfile: "Vintage 50s",
      neckPickup: "Burstbucker 1 (humbucker)",
      bridgePickup: "Burstbucker 2 (humbucker)",
    },
  },
  {
    id: "gibson-les-paul-standard-60s",
    manufacturer: "Gibson",
    model: "Les Paul Standard 60s",
    introduced: 2019,
    lastCatalogYear: 2026,
    status: "assumed",
    source: gibsonSource,
    specs: {
      ...common,
      neckProfile: "SlimTaper",
      neckPickup: "Burstbucker 61R (humbucker)",
      bridgePickup: "Burstbucker 61T (humbucker)",
    },
  },
];
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
