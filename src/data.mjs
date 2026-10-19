export const contentVersion = '0.1.0-demo';
export const tools = ['Capo', 'Bladsøker', 'Presisjonslinjal', 'Fret rocker', 'Kromatisk tuner', 'Riktig justeringsverktøy'];
export const steps = [
 {title:'Bli kjent med gitaren',purpose:'Et godt oppsett starter med riktig utgangspunkt.',method:'Se etter skader, noter strengtype og alder, og stem gitaren. Stopp ved synlige skader.',point:'Hele instrumentet',tools:['Kromatisk tuner'],risk:'Grønn',verify:'Gitaren er stemt og tilstanden er notert.'},
 {title:'Mål halsrelief',purpose:'Se hvor mye halsen bøyer seg under strengene.',method:'Sett capo ved første bånd og hold strengen nede ved siste bånd. Mål klaringen midt mellom kontaktpunktene med bladsøker. Dette trinnet gjelder bare måling, ikke justering av truss rod.',point:'Mellom streng og bånd, midt på halsen',tools:['Capo','Bladsøker'],risk:'Grønn',verify:'Noter målingen. Mål på nytt for å sjekke at resultatet er stabilt.'},
 {title:'Kontroller oversadelen',purpose:'Undersøk klaring og tegn på friksjon.',method:'Trykk strengen ned ved tredje bånd og observer klaringen ved første bånd. Se etter slitasje og binding. Ikke fil oversadelen i denne prototypen.',point:'Første bånd og oversadel',tools:['Bladsøker'],risk:'Grønn',verify:'Noter observasjonene. Ved behov for filing: kontakt en fagperson.'},
 {title:'Undersøk båndene',purpose:'Finn hvor skurring eller døde toner oppstår.',method:'Spill hver streng over hele gripebrettet. Noter bånd og symptom. Bruk fret rocker til kontroll, uten å slipe eller fjerne materiale.',point:'Alle bånd',tools:['Fret rocker'],risk:'Grønn',verify:'Du har en oversikt over berørte strenger og bånd.'},
 {title:'Mål strenghøyden',purpose:'Dokumenter spillefølelsen før du endrer noe.',method:'Med gitaren stemt, mål fra toppen av båndet til undersiden av strengen ved 12. bånd. Noter bass- og diskantside. Ingen justeringsmål er faglig verifisert i prototypen.',point:'12. bånd',tools:['Presisjonslinjal'],risk:'Grønn',verify:'Begge sider er målt og lagret. Kredittkort er ikke presist nok.'},
 {title:'Kontroller intonasjonen',purpose:'Undersøk om gitaren spiller rent langs halsen.',method:'Bruk en ekstern kromatisk tuner. Sammenlign stemt åpen streng med tonen ved 12. bånd, med lett og jevnt trykk. Noter avviket og stem om før ny kontroll. Bruk faglig veiledning før sadeljustering.',point:'Åpen streng og 12. bånd',tools:['Kromatisk tuner'],risk:'Grønn',verify:'Avvik er notert for hver streng.'},
 {title:'Spill og lagre',purpose:'Se helheten og ta vare på målingene.',method:'Test akkorder, alle bånd, bending, sustain og stemmestabilitet. Gjenta tidligere målinger ved behov.',point:'Hele gripebrettet',tools:[],risk:'Grønn',verify:'Noter hva som fungerer og hva som trenger videre vurdering.'}
];
export const risks = [
 ['Grønn','Måling, stemming og visuell kontroll.'],
 ['Gul','Mindre justeringer krever riktig utstyr. Oversadelfiling er irreversibel for oversadelen.'],
 ['Oransje','Truss rod: risiko for alvorlig skade. Krever riktig nøkkel og faglig veiledning. Stopp ved unormal motstand; aldri bruk makt.'],
 ['Rød','Båndsliping og crowning fjerner materiale. Bruk fagperson i nybegynnermodus.']
];
export function diagnose(symptom, outcome='') {
 if(outcome === 'Verre') return 'Stopp justeringene. Dokumenter endringen og få gitaren vurdert av en gitartekniker.';
 if(outcome === 'Bedre') return 'Gjenta spilleprøven, kontroller stemmingen og dokumenter resultatet. Bedring alene bekrefter ikke årsaken.';
 if(symptom === 'Ustabil stemming') return 'Kontroller strengalder, stemming og om strengen binder i oversadelen. Undersøk mekanikker visuelt før inngrep.';
 if(symptom === 'Sure akkorder') return 'Stem åpne strenger og kontroller intonasjon med ekstern tuner. Sammenlign også fingertrykk og oversadelklaring.';
 return 'Kartlegg streng og båndområde. Mål relief og strenghøyde, og undersøk lokale båndhøyder. Flere årsaker er mulige; ikke konkluder med båndsliping.';
}
