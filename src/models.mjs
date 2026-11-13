// Curated reference data. A model match never verifies an individual instrument.
export const catalogVersion = "2026-11-13.6";
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
const fenderSource = {
  title: "Fender – elektriske gitarer",
  url: "https://www.fender.com/",
  verifiedAt: null,
  note: unverifiedNote,
};
const sg = { ...gibsonUsa, body: "Mahogni" };
const fender = {
  scale: "25,5 tommer (648 mm)",
  radius: "9,5 tommer (241 mm)",
  fretCount: "22",
  body: "Or (alder); enkelte utførelser avviker",
};
const narrowNut = "1,650 tommer (42 mm)";
const wideNut = "1,685 tommer (42,8 mm)";
const compound = "Sammensatt, 10–14 tommer (254–355,6 mm)";
const strat = (pickup) => ({
  neckPickup: pickup,
  middlePickup: pickup,
  bridgePickup: pickup,
});
const tele = (pickup) => ({ neckPickup: pickup, bridgePickup: pickup });
// One record per series, used for both body shapes; only bridge and pickups differ.
const fenderSeries = [
  {
    name: "Player",
    range: { introduced: 2018, lastCatalogYear: 2024 },
    specs: {
      nut: "Syntetisk bein",
      nutWidth: narrowNut,
      fretSize: "Medium jumbo",
      fingerboard: "Lønn eller pau ferro (avhengig av variant)",
      neckProfile: "Modern C",
    },
    stratBridge: "2-punkts synkronisert tremolo",
    teleBridge: "6 saler, strenger gjennom kroppen",
    pickup: "Player Series Alnico 5 (single coil)",
  },
  {
    name: "Player II",
    range: { introduced: 2024 },
    specs: {
      nut: "Syntetisk bein",
      nutWidth: wideNut,
      fretSize: "Medium jumbo",
      fingerboard: "Palisander eller lønn (avhengig av variant)",
      neckProfile: "Modern C",
    },
    stratBridge: "2-punkts synkronisert tremolo",
    teleBridge: "6 saler, strenger gjennom kroppen",
    pickup: "Player Series Alnico 5 (single coil)",
  },
  {
    name: "American Performer",
    range: {},
    specs: {
      nut: "Syntetisk bein",
      nutWidth: wideNut,
      fretSize: "Jumbo",
      fingerboard: "Palisander eller lønn (avhengig av variant)",
      neckProfile: "Modern C",
    },
    stratBridge: "Synkronisert tremolo i vintage-stil (6 skruer)",
    teleBridge: "3 messingsaler, strenger gjennom kroppen",
    pickup: "Yosemite (single coil)",
  },
  {
    name: "American Professional II",
    range: { introduced: 2020 },
    specs: {
      nut: "Bein",
      nutWidth: wideNut,
      fretSize: "Narrow tall",
      fingerboard: "Palisander eller lønn (avhengig av variant)",
      neckProfile: "Deep C",
    },
    stratBridge: "2-punkts synkronisert tremolo",
    teleBridge:
      "3 kompenserte messingsaler, strenger gjennom kroppen eller toppmontert",
    pickup: "V-Mod II (single coil)",
  },
  {
    name: "American Ultra",
    range: { lastCatalogYear: 2024 },
    specs: {
      radius: compound,
      nut: "Bein",
      nutWidth: wideNut,
      fretSize: "Medium jumbo",
      fingerboard: "Palisander eller lønn (avhengig av variant)",
      neckProfile: "Modern D",
    },
    stratBridge: "2-punkts synkronisert tremolo",
    teleBridge: "6 saler, strenger gjennom kroppen",
    pickup: "Ultra Noiseless Vintage (støyfri single coil)",
  },
];
const fenderModels = (shape) =>
  fenderSeries.map((series) =>
    entry(
      "Fender",
      `${series.name} ${shape}`,
      fenderSource,
      {
        ...fender,
        ...series.specs,
        bridge:
          shape === "Stratocaster" ? series.stratBridge : series.teleBridge,
        ...(shape === "Stratocaster" ? strat : tele)(series.pickup),
      },
      series.range,
    ),
  );
const ibanezSource = {
  title: "Ibanez – elektriske gitarer",
  url: "https://www.ibanez.com/",
  verifiedAt: null,
  note: unverifiedNote,
};
// Ibanez model numbers do not name their family, so it is passed explicitly.
const ibanez = (family, model, specs, range = {}) =>
  entry(
    "Ibanez",
    model,
    ibanezSource,
    { scale: "25,5 tommer (648 mm)", ...specs },
    { family, ...range },
  );
const ibanezModels = () => [
  ibanez(
    "RG",
    "RG550 (Genesis Collection)",
    {
      radius: "430 mm (ca. 16,9 tommer)",
      nut: "Låsesadel",
      nutWidth: "43 mm (ca. 1,69 tommer)",
      bridge: "Edge-tremolo (dobbeltlåsende)",
      fretCount: "24",
      fretSize: "Jumbo",
      fingerboard: "Lønn",
      body: "Lind (basswood)",
      neckProfile: "Super Wizard",
      neckPickup: "V7 (humbucker)",
      middlePickup: "S1 (single coil)",
      bridgePickup: "V8 (humbucker)",
    },
    { introduced: 2018 },
  ),
  // Body and fingerboard woods changed between production years and are left out.
  ibanez("RG", "RG421", {
    radius: "400 mm (ca. 15,7 tommer)",
    nutWidth: "43 mm (ca. 1,69 tommer)",
    bridge: "Fast stol (hardtail)",
    fretCount: "24",
    fretSize: "Jumbo",
    neckProfile: "Wizard III",
    neckPickup: "Quantum (humbucker)",
    bridgePickup: "Quantum (humbucker)",
  }),
  ibanez("S", "S521", {
    radius: "400 mm (ca. 15,7 tommer)",
    nutWidth: "43 mm (ca. 1,69 tommer)",
    bridge: "Fast stol (hardtail)",
    fretCount: "24",
    fretSize: "Jumbo",
    neckProfile: "Wizard III",
    neckPickup: "Quantum (humbucker)",
    bridgePickup: "Quantum (humbucker)",
  }),
  ibanez(
    "AZ",
    "AZ2204 (Prestige)",
    {
      radius: "305 mm (12 tommer)",
      nut: "Bein",
      nutWidth: "42 mm (ca. 1,65 tommer)",
      bridge: "Gotoh T1802 tremolo",
      fretCount: "22",
      fretSize: "Jumbo (rustfritt stål)",
      body: "Or (alder)",
      neckProfile: "AZ Oval C",
      neckPickup: "Seymour Duncan Hyperion (single coil)",
      middlePickup: "Seymour Duncan Hyperion (single coil)",
      bridgePickup: "Seymour Duncan Hyperion (humbucker)",
    },
    { introduced: 2018 },
  ),
  // Fret count is left out because it could not be confirmed.
  ibanez(
    "AZ",
    "AZ2402 (Prestige)",
    {
      radius: "305 mm (12 tommer)",
      nut: "Bein",
      nutWidth: "42 mm (ca. 1,65 tommer)",
      bridge: "Gotoh T1802 tremolo",
      fretSize: "Jumbo (rustfritt stål)",
      body: "Or (alder)",
      neckProfile: "AZ Oval C",
      neckPickup: "Seymour Duncan Hyperion (humbucker)",
      bridgePickup: "Seymour Duncan Hyperion (humbucker)",
    },
    { introduced: 2018 },
  ),
  ibanez(
    "AZ",
    "AZES40",
    {
      scale: "25 tommer (635 mm)",
      radius: "250 mm (ca. 9,8 tommer)",
      bridge: "T106 tremolo",
      fretCount: "22",
      fingerboard: "Jatoba",
      body: "Poppel",
      neckPickup: "Essentials (single coil)",
      middlePickup: "Essentials (single coil)",
      bridgePickup: "Essentials (humbucker)",
    },
    { introduced: 2021 },
  ),
];
const glSource = {
  title: "G&L – elektriske gitarer",
  url: "https://www.glguitars.com/",
  verifiedAt: null,
  note: unverifiedNote,
};
const glUsa = {
  scale: "25,5 tommer (648 mm)",
  radius: "9,5 tommer (241 mm)",
  nut: "Bein",
  nutWidth: "1,625 tommer (41,3 mm)",
  fretCount: "22",
  fretSize: "Medium jumbo",
  body: "Or (alder) eller sumpask (avhengig av utførelse)",
  neckProfile: "Modern Classic",
};
// Tribute necks, nuts and body woods vary too much between runs to suggest.
const glTribute = { scale: "25,5 tommer (648 mm)", fretCount: "22" };
const glShapes = [
  {
    family: "ASAT",
    name: "ASAT Classic",
    tribute: true,
    specs: {
      bridge: "Tradisjonell boksstol med 6 messingsaler",
      ...tele("G&L MFD (single coil)"),
    },
  },
  {
    family: "ASAT",
    name: "ASAT Special",
    tribute: true,
    specs: {
      bridge: "Saddle-Lock fast stol",
      ...tele("G&L MFD Jumbo (single coil)"),
    },
  },
  {
    family: "Legacy",
    name: "Legacy",
    tribute: true,
    specs: {
      bridge: "Dual-Fulcrum vibrato",
      ...strat("Alnico V (single coil)"),
    },
  },
  {
    family: "S-500",
    name: "S-500",
    specs: {
      bridge: "Dual-Fulcrum vibrato",
      ...strat("G&L MFD (single coil)"),
    },
  },
  {
    family: "Comanche",
    name: "Comanche",
    specs: {
      bridge: "Dual-Fulcrum vibrato",
      ...strat("G&L MFD Z-coil (delt, støyreduserende)"),
    },
  },
  {
    family: "Doheny",
    name: "Doheny",
    specs: {
      bridge: "Dual-Fulcrum vibrato",
      ...tele("G&L MFD bred spole (single coil)"),
    },
  },
];
// Coverage ends in 2025, when G&L stopped production.
const glModels = () => [
  ...glShapes.map((shape) =>
    entry(
      "G&L",
      `Fullerton Deluxe ${shape.name}`,
      glSource,
      { ...glUsa, ...shape.specs },
      { family: shape.family, introduced: 2018, lastCatalogYear: 2025 },
    ),
  ),
  // 1990s USA Legacy. Necks were ordered in several shapes; the standard one is given.
  entry(
    "G&L",
    "Legacy (USA, 1990-tallet)",
    glSource,
    {
      scale: "25,5 tommer (648 mm)",
      radius:
        "7,5 tommer (190,5 mm) som standard; andre ble levert på bestilling",
      nutWidth: "1,625 tommer (41,3 mm) som standard",
      bridge: "Dual-Fulcrum vibrato",
      fretCount: "22",
      fingerboard: "Lønn eller palisander (avhengig av variant)",
      body: "Or (alder) eller sumpask (avhengig av utførelse)",
      ...strat("Alnico V (single coil)"),
    },
    { family: "Legacy", introduced: 1992, lastCatalogYear: 1999 },
  ),
  ...glShapes
    .filter((shape) => shape.tribute)
    .map((shape) =>
      entry(
        "G&L",
        `Tribute ${shape.name}`,
        glSource,
        { ...glTribute, ...shape.specs },
        { family: shape.family, lastCatalogYear: 2025 },
      ),
    ),
];
/** Fields left out of a record are unknown or too uncertain to suggest. */
const families = ["Les Paul", "SG", "Stratocaster", "Telecaster"];
const entry = (manufacturer, model, source, specs, range = {}) => ({
  family: range.family ?? families.find((f) => model.includes(f)),
  id: `${manufacturer} ${model}`
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replaceAll(" ", "-"),
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
  entry("Gibson", "SG Standard", gibsonSource, {
    ...sg,
    bridge: nashville,
    neckProfile: "Rounded",
    neckPickup: "490R (humbucker)",
    bridgePickup: "490T (humbucker)",
  }),
  // Sold with stop bar, Maestro or Sideways vibrola; the bridge field is left out.
  entry("Gibson", "SG Standard '61", gibsonSource, {
    ...sg,
    neckProfile: "SlimTaper",
    neckPickup: "Burstbucker 61R (humbucker)",
    bridgePickup: "Burstbucker 61T (humbucker)",
  }),
  entry("Gibson", "SG Special", gibsonSource, {
    ...sg,
    bridge: "Wraparound-stol",
    neckProfile: "SlimTaper",
    neckPickup: "P-90 Soapbar (single coil)",
    bridgePickup: "P-90 Soapbar (single coil)",
  }),
  entry("Gibson", "SG Junior", gibsonSource, {
    ...sg,
    bridge: "Wraparound-stol",
    neckProfile: "SlimTaper",
    neckPickup: "Ingen",
    bridgePickup: "P-90 Dog Ear (single coil)",
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
  entry(
    "Epiphone",
    "SG Standard",
    epiphoneSource,
    {
      ...epiphoneStandard,
      body: "Mahogni",
      neckProfile: "SlimTaper 60s C",
      neckPickup: "Alnico Classic PRO (humbucker)",
      bridgePickup: "Alnico Classic PRO (humbucker)",
    },
    { introduced: 2020 },
  ),
  ...fenderModels("Stratocaster"),
  ...fenderModels("Telecaster"),
  ...ibanezModels(),
  ...glModels(),
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
  middlePickup: "Pickup – midt",
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
