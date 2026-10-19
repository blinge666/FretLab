# FretLab — prosjektbrief for Codex

## Produktvisjon
FretLab er en mobilapp for guidet gitaroppsett, intonasjon og målrettet diagnostikk. Appen skal fungere som en interaktiv gitartekniker, med modelltilpassede målinger, bilder/illustrasjoner, lyd, verktøyoversikt og tydelig risikovurdering. Første målgruppe er eiere av elektriske gitarer; første referansemodell er Gibson Les Paul. Appen skal ikke være en fullstendig håndbok for større reparasjoner eller båndskift.

## Besluttede produktprinsipper
- Nybegynnermodus: én balansert anbefalt oppsettsprofil, utførlige steg-for-steg-instruksjoner, visuelle hjelpemidler og rimelige alternative målemetoder der disse er forsvarlige.
- Ekspertmodus: presise måltall og profiler Balanced, Low Action, High Action, Slide og Custom, samt lagring av egne verdier.
- Modus er detaljnivå, mens Diagnose er en egen hovedfunksjon tilgjengelig i begge moduser.
- Hovedområder: Guidet oppsett, Diagnose, Mine gitarer, Min verktøykasse og presisjonstuner.
- Gitarprofil: produsent, modell, variant, år, mensur, gripebrettradius, oversadelmateriale, båndmateriale, stoltype, strenger/tykkelse/alder, stemming, målinger, justeringer og historikk.
- Skill tydelig mellom dokumentert fabrikkspesifikasjon, antatt modellstandard og målt verdi. Vis alltid forbehold om variasjon mellom årganger og modifiserte gitarer. La brukeren velge anbefalt verdi eller måle selv.
- Hvert trinn viser formål, målepunkt, metode, illustrasjon, anbefalte verktøy, rimelige alternativer, referanseområde, sikkerhetsnivå og verifisering av resultat.
- Min verktøykasse lar brukeren markere hva de eier, og appen sjekker manglende eller uegnede verktøy før inngrep.
- Appen skal kunne demonstrere normal klang, båndskurring, svak sustain og choking med lyd; mikrofonopptak kan støtte diagnose. Kameraanalyse er en mulig senere funksjon.

## Guidet oppsett — foreløpig faglig arbeidsflyt
1. Forberedelse: strengtype, tykkelse, alder, stemming, tilstand, konstruksjon og eventuelt klima.
2. Mål halsrelief med capo, streng som referanse og bladsøker; vurder justering av truss rod.
3. Kontroller oversadelens sporhøyde, friksjon og slitasje, inkludert test med strengen nedtrykket ved tredje bånd.
4. Undersøk bånd for skurring, døde toner, choking, sustain og ujevn høyde med fret rocker.
5. Still stol/strenghøyde med modelltilpassede verdier, relevant radius og måling ved angitt bånd.
6. Intoner med presis kromatisk tuner, sammenlign åpen streng og tone ved 12. bånd, juster sadler og stem om.
7. Sluttkontroll: spill alle bånd, test bending, akkorder, sustain og stemmestabilitet; lagre oppsett.
Merk: Rekkefølge og spesifikke tall må kvalitetssikres av gitarteknisk fagkilde før produksjonsbruk. Det kan være nødvendig å gjenta tidligere kontroller etter justering.

## Diagnose
- Start med symptom: skurring, dårlig sustain, døde toner, choking ved bending, ustabil stemming, sure akkorder eller ubehagelig spillefølelse.
- Spør etter streng(er), båndområde, når feilen oppstår og relevant gitaroppsett.
- Eksempel: E- og A-streng skurrer ved bånd 7–8: mål relief og strenghøyde, undersøk lokale båndhøyder; ikke konkluder med båndsliping uten kontroll.
- Etter hvert kontrolltrinn: bedre / verre / uendret. Oppdater forslag og lagre diagnoserapport.
- Foreslå minst mulig inngripende tiltak først. Forklar alternative årsaker og usikkerhet.

## Risikomodell
- Grønn: måling, stemming, visuell kontroll.
- Gul: mindre justeringer eller oversadelfiling med riktig utstyr, men merk at filing er irreversibel for den aktuelle oversadelen.
- Oransje: truss rod og andre inngrep der feil utførelse kan gi alvorlig skade. Små steg, måling mellom hvert steg, stopp ved unormal motstand; ikke bruk makt.
- Rød: båndsliping, crowning og andre materialfjernende inngrep med betydelig reparasjonskostnad. I nybegynnermodus anbefales fagperson.
- Vurder både feilrisiko og skade-/reparasjonskonsekvens. Oversadel kan normalt byttes enklere enn skadde bånd. Krev verktøysjekk og tydelig bekreftelse ved høy risiko.
- Materialspesifikk veiledning: bånd av rustfritt stål er hardere å bearbeide enn tradisjonelt nikkel-sølv; oversadel kan være plast, bein eller syntetisk materiale.

## Verktøy
- Relief: capo, bladsøker, riktig truss rod-nøkkel.
- Strenghøyde: presisjonslinjal/action gauge.
- Oversadel: bladsøker, riktig dimensjonerte oversadelfiler.
- Bånd: fret rocker, rettholt.
- Stol/radius: modellspesifikk skrutrekker/unbrako, radiusmåler.
- Intonasjon: presis tuner, riktig justeringsverktøy.
- Hverdagsgjenstander som kredittkort kan illustrere omtrentlige avstander, men er ikke presise nok for kritiske klaringsmål.

## UI og UX
- Oversiktlig mobilgrensesnitt med store illustrasjoner, korte forklaringer, progresjonsindikator og målefelt.
- Tydelig skille mellom nybegynner og ekspert uten tap av fremdrift.
- Bilder og lyd knyttet til konkrete steg. Ingen unødvendige lange tekstblokker.
- Diagnose som tydelig knapp på forsiden.

## Foreslått teknisk gjennomføring (ikke tidligere besluttet)
- Start med en interaktiv prototype og et lokalt, fungerende MVP. Teknologistack avgjøres med Codex (f.eks. React Native/Expo + TypeScript, med lokal database).
- Innhold, gitarmodeller, referanseverdier, diagnoseregler og risikoregler bør ligge som versjonerte strukturerte data, ikke hardkodes i skjermkomponentene.
- Bygg tuneren som egen modul med måling i cent og testbar presisjon. Ikke lov nøyaktighet før testing på faktiske enheter.
- Ingen usikre fabrikkspesifikasjoner skal presenteres som bekreftede; datamodellen må lagre kilde og sikkerhetsgrad.
- MVP-forslag: onboarding, gitarprofil (Les Paul), nybegynneroppsett, ekspertprofiler, enkel diagnose, verktøykasse, sikkerhetsvarsler og lagring. Deretter tuner, lydreferanser, bredere modellbibliotek og avansert analyse.

## Første oppdrag til Codex
1. Les dette dokumentet som produktkrav.
2. Foreslå teknisk arkitektur, datamodell og etappevis implementeringsplan, med tydelig skille mellom avtalte krav og tekniske forslag.
3. Bygg en klikkbar mobilprototype med realistiske eksempeldata og disse hovedskjermene: Hjem, Mine gitarer, Guidet oppsett, Diagnose, Verktøykasse og Tuner (tuner kan være placeholder i første prototype).
4. Implementer nybegynner-/ekspertmodus og en stegvis oppsettsflyt med sikkerhetsvarsler.
5. Bruk bare faglig verifiserte måltall; merk uverifiserte eksempelverdier som demo og ikke som råd.
6. Vis prototypen og be om tilbakemelding på UX før videre funksjonalitet utvikles.
