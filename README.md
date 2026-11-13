# FretLab

Mobiltilpasset, klikkbar prototype for gitaroppsett. Språk: norsk bokmål.

## Kjør lokalt

Node.js 24 og npm 11. Ingen database, API-nøkler eller eksterne tjenester kreves.

```sh
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --port 5173 --strictPort
```

Valider med `npm test` og `npm run build`. Lokal lagring i nettleseren beholder modus, gitarprofil, verktøy, målinger, fremdrift og rapporter. Data synkroniseres ikke mellom enheter. Slett nettleserens nettsteddata for å nullstille.

## Publisering

`.github/workflows/pages.yml` tester, bygger og publiserer `dist` til GitHub Pages ved push til `main`. Krever at Pages-kilden i repoinnstillingene er satt til «GitHub Actions». Bygget bruker relativ base (`vite.config.mjs`), så det fungerer under `/FretLab/`.

## Arkitektur og avgrensning

Avtalte produktkrav er beskrevet i `docs/FRETLAB_PROJECT_BRIEF.md`. Teknisk valg for første prototype: React + TypeScript + Vite, responsiv nettapp i stedet for en native app. `src/data.mjs` inneholder versjonert faginnhold, risikomodell og enkle diagnoseregler. React-komponentene håndterer navigasjon, innsamling og lokal lagring. Datamodellen omfatter gitarens modell/variant/år, konstruksjon, strenger, stemming, brukerobservasjoner og tidsstemplede rapporter. Modellen er foreløpig en prototype; produksjonsdata trenger egne kilde-, versjons- og sikkerhetsfelt per verdi.

Hjem, Mine gitarer, Guidet oppsett, Diagnose, Verktøykasse og Tuner finnes. Nybegynner og ekspert deler fremdrift. Ekspertprofiler er foreløpig etiketter uten numeriske anbefalinger. Custom lagrer egne notater. Tuner er en statisk forhåndsvisning uten mikrofontilgang. Ingen numeriske fabrikkmål hevdes å være verifisert. Oppsettsflyten dekker kun måling og observasjon; materialfjerning og mekaniske justeringer utføres ikke av prototypen.

## Videre etapper

1. UX-vurdering på mobil av navigasjon, målinger, sikkerhet og diagnose.
2. Faglig kvalitetssikring av modellkilder, arbeidsrekkefølge og måleområder. Strukturerte kilde- og sikkerhetsmetadata, flere gitarer og eksport/import av data.
3. Modelltilpassede justeringer med verktøykontroll og eksplisitt risikobekreftelse. Innfør mer detaljert diagnose og lagring per kontroll.
4. Egen tunermodul med testbare centberegninger og verifikasjon på faktiske enheter; deretter lydreferanser, opptak og eventuell Expo/native-klient.

Tester dekker diagnostiske sikkerhetsregler og grunnstruktur; de dokumenterer ikke gitarfaglig korrekthet eller akustisk presisjon.

## Visuell identitet

Grensesnittet bruker et mørkt verksteduttrykk med oransje handlingsknapper, selvhostede DM Sans / Space Grotesk-skrifter og Lucide-ikoner. Mobil har fast bunnmeny med alle seks hovedområder; større skjermer har sidemeny. Alle skjermer er kontrollert for horisontal overflyt ved 320, 390, 768, 1024 og 1440 px. Tastaturfokus, snarvei til hovedinnhold, gjeldende navigasjon/steg og redusert bevegelse støttes. Eksisterende lokale lagringsnøkler beholdes ved redesign.

## Modelloppslag

Under Mine gitarer kan brukeren velge produsent, serie (for eksempel Les Paul), modell og produksjonsår, forhåndsvise standardspesifikasjoner og velge hvilke felt som skal brukes. Eksisterende egne felt er ikke valgt automatisk. Modell og år oppdateres først når brukeren anvender valget. Endringer i modell eller år etter et oppslag gjør referansen utdatert og vises tydelig. Lokale data fra tidligere versjoner beholdes.

`src/models.mjs` er et versjonert, lokalt bibliotek, ikke et live nettsøk. Dekning: 31 modeller. Les Paul: Gibson Standard 50s, Standard 60s, Classic, Modern, Custom, Junior og Special (modellår 2019–2026), Gibson Studio (2019–2023, før omleggingen i 2024) og Epiphone Standard 50s og 60s (2020–2026). SG: Gibson Standard, Standard '61, Special og Junior (2019–2026) og Epiphone Standard (2020–2026). Fender Stratocaster og Telecaster i seriene Player (2018–2024), Player II (2024–2026), American Performer (2019–2026), American Professional II (2020–2026) og American Ultra (2019–2024). Ibanez: RG550 Genesis (2018–2026), RG421 og S521 (2019–2026), AZ2204 og AZ2402 Prestige (2018–2026) og AZES40 (2021–2026). Felt som er usikre for en modell, er utelatt i stedet for gjettet. Disse modellnavnene viser til serien, ikke produksjon på 1950-/1960-tallet. Opplysningene er antatte modellstandarder med produsentlenke. Produsentnettsiden var utilgjengelig for kildekontroll, og ingen verdier er merket som dokumentert årgangsspesifikasjon. Ikke bruk dem som verifisert fabrikkoppsett. Ingen automatisk utfylling av relief, strenghøyde eller pickuphøyde. Ukjente modeller/år gir ingen automatisk utfylling; manuell profil støttes.

Nye modellposter må ha unik identitet, eksplisitt årsområde, kilde, verifikasjonsstatus og separate hals-/stolpickups. Fabrikkverifisert status krever faktisk kildekontroll for den aktuelle varianten og årgangen. Årsomfanget i dagens bibliotek er oppslagsavgrensning og garanterer ikke at spesifikasjonene var uendret gjennom alle årene.
