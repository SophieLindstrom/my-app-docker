# my-app-docker
 
# Beskrivning
Det här är en Node.js Express-applikation som lyssnar på en serverport och har en definierad endpoint ("/hello").Vi använder app.use() för att ange att appen ska använda JSON-format för inkommande data. Därefter används en middleware-funktion(bla. Access-Control-Allow-Origon) för att sätta HTTP-headers som tillåter cross-origin resursdelning (CORS). Endpointen ("/hello") tar emot en GET-förfrågan som innehåller två query-parametrar, firstName och lastName. De används för att bygga upp ett personligt hälsningsmeddelande som skickas som JSON tillbaka till klienten.

# Installation
1.Ladda ner Visual Studio Code länk: https://code.visualstudio.com/download
2.Ladda ner DockerDesktop länk: https://www.docker.com/products/docker-desktop/
3.Ladda ner extensions i VS Code: Docker

# Så använder du projektet
1. I terminalen i VS Code skriv kommandot: docker-compose up --build (Nu skapas en multicontainer i docker med en frontend port:3000 och en backend med port:4000) 
2. Tryck på containern 'my-app-Docker' och starta denna så har du igång både backend och frontend. 
3. Nu kan du klicka på client-frntend:3000 och kommer då till localhost, där frontendapplicationen kör!
