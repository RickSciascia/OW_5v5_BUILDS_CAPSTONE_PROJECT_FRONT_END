# OVERWATCH HEROES HUB

### Progetto Companion Web App per videogioco Overwatch

L'idea è quella di realizzare una companion app dove si trovano le statistiche degli eroi del videogioco Overwatch di Blizzard con le build per i personaggi da usare in 5v5.
L'idea nasce dalla mia passione per gli sparatutto, recentemente navigando per il web cercavo un sito che mostrasse le build per i perk per il 5v5 tradizionale purtroppo però non sono riuscito a trovarne, incappando solo in siti che suggerivano build per la modalità Stadium.

L'obiettivo è quello di realizzare un progetto che mi possa spingere a dare il meglio e che possa eventualmente dare un di più alla comunità ed eventualmente espanderlo con diverse sezioni in futuro.

### Teconlogie utilizzate:

Front-End: JavaScript + React + Redux + Bootstrap

Back-End: Java & Spring e i suoi moduli con DB PostgreSQL

### AVVIO PROGETTO
Apri il terminale nella cartella del progetto Front-End scrivi il comando:

npm i

Aspetta che il terminale abbia installato tutte le dipendenze del progetto dopodiche scrivi il comando:

npm run dev

dopodichè CTRL+LMB su http://localhost:5173 aprirà automaticamente il Browser predefinito

#### N.B.

Il Front-End fa chiamate al Back-End sulla porta 3001 assicurati di aver impostato correttamente l'env.properties come indicato nel README della repo del progetto Back-End


Il Front-End è impostato con porta 5173 per cambiare questo comportamente accedi al file SecurityConfig nella cartella security del progetto Back-End

nel @Bean CorsConfigurationSource nel config.setAllowedOrigins(List.of("http://localhost:5173"));
cambia la porta 5173 con la tua porta front-end eventualmente.

Link alla repo per il Back-End: https://github.com/RickSciascia/OW_5v5_BUILDS_CAPSTONE_PROJECT
