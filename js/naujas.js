let dataList = document.getElementById('miestai')
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function (){
    if (xhr.readyState ===4){
        let place = JSON.parse(xhr.responseText);
        console.log(place[0].name);
        for (i=0; i<place.length; i++);{
            let option = document.createElement('option')
            option.value = place[i].name;
            dataList.appendChild(option)
        }

    }
}

xhr.open('get', 'https://api.meteo.lt/v1/places');

xhr.send();

var xhr = new XMLHttpRequest();
console.log('UNSENT: ', xhr.status);

xhr.open('GET', '/server');
console.log('OPENED: ', xhr.status);

xhr.onprogress = function () {
    console.log('LOADING: ', xhr.status);
};

xhr.onload = function () {
    console.log('DONE: ', xhr.status);
};

xhr.send();
