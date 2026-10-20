# FretLab

Mobiltilpasset, klikkbar prototype for gitaroppsett. Språk: norsk bokmål.

## Kjør lokalt

Node.js 24 og npm 11. Ingen database, API-nøkler eller eksterne tjenester kreves.

```sh
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --port 5173 --strictPort
```

Valider med `npm test` og `npm run build`. Lokal lagring i nettleseren beholder modus, gitarprofil, verktøy, målinger, fremdrift og rapporter. Data synkroniseres ikke mellom enheter. Slett nettleserens nettsteddata for å nullstille.

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
