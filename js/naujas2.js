let xhr = new XMLHttpRequest();
let miestailist = document.getElementById("miestailist");
let datoslist = document.getElementById("datosList");
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

let citySelected = "";
let dataSelected = "";
xhr.onreadystatechange = function () { //miestu listas
    if (xhr.readyState === 4 && xhr.status === 200) {
        let miestasinput = JSON.parse(xhr.responseText);
        for (let i = 0; i < miestasinput.length; i++) {
            let option = document.createElement("option");
            option.value = miestasinput[i].name;
            miestailist.appendChild(option);
        }
    }
}
xhr.open("GET", "https://api.meteo.lt/v1/places");
xhr.send();

//datos options
function datosF() {

    let xh = new XMLHttpRequest();
    xh.onreadystatechange = function () { // datos listas
        if (xh.readyState === 4 && xh.status === 200) {
            let datos = JSON.parse(xh.responseText);
            for (let i = 0; i < datos.forecastTimestamps.length - 1; i++) {
                if (datos.forecastTimestamps[i].forecastTimeUtc.slice(0, 10)
                    === datos.forecastTimestamps[i + 1].forecastTimeUtc.slice(0, 10)) {
                    console.log(datoslist);
                } else {
                    let option = document.createElement("option");
                    let datosList = document.getElementById("datosList");
                    option.value = datos.forecastTimestamps[i].forecastTimeUtc.slice(0, 10);
                    datoslist.appendChild(option);
                    console.log(datoslist);
                }
            }
        }
    }
    xh.open("GET", "https://api.meteo.lt/v1/places/" + ltmiestai() + "/forecasts/long-term");
    xh.send();
}

//miestai
function ltmiestai() {
    let which = "";
    let pavadinimas = JSON.parse(xhr.responseText);

    for (let i = 0; i < pavadinimas.length; i++) {
        if (pavadinimas[i].name === miestasinput.value) {
            which = pavadinimas[i].code;
        }
    }
    return which;

}

const btn = document.querySelector('.btn');
const conditions = document.querySelector('.weather');
btn.addEventListener('click', lentele);

//sukurti data virs lenteles
function sukurtih1() {
    conditions.innerHTML = "";
    citySelected = miestasinput.value;
    prognoze1 = document.createElement('h1');
    dataSelected = document.getElementById("datos").value;
    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            let prognozestext = document.createTextNode(prognoze1);
            let tekstas = document.createTextNode(miestasinput.value + " " + date + " " + "Prognoze:")
            prognoze1.appendChild(prognozestext);
            lentele.appendChild(prognoze1);
            console.log(tekstas);
        }
    }
}
//lenteles kurimas
function lentele() {
    conditions.innerHTML = "";
    citySelected = miestasinput.value;
    dataSelected = document.getElementById("datos").value;
    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            let weather = JSON.parse(xhr1.responseText);
            let tempsum = 0;
            let tempamount = 0;
            let tables = document.createElement('table');

            tables.setAttribute('class', 'table table-striped table-dark ')
            let tableHead = document.createElement('thead');
            tableHead.classList.add("thead-light");


            let tableHeadRow = document.createElement('tr');
            let tbody = document.createElement('tbody');
            let th1 = document.createElement('th');
            let th2 = document.createElement('th');
            let th3 = document.createElement('th');
            let time = document.createTextNode("Time");
            let temp = document.createTextNode("Temp");
            let weather1 = document.createTextNode("Weather");

            tables.append(tableHead, tableHeadRow, tbody);
            tableHead.appendChild(tableHeadRow)
            th1.appendChild(time);
            th2.appendChild(temp);
            th3.appendChild(weather1);
            tableHeadRow.append(th1, th2, th3,);


            conditions.appendChild(tables);


            for (let i = 0; i < weather.forecastTimestamps.length; i++) {
                if (date === weather.forecastTimestamps[i].forecastTimeUtc.slice(0, 10)) {
                    let td1 = document.createElement('th');
                    let textH = document.createTextNode(weather.forecastTimestamps[i].forecastTimeUtc.slice(10, 13) + "H");
                    let td2 = document.createElement('td');
                    let textC = document.createTextNode(weather.forecastTimestamps[i].airTemperature + '\u00B0C');
                    let tableRow = document.createElement('tr');
                    let td3 = document.createElement('td');
                    let icons = document.createElement('i');
                    tbody.setAttribute('class', 'juozas');


                    td1.appendChild(textH);

                    td2.appendChild(textC);


                    tableRow.appendChild(td1);
                    tables.appendChild(tableRow);
                    tableRow.appendChild(td2);
                    tableRow.appendChild(td3);
                    tbody.appendChild(tableRow);
                    console.log(td2);
                    td3.appendChild(icons);

                    tempsum = tempsum + weather.forecastTimestamps[i].airTemperature;
                    tempamount = tempamount + 1;
                    switch (weather.forecastTimestamps[i].conditionCode) {
                        case  "clear":
                            icons.classList.add("fas", "fa-sun");
                            break;
                        case  "isolated-clouds":
                            icons.classList.add("fas", "fa-cloud");
                            break;
                        case  "scattered-clouds":
                            icons.classList.add("fas", "fa-cloud-sun");
                            break;
                        case  "overcast":
                            icons.classList.add("fas", "fa-cloud-sun");
                            break;
                        case  "light-rain":
                            icons.classList.add("fas", "fa-cloud-sun-rain");
                            break;
                        case  "moderate-rain":
                            icons.classList.add("fas", "fas fa-cloud-rain");
                            break;
                        case  "heavy-rain":
                            icons.classList.add("fas", "fa-cloud-showers-heavy");
                            break;
                        case  "sleet":
                            icons.classList.add("fas", "fa-cloud-meatball");
                            break;
                        case  "light-snow":
                            icons.classList.add("fas", "fa-snowflake");
                            break;
                        case  "moderate-snow":
                            icons.classList.add("fas", "fa-snowflake");
                            break;
                        case  "heavy-snow":
                            icons.classList.add("fas", "fas fa-snowplow");
                            break;
                        case  "fog":
                            icons.classList.add("fas", "fa-smog");
                            break;
                        case  "na":
                            icons.classList.add("fas", "fa-question");
                            break;
                    }
                }
            }
            let footeris = document.createElement('footer');
            let vidtemp = document.createTextNode("Vidutine Temperatura:" + " " + (tempsum / tempamount).toFixed(1) + " " + "\u00B0C");
            footeris.appendChild(vidtemp);
            conditions.appendChild(footeris);
        }
    }

    xhr1.open("GET", "https://api.meteo.lt/v1/places/" + ltmiestai() + "/forecasts/long-term");
    xhr1.send();
}