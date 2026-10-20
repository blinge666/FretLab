import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { steps, tools, risks, diagnose } from "./data.mjs";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronRight,
  CircleHelp,
  Guitar as GuitarIcon,
  House,
  Layers,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "./style.css";
function useSaved<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") ?? initial;
    } catch {
      return initial;
    }
  });
  return [
    value,
    (next: T) => {
      setValue(next);
      localStorage.setItem(key, JSON.stringify(next));
    },
  ] as const;
}
const pages = [
  "Hjem",
  "Mine gitarer",
  "Guidet oppsett",
  "Diagnose",
  "Verktøykasse",
  "Tuner",
];
const navigationIcons = [
  House,
  GuitarIcon,
  SlidersHorizontal,
  Activity,
  Wrench,
  AudioLines,
];
function App() {
  const [page, setPage] = useState("Hjem");
  const [expert, setExpert] = useSaved("fl-expert", false);
  const [owned, setOwned] = useSaved<string[]>("fl-tools", []);
  const [step, setStep] = useSaved("fl-step", 0);
  const [notes, setNotes] = useSaved<Record<string, string>>("fl-notes", {});
  const [history, setHistory] = useSaved<string[]>("fl-history", []);
  const [guitar, setGuitar] = useSaved("fl-guitar", {
    manufacturer: "Gibson",
    model: "Les Paul",
    variant: "Ukjent",
    year: "Ukjent",
    scale: "Ikke målt",
    radius: "Ikke målt",
    nut: "Ukjent",
    frets: "Ukjent",
    bridge: "Antatt Tune-o-matic",
    strings: ".010–.046 · demo",
    age: "Ukjent",
    tuning: "E standard",
  });
  const [profile, setProfile] = useSaved("fl-profile", "Balanced");
  const [custom, setCustom] = useSaved("fl-custom", "");
  const [symptom, setSymptom] = useSaved("fl-symptom", "Skurring");
  const [area, setArea] = useSaved("fl-area", "");
  const [outcome, setOutcome] = useSaved("fl-outcome", "");
  const [notice, setNotice] = useState("");
  const current = steps[step];
  const missing = current.tools.filter((t: string) => !owned.includes(t));
  function saveReport() {
    setHistory([
      `${new Date().toLocaleString("nb-NO")} · ${symptom} · ${area || "Område ikke oppgitt"} · ${outcome || "Ikke vurdert"} · ${diagnose(symptom, outcome)}`,
      ...history,
    ]);
    setNotice("Diagnoserapport lagret på denne enheten.");
  }
  const completed = Object.values(notes).filter((n) => n.trim()).length;
  const navigate = (next: string) => {
    setPage(next);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <div className="shell">
      <a className="skip-link" href="#main-content">
        Hopp til innhold
      </a>
      <aside>
        <a
          className="brand"
          href="#"
          aria-label="FretLab hjem"
          onClick={(e) => {
            e.preventDefault();
            navigate("Hjem");
          }}
        >
          <span className="brand-mark">
            <AudioLines size={23} />
          </span>
          fretlab<span className="brand-period">/</span>
        </a>
        <p className="sidebar-caption">ET BEDRE UTGANGSPUNKT.</p>
        <p className="nav-caption">DITT VERKSTED</p>
        <nav aria-label="Hovedmeny">
          {pages.map((p, i) => {
            const Icon = navigationIcons[i];
            return (
              <button
                key={p}
                aria-current={page === p ? "page" : undefined}
                className={page === p ? "active" : ""}
                onClick={() => navigate(p)}
              >
                <Icon size={19} strokeWidth={1.6} />
                <span>{p}</span>
                {page === p ? <span className="nav-dot" /> : null}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-note">
          <ShieldCheck size={23} />
          <h3>Følelse møter presisjon.</h3>
          <p>
            Mål først. Forstå gitaren.
            <br />
            Juster med trygghet.
          </p>
        </div>
        <div className="aside-bottom">
          <small>
            DITT DETALJNIVÅ <SlidersHorizontal size={13} />
          </small>
          <div className="switch" role="group" aria-label="Detaljnivå">
            {[false, true].map((v) => (
              <button
                key={String(v)}
                aria-pressed={expert === v}
                className={expert === v ? "selected" : ""}
                onClick={() => setExpert(v)}
              >
                {v ? "Ekspert" : "Nybegynner"}
              </button>
            ))}
          </div>
        </div>
      </aside>
      <main id="main-content">
        <header>
          <div className="breadcrumb">
            Verkstedet <ChevronRight size={13} />
            <span>{page}</span>
          </div>
          <div className="header-right">
            <span className="local-status">
              <i /> Lagres på enheten
            </span>
            <span className="avatar" aria-label="Ditt verksted">
              FL
            </span>
          </div>
        </header>
        <div className="content">
          {page === "Hjem" ? (
            <>
              <div className="intro">
                <div>
                  <p className="eyebrow">
                    <span /> VELKOMMEN TIL VERKSTEDET
                  </p>
                  <h1>
                    God lyd starter
                    <br className="mobile-break" /> med <em>god følelse.</em>
                  </h1>
                  <p>
                    Gitaren din har mer å gi. Finn det rette oppsettet, ett steg
                    av gangen.
                  </p>
                </div>
                <span className="edition">
                  FRETLAB / WORKSHOP
                  <br />
                  <b>VOL. 001 — LES PAUL</b>
                </span>
              </div>
              <section className="hero">
                <div className="hero-copy">
                  <span className="tag">
                    <span className="live-dot" /> GUIDET OPPSETT
                  </span>
                  <h2>
                    Din gitar.
                    <br />
                    Ditt perfekte
                    <br />
                    <em>utgangspunkt.</em>
                  </h2>
                  <p>
                    Fra første måling til siste akkord.
                    <br />
                    En tydelig vei til en gitar som føles som din.
                  </p>
                  <button
                    className="primary"
                    onClick={() => navigate("Guidet oppsett")}
                  >
                    {completed ? "Fortsett oppsettet" : "Start guidet oppsett"}
                    <ArrowUpRight size={18} />
                  </button>
                  <div className="hero-meta">
                    <span>
                      <Layers size={13} /> 7 enkle steg
                    </span>
                    <span>
                      <ShieldCheck size={13} /> Måling før justering
                    </span>
                  </div>
                </div>
                <div className="hero-art">
                  <div className="art-ring ring-one" />
                  <div className="art-ring ring-two" />
                  <span className="art-coordinate">REF. 001 / SINGLE CUT</span>
                  <Guitar />
                  <div className="art-callout">
                    <span className="callout-dot" />
                    <div>
                      FØLELSEN SITTER I DETALJENE
                      <small>Observer. Mål. Dokumenter.</small>
                    </div>
                  </div>
                  <span className="art-caption">REFERANSEBILDE / GOLDTOP</span>
                </div>
                <span className="hero-number">01 — 07</span>
              </section>
              <div className="section-heading">
                <h2>På arbeidsbenken</h2>
                <span>Små steg. Merkbar forskjell.</span>
              </div>
              <div className="dashboard-grid">
                <button
                  className="card action diagnosis-card"
                  onClick={() => navigate("Diagnose")}
                >
                  <div className="card-top">
                    <span className="tile-icon">
                      <Activity size={22} />
                    </span>
                    <ArrowUpRight size={20} />
                  </div>
                  <span className="eyebrow">FINN ÅRSAKEN</span>
                  <h3>
                    Noe som ikke
                    <br />
                    spiller på lag?
                  </h3>
                  <p>
                    Skurring, sure akkorder eller svak sustain.
                    <br />
                    Vi hjelper deg å vite hvor du skal begynne.
                  </p>
                  <span className="card-link">
                    Start diagnose <ArrowRight size={16} />
                  </span>
                </button>
                <button
                  className="card action guitar-card"
                  onClick={() => navigate("Mine gitarer")}
                >
                  <div className="card-top">
                    <span className="eyebrow">PÅ GITARSTATIVET</span>
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="instrument-row">
                    <div className="instrument-art">
                      <Guitar />
                    </div>
                    <div>
                      <span className="instrument-type">
                        ELEKTRISK / DEMOPROFIL
                      </span>
                      <h3>
                        {guitar.manufacturer}
                        <br />
                        {guitar.model}
                      </h3>
                      <span className="instrument-tuning">{guitar.tuning}</span>
                    </div>
                  </div>
                  <div className="instrument-bottom">
                    <span>{guitar.strings}</span>
                    <span>
                      Se gitaren <ArrowRight size={15} />
                    </span>
                  </div>
                </button>
                <div className="card readiness-card">
                  <div className="card-top">
                    <span className="tile-icon">
                      <Wrench size={21} />
                    </span>
                    <span className="count">
                      {String(owned.length).padStart(2, "0")}
                      <small> / {String(tools.length).padStart(2, "0")}</small>
                    </span>
                  </div>
                  <h3>Klar for benken?</h3>
                  <p>
                    Riktig verktøy gjør hele forskjellen. Se hva du har og hva
                    du mangler.
                  </p>
                  <div
                    className="tool-progress"
                    aria-label={`${owned.length} av ${tools.length} verktøy registrert`}
                  >
                    {tools.map((t) => (
                      <span
                        key={t}
                        className={owned.includes(t) ? "filled" : ""}
                      />
                    ))}
                  </div>
                  <button
                    className="card-link"
                    onClick={() => navigate("Verktøykasse")}
                  >
                    Min verktøykasse <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <section className="session-strip">
                <span className="session-icon">
                  <Ruler size={23} />
                </span>
                <div>
                  <span className="eyebrow">DITT OPPSETT I EGET TEMPO</span>
                  <h3>
                    {completed
                      ? `${completed} av 7 observasjoner notert`
                      : "Litt nærmere din spillefølelse."}
                  </h3>
                  <p>
                    {completed
                      ? "Målingene dine er lagret. Fortsett der du slapp."
                      : "Ingen snarveier. Ingen gjetting. Bare deg og gitaren din."}
                  </p>
                </div>
                <button
                  aria-label="Åpne guidet oppsett"
                  onClick={() => navigate("Guidet oppsett")}
                >
                  <ArrowRight size={22} />
                </button>
              </section>
            </>
          ) : null}
          {page === "Mine gitarer" ? (
            <>
              <Title
                label="DITT INSTRUMENT"
                title="Mine gitarer"
                text="Start med en Les Paul-profil. Rediger feltene etter gitaren du faktisk har."
              />
              <div className="warning">
                Modellstandard er antatt, ikke dokumentert fabrikkspesifikasjon.
                Årganger og modifikasjoner varierer. Demodata er ikke råd.
              </div>
              <section className="profile-banner">
                <GuitarIcon size={30} />
                <div>
                  <span className="eyebrow">DITT INSTRUMENT</span>
                  <h2>
                    {guitar.manufacturer} {guitar.model}
                  </h2>
                </div>
                <span className="badge">Demoprofil</span>
              </section>
              <section className="card">
                <div className="panel-heading">
                  <Ruler size={18} />
                  <h2>Instrumentdetaljer</h2>
                  <span>Lagres automatisk</span>
                </div>
                <div className="form-grid">
                  {Object.entries(guitar).map(([key, value]) => (
                    <label key={key}>
                      {
                        (
                          {
                            manufacturer: "Produsent",
                            model: "Modell",
                            variant: "Variant",
                            year: "År",
                            scale: "Mensur",
                            radius: "Gripebrettradius",
                            nut: "Oversadelmateriale",
                            frets: "Båndmateriale",
                            bridge: "Stoltype",
                            strings: "Strenger / tykkelse",
                            age: "Strengalder",
                            tuning: "Stemming",
                          } as Record<string, string>
                        )[key]
                      }
                      <input
                        value={value}
                        onChange={(e) =>
                          setGuitar({ ...guitar, [key]: e.target.value })
                        }
                      />
                    </label>
                  ))}
                </div>
                <p className="muted">
                  Kilde: brukerredigert demoprofil · sikkerhetsgrad:
                  uverifisert. Målinger lagres separat i oppsettsflyten.
                </p>
              </section>
              <h2>Historikk</h2>
              {history.length ? (
                history.map((h, i) => (
                  <p className="card" key={i}>
                    {h}
                  </p>
                ))
              ) : (
                <p>
                  Ingen rapporter ennå. Lagre ditt første oppsett eller en
                  diagnose.
                </p>
              )}
            </>
          ) : null}
          {page === "Guidet oppsett" ? (
            <>
              <Title
                label={`STEG ${step + 1} AV ${steps.length}`}
                title="Guidet oppsett"
                text={
                  expert
                    ? "Presise observasjoner. Dokumenter egne verdier."
                    : "Vi begynner med å observere og måle. Ingen inngrep er nødvendige."
                }
              />
              <div className="progress" aria-label="Oppsettssteg">
                {steps.map((s, i) => (
                  <button
                    aria-label={s.title}
                    aria-current={i === step ? "step" : undefined}
                    key={s.title}
                    className={i === step ? "current" : i < step ? "done" : ""}
                    onClick={() => setStep(i)}
                  >
                    <span>
                      {i < step ? (
                        <Check size={14} />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <small>{s.title}</small>
                  </button>
                ))}
              </div>
              {expert ? (
                <div className="card">
                  <label>
                    Profil
                    <select
                      aria-label="Profil"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                    >
                      {[
                        "Balanced",
                        "Low Action",
                        "High Action",
                        "Slide",
                        "Custom",
                      ].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                  <p>
                    Profilnavnene er demonstrasjon; ingen fabrikkmål eller
                    justeringsmål er verifisert.
                  </p>
                  {profile === "Custom" ? (
                    <label>
                      Egne mål og kilde
                      <textarea
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                      />
                    </label>
                  ) : null}
                </div>
              ) : null}
              <section className="card step">
                <span className="badge">
                  ● {current.risk} · Måling / kontroll
                </span>
                <h2>{current.title}</h2>
                <p>{current.purpose}</p>
                <div
                  className="measurement"
                  aria-label="Illustrasjon av streng over bånd"
                >
                  <div className="string" />
                  <div className="fret" />
                  <span>↕</span>
                  <small>Prinsippskisse · ikke i målestokk</small>
                </div>
                <h3>Slik gjør du</h3>
                <p>{current.method}</p>
                <dl>
                  <dt>Målepunkt</dt>
                  <dd>{current.point}</dd>
                  <dt>Verktøy</dt>
                  <dd>{current.tools.join(", ") || "Ingen ekstra verktøy"}</dd>
                  <dt>Referanseområde</dt>
                  <dd>
                    Ikke verifisert. Ingen numerisk anbefaling i prototypen.
                  </dd>
                  <dt>Kontroll</dt>
                  <dd>{current.verify}</dd>
                </dl>
                {missing.length ? (
                  <div className="warning">
                    Ikke registrert i verktøykassen: {missing.join(", ")}.
                    Registrer verktøy eller noter at målingen ikke er utført.{" "}
                    <button onClick={() => navigate("Verktøykasse")}>
                      Åpne verktøykassen →
                    </button>
                  </div>
                ) : null}
                <label>
                  Målt verdi / observasjon
                  <textarea
                    placeholder="Oppgi verdi, enhet, målepunkt og kilde – eller hvorfor du hopper over målingen."
                    value={notes[String(step)] || ""}
                    onChange={(e) =>
                      setNotes({ ...notes, [step]: e.target.value })
                    }
                  />
                </label>
                <div className="buttons">
                  <button
                    disabled={step === 0}
                    onClick={() => setStep(step - 1)}
                  >
                    ← Tilbake
                  </button>
                  <button
                    className="primary"
                    onClick={() => {
                      if (step < 6) setStep(step + 1);
                      else {
                        setHistory([
                          `${new Date().toLocaleString("nb-NO")} · Oppsett · ${profile} · ${steps.map((s, i) => `${s.title}: ${notes[i] || "Ikke målt"}`).join(" | ")}`,
                          ...history,
                        ]);
                        setNotice("Oppsett lagret i gitarens historikk.");
                      }
                    }}
                  >
                    {step === 6 ? "Lagre oppsett" : "Neste steg →"}
                  </button>
                </div>
              </section>
              <details className="card">
                <summary>Forstå risiko før du justerer</summary>
                {risks.map(([r, t]) => (
                  <p key={r}>
                    <b>{r}:</b> {t}
                  </p>
                ))}
                <p>
                  Prototypen veileder bare måling. Inngrep og verktøygodkjenning
                  kommer etter faglig kvalitetssikring.
                </p>
              </details>
            </>
          ) : null}
          {page === "Diagnose" ? (
            <>
              <Title
                label="LYTT TIL GITAREN"
                title="Hva opplever du?"
                text="Vi undersøker mulige årsaker med de minst inngripende kontrollene først."
              />
              <section className="card diagnosis-form">
                <div className="panel-heading">
                  <Activity size={19} />
                  <h2>La oss finne ut av det</h2>
                  <span>Observasjon før inngrep</span>
                </div>
                <label>
                  Symptom
                  <select
                    aria-label="Symptom"
                    value={symptom}
                    onChange={(e) => {
                      setSymptom(e.target.value);
                      setOutcome("");
                    }}
                  >
                    {[
                      "Skurring",
                      "Dårlig sustain",
                      "Døde toner",
                      "Choking ved bending",
                      "Ustabil stemming",
                      "Sure akkorder",
                      "Ubehagelig spillefølelse",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Strenger, bånd og når det skjer
                  <textarea
                    placeholder="For eksempel: E og A, bånd 7–8, ved hardt anslag."
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </label>
                <h3>Første kontroll</h3>
                <p>{diagnose(symptom, outcome)}</p>
                <p className="muted">
                  Dette er en kontrollplan, ikke en bekreftet diagnose. Bruk
                  ekstern tuner og måleverktøy ved behov.
                </p>
                <label>
                  Etter kontrollen
                  <select
                    aria-label="Etter kontrollen"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                  >
                    <option value="">Velg resultat</option>
                    {["Bedre", "Verre", "Uendret"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <button className="primary" onClick={saveReport}>
                  Lagre diagnoserapport <ArrowUpRight size={16} />
                </button>
              </section>
            </>
          ) : null}
          {page === "Verktøykasse" ? (
            <>
              <Title
                label="GODT FORBEREDT"
                title="Min verktøykasse"
                text="Marker det du eier. Oppsettet viser hvilke verktøy du mangler før hver kontroll."
              />
              <div className="inventory-summary">
                <Wrench size={22} />
                <div>
                  <strong>
                    {owned.length} av {tools.length}
                  </strong>
                  <span> verktøy registrert</span>
                </div>
                <span className="badge">
                  {owned.length === tools.length
                    ? "Alt på plass"
                    : "Bygg din verktøykasse"}
                </span>
              </div>
              <section className="card tool-list">
                {tools.map((t) => (
                  <label className="tool" key={t}>
                    <input
                      type="checkbox"
                      checked={owned.includes(t)}
                      onChange={() =>
                        setOwned(
                          owned.includes(t)
                            ? owned.filter((x) => x !== t)
                            : [...owned, t],
                        )
                      }
                    />
                    <span>{t}</span>
                    <span className={owned.includes(t) ? "owned" : "missing"}>
                      {owned.includes(t) ? <Check size={12} /> : null}
                      {owned.includes(t) ? "På plass" : "Mangler"}
                    </span>
                  </label>
                ))}
                <p className="muted">
                  Et kredittkort kan illustrere avstander, men erstatter ikke
                  bladsøker eller presisjonslinjal ved kritiske klaringsmål.
                  Riktig dimensjonerte filer og modelltilpasset nøkkel kreves
                  ved eventuelle inngrep.
                </p>
              </section>
            </>
          ) : null}
          {page === "Tuner" ? (
            <>
              <Title
                label="FINN TONEN"
                title="Presisjonstuner"
                text="En egen modul for tonehøyde og avvik i cent — planlagt for neste etappe."
              />
              <section className="card tuner">
                <span className="tag">FORHÅNDSVISNING</span>
                <div className="note">
                  E<span>2</span>
                </div>
                <div className="tuner-scale" aria-hidden="true">
                  {Array.from({ length: 41 }, (_, i) => (
                    <i key={i} className={i === 20 ? "center" : ""} />
                  ))}
                </div>
                <div className="meter">
                  <span>−50 cent</span>
                  <span>0</span>
                  <span>+50 cent</span>
                </div>
                <div className="tuner-strings">
                  {["E", "A", "D", "G", "B", "e"].map((s, i) => (
                    <span className={i === 0 ? "selected" : ""} key={i}>
                      {s}
                    </span>
                  ))}
                </div>
                <p>
                  Ingen mikrofon er aktiv. Dette er en statisk illustrasjon.
                </p>
                <p>
                  Bruk en ekstern kromatisk tuner til stemming og
                  intonasjonskontroll. Presisjon må testes på faktiske enheter
                  før denne funksjonen tas i bruk.
                </p>
              </section>
            </>
          ) : null}
          {notice ? (
            <div role="status" className="notice">
              <Check size={16} /> {notice}
            </div>
          ) : null}
          <footer>
            <span className="footer-brand">
              <AudioLines size={17} /> fretlab
            </span>
            <span>Laget for gitaren. Og gitaristen.</span>
            <small>
              <CircleHelp size={12} /> Prototype · Faglig innhold må
              kvalitetssikres før produksjonsbruk.
            </small>
          </footer>
        </div>
      </main>
    </div>
  );
}
function Title({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="title">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
function Guitar() {
  return (
    <img
      className="guitar"
      src="/images/goldtop-guitar.webp"
      alt="Gullfarget elektrisk gitar med kremfarget slagbrett og to humbuckere"
      width={1600}
      height={562}
      decoding="async"
    />
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
