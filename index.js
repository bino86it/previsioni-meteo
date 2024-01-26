
document.addEventListener("DOMContentLoaded",()=> {

nuvola.style.display = 'none';
pioggia.style.display = 'none';
neve.style.display = 'none';
sole.style.display = 'none';
nebbia.style.display = 'none';

    ////////////CARICAMENTO NAZIONI


    //variabili    
    const city = document.getElementById("city");
    const nazioniSelect = document.getElementById("nazione");
    const nazioni = "https://raw.githubusercontent.com/pmontrasio/codici-stati/master/dist/countries.json";
    const xhr = new XMLHttpRequest();
    let inviaButton = document.getElementById("invia");
    let tabellaRisultati=document.getElementById("risultati-meteo")

    //richiesta dati nazioni
    xhr.open("GET", nazioni, true);

    let str=`<option>Scegli una Nazione</option>`;


    xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let datiNazioni = JSON.parse(xhr.responseText);

        //console.log(datiNazioni);

        for (var stati in datiNazioni) {
            const statoInfo = datiNazioni[stati];

            str += `<option value="${statoInfo.iso3361_2_characters}">${statoInfo.italian_country_name_1}</option>`;
        }

        nazioniSelect.innerHTML = str;
    }
}); // READY STATE CHANGE




///////////PREVISIONI METEO


//in ascolto del click su button invia
inviaButton.addEventListener("click",()=> {

    //variabili input - endpoint
    let citySelected = city.value;
    let siglaNazione =nazioniSelect.value;
    const previsioniMeteoEndpoint=`https://api.openweathermap.org/data/2.5/weather?q=${citySelected},${siglaNazione}&appid=3d8aa45f7271f6bcb67cba7a6b0896d7`;
    const xhr1 = new XMLHttpRequest();
    
    xhr1.open("GET", previsioniMeteoEndpoint, true);


    xhr1.addEventListener("readystatechange", () => {

        if(xhr1.readyState === 4 && xhr1.status === 200) {

            let datiPrevisioni=JSON.parse(xhr1.responseText);
            //console.log(datiPrevisioni); 



          for (let dati in datiPrevisioni){

            let datiMeteo = datiPrevisioni[dati];
          }

            //variabili dati meteo
            let str="";
            let temperatura = datiPrevisioni.main.temp;
            let minima = datiPrevisioni.main.temp_min;
            let massima=datiPrevisioni.main.temp_max;
            let conversione=273.15;
            let vento =datiPrevisioni.wind.speed;
            let umidità = datiPrevisioni.main.humidity;
	let precipitazioni=datiPrevisioni.weather[0].description;
	let nuvola=document.getElementById('nuvola');
	let pioggia=document.getElementById('pioggia');
	let neve=document.getElementById('neve');
	let sole=document.getElementById('sole');
	let nebbia=document.getElementById('nebbia');

if (precipitazioni.includes("clouds")) {
nuvola.style.display = 'block';
pioggia.style.display = 'none';
sole.style.display = 'none';
neve.style.display = 'none';}

else if (precipitazioni.includes("rain")) {
pioggia.style.display = 'block';
nuvola.style.display = 'none';
sole.style.display = 'none';
neve.style.display = 'none';}


else if (precipitazioni.includes("snow")) {
neve.style.display = 'block';
pioggia.style.display = 'none';
sole.style.display = 'none';
nuvola.style.display = 'none';}

else if(precipitazioni.includes("clear")) {
sole.style.display = 'block';
pioggia.style.display = 'none';
neve.style.display = 'none';
nuvola.style.display = 'none';}


else if(precipitazioni.includes("fog")) {
nebbia.style.display = 'block';
sole.style.display = 'none';
pioggia.style.display = 'none';
neve.style.display = 'none';
nuvola.style.display = 'none';}



            // console.log(temperatura-273.15);
            // console.log(minima-273.15);
            // console.log(massima-273.15);


            str += `
            <h3>Risultati meteo di ${citySelected.toUpperCase()}</h3>
            <table>    
                <tr>
                    <th>Temperatura:</th><td>${Math.round(temperatura-conversione)}°</td>
                </tr>
                <tr>
                    <th>Temperatura minima:</th><td>${Math.round(minima-conversione)}°</td>
                </tr>
                <tr>
                    <th>Temperatura massima:</th><td>${Math.round(massima-conversione)}°</td>
                </tr>

		<tr>
                    <th>Precipitazioni:</th><td>${precipitazioni}</td>
                </tr>
                <tr>
                    <th>Vento:</th><td>${Math.round(vento)} km/h</td>
                </tr>

                <tr>
                    <th>Umidità:</th><td>${Math.round(umidità)} %</td>
                </tr>
            </table>`

            tabellaRisultati.innerHTML=str;


        };//IF 





    });//READY STATE CHANGE

        //invia richiesta previsioni meteo
        xhr1.send();



});//INVIA BUTTON CLICKED




// Invia la richiesta caricamento lista nazioni
xhr.send();





    const resetButton=document.getElementById("reset");

    resetButton.addEventListener("click",()=> {
    
    city.value="";

    tabellaRisultati.innerHTML="";
    
    nazioniSelect.selectedIndex = 0;
    	
	nuvola.style.display = 'none';
pioggia.style.display = 'none';
neve.style.display = 'none';
sole.style.display = 'none';
nebbia.style.display = 'none';

    });
    












});//DOM CONTENT LOADED

