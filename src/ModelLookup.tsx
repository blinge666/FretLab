import { useState } from "react";
import { ArrowDownToLine, BookOpen, ExternalLink, Search } from "lucide-react";
import {
  modelCatalog,
  catalogManufacturers,
  catalogFamilies,
  catalogModels,
  findModel,
  applyModelSpecs,
  specLabels,
  catalogVersion,
} from "./models.mjs";
export type GuitarProfile = Record<string, string>;
export type ModelReference = {
  modelId: string;
  year: string;
  version: string;
  fields: Record<string, string>;
};
export function ModelLookup({
  guitar,
  onApply,
}: {
  guitar: GuitarProfile;
  onApply: (guitar: GuitarProfile, reference: ModelReference) => void;
}) {
  const saved = modelCatalog.find(
    (m) => m.model === guitar.model && m.manufacturer === guitar.manufacturer,
  );
  const knownMaker = catalogManufacturers().includes(guitar.manufacturer)
    ? guitar.manufacturer
    : "";
  const [maker, setMaker] = useState(knownMaker);
  const [family, setFamily] = useState(
    saved?.family ||
      (catalogFamilies(knownMaker).length === 1
        ? catalogFamilies(knownMaker)[0]
        : ""),
  );
  const [modelId, setModelId] = useState(saved?.id || "");
  const other = maker === "other";
  const families = other ? [] : catalogFamilies(maker);
  const models = catalogModels(maker, family);
  const [year, setYear] = useState(
    /^\d{4}$/.test(guitar.year) ? guitar.year : "",
  );
  const [result, setResult] = useState<ReturnType<typeof findModel> | null>(
    null,
  );
  const [selected, setSelected] = useState<string[]>([]);
  function clear() {
    setResult(null);
    setSelected([]);
  }
  return (
    <section className="card model-lookup">
      <div className="panel-heading">
        <BookOpen size={19} />
        <h2>Finn din gitarmodell</h2>
        <span>Modellbibliotek</span>
      </div>
      <p>
        Velg produsent, serie, nøyaktig modell og produksjonsår for å hente
        standardspesifikasjoner. Modellnavnets «50s» og «60s» beskriver serien,
        ikke produksjonsåret.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const found = findModel(modelId, year);
          setResult(found);
          setSelected(
            found.kind === "match"
              ? Object.keys(found.model.specs).filter(
                  (k) =>
                    !guitar[k] ||
                    ["Ukjent", "Ikke målt", "Antatt Tune-o-matic"].includes(
                      guitar[k],
                    ),
                )
              : [],
          );
        }}
      >
        <div className="lookup-fields">
          <label>
            Produsent
            <select
              aria-label="Produsent"
              value={maker}
              onChange={(e) => {
                const next = e.target.value;
                const only = catalogFamilies(next);
                setMaker(next);
                setFamily(only.length === 1 ? only[0] : "");
                setModelId(next === "other" ? "other" : "");
                clear();
              }}
              required
            >
              <option value="">Velg produsent</option>
              {catalogManufacturers().map((m) => (
                <option value={m} key={m}>
                  {m}
                </option>
              ))}
              <option value="other">Annen / ikke oppført</option>
            </select>
          </label>
          <label>
            Serie
            <select
              aria-label="Serie"
              value={family}
              onChange={(e) => {
                setFamily(e.target.value);
                setModelId("");
                clear();
              }}
              disabled={!families.length}
              required={!other}
            >
              <option value="">
                {maker && !other ? "Velg serie" : "Velg produsent først"}
              </option>
              {families.map((f) => (
                <option value={f} key={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <label>
            Modell
            <select
              aria-label="Modell"
              value={other ? "" : modelId}
              onChange={(e) => {
                setModelId(e.target.value);
                clear();
              }}
              disabled={!models.length}
              required={!other}
            >
              <option value="">
                {family ? "Velg modell" : "Velg serie først"}
              </option>
              {models.map((m) => (
                <option value={m.id} key={m.id}>
                  {m.model}
                </option>
              ))}
            </select>
          </label>
          <label>
            Produksjonsår
            <input
              aria-label="Produksjonsår"
              inputMode="numeric"
              placeholder="F.eks. 2021"
              pattern="[0-9]{4}"
              maxLength={4}
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                clear();
              }}
              required
            />
          </label>
          <button className="primary" type="submit">
            <Search size={16} />
            Hent standarddata
          </button>
        </div>
      </form>
      <p className="muted">
        Modeller som ikke er oppført, kan legges inn manuelt under
        instrumentdetaljer. Målt strenghøyde, relief og pickuphøyde fylles ikke
        inn fra modellstandarder.
      </p>
      {result ? (
        <div className="lookup-result" role="status">
          <p>{result.message}</p>
          {result.kind === "match" ? (
            <>
              <div className="reference-heading">
                <h3>
                  {result.model.manufacturer} {result.model.model} ·{" "}
                  {result.year}
                </h3>
                <span className="reference-status">Antatt modellstandard</span>
              </div>
              <p className="warning">
                {result.model.source.note} Deler kan være byttet. Dette er
                konstruksjonsdata, ikke justeringsråd.
              </p>
              <p className="selection-help">
                Velg feltene du vil bruke. Felt med egne verdier er ikke valgt
                på forhånd. Modell og produksjonsår oppdateres når du bruker
                valget.
              </p>
              <div className="spec-options">
                {Object.entries(result.model.specs).map(([key, value]) => (
                  <label className="spec-option" key={key}>
                    <input
                      type="checkbox"
                      checked={selected.includes(key)}
                      onChange={() =>
                        setSelected(
                          selected.includes(key)
                            ? selected.filter((k) => k !== key)
                            : [...selected, key],
                        )
                      }
                    />
                    <span>
                      <strong>
                        {specLabels[key as keyof typeof specLabels]}
                      </strong>
                      <span>{String(value)}</span>
                      {guitar[key] ? (
                        <small>Nåværende verdi: {guitar[key]}</small>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
              <a
                className="source-link"
                href={result.model.source.url}
                target="_blank"
                rel="noreferrer"
              >
                {result.model.source.title}
                <ExternalLink size={13} />
              </a>
              <button
                className="primary"
                onClick={() => {
                  const fields = Object.fromEntries(
                    selected.map((k) => [
                      k,
                      String(
                        result.model.specs[
                          k as keyof typeof result.model.specs
                        ],
                      ),
                    ]),
                  );
                  onApply(
                    applyModelSpecs(
                      guitar,
                      result.model,
                      result.year,
                      selected,
                    ),
                    {
                      modelId: result.model.id,
                      year: String(result.year),
                      version: catalogVersion,
                      fields,
                    },
                  );
                  clear();
                }}
              >
                <ArrowDownToLine size={16} />
                Bruk {selected.length} valgte felt
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
export function ReferenceDetails({
  reference,
  guitar,
}: {
  reference: ModelReference | null;
  guitar: GuitarProfile;
}) {
  if (!reference) return null;
  const model = modelCatalog.find((m) => m.id === reference.modelId);
  if (!model) return null;
  if (
    guitar.model !== model.model ||
    guitar.manufacturer !== model.manufacturer ||
    guitar.year !== reference.year
  )
    return (
      <p className="warning">
        Modell eller år er endret etter siste oppslag. Hent standarddata på nytt
        for den nye gitaridentiteten. Tidligere feltverdier beholdes som
        uverifiserte egne verdier.
      </p>
    );
  return (
    <details className="card reference-details">
      <summary>Kilde og status for hentede spesifikasjoner</summary>
      <p>{model.source.note}</p>
      <p>
        Modell: {model.model} · valgt år: {reference.year}. Bibliotek:{" "}
        {reference.version}. Ingen dokumentert fabrikkspesifikasjon for denne
        årgangen.
      </p>
      <dl>
        {Object.entries(reference.fields).map(([key, value]) => (
          <div key={key}>
            <dt>{specLabels[key as keyof typeof specLabels]}</dt>
            <dd>
              {guitar[key] === value
                ? `${value} · Antatt modellstandard`
                : `${guitar[key] || "Ikke oppgitt"} · Egen verdi (endret etter oppslag)`}
            </dd>
          </div>
        ))}
      </dl>
      <a
        className="source-link"
        href={model.source.url}
        target="_blank"
        rel="noreferrer"
      >
        Åpne produsentens modelloversikt
        <ExternalLink size={13} />
      </a>
    </details>
  );
}
