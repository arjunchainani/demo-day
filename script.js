let inputBox = document.getElementById('inputBox'); 
let submitButton = document.getElementById('submit_button');
let city;
let result = document.getElementById('result');
let result2 = document.getElementById('result2');


function displayData(results) {
    result.innerHTML = 'Air Quality Index: ' + results.data.aqi;
    result2.innerHTML = 'Indoor Air Quality Index - Carbon Monoxide:' + results.data.iaqi.co.v;
    console.log(results.data.iaqi.co.v);
}

submitButton.onclick = function(event) {
    event.preventDefault();
    city = inputBox.value;

    const basicURL = `https://api.waqi.info/feed/`
    const requestURL = `${basicURL}${city}/?token=781e1354fc87695d73d45f65e933367e640764f3`
    console.log(requestURL);
    fetch(requestURL)
        .then(function(response) {
            console.log('Successful fetch');
            return response.json();
        })
        .then(displayData)
        .catch(function(error) {
            console.log('Location not found');
        }) 
}