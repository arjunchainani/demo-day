const inputBox = document.getElementById('inputBox'); 
const submitButton = document.getElementById('submit_button');
const result = document.getElementById('result');
const result2 = document.getElementById('result2');
const entertainmentList = document.getElementById('entertainment_list');
const clarifier = document.getElementById('clarifier');
const entertainmentOption1 = document.getElementById('location1');
const entertainmentOption2 = document.getElementById('location2');
const shoppingList = document.getElementById('shopping_list');
const shoppingClarifier = document.getElementById('shopping_clarifier');
const shoppingOption1 = document.getElementById('shopping_location1');
const shoppingOption2 = document.getElementById('shopping_location2');
const eatingList = document.getElementById('eating_list');
const eatingClarifier = document.getElementById('eating_clarifier');
const eatingOption1 = document.getElementById('eating_location1');
const eatingOption2 = document.getElementById('eating_location2');

let city;
let placeID;
let entertainment = [];
let shopping = [];
let eating = [];

function getAPIs() {
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
        
    // geoapify API

    // To get actual place data
    const requestURL3 = `https://api.geoapify.com/v2/places?categories=entertainment.culture,commercial.department_store,catering&filter=place:${placeID}&limit=15&apiKey=0762c43c3f6547c5874939855cdeebec`;
    console.log(requestURL3);
    fetch(requestURL3)
        .then(function(response) {
            console.log('Successful fetch 3');
            return response.json();
        })
        .then(displayInfo)
        .catch(function(error) {
            console.log('Location not found');
        })
    
        console.log('PlaceID: ', placeID);
}

function getPlaceInfoAPI(city) {
    // To Identify Place ID
    const requestURL2 = `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=0762c43c3f6547c5874939855cdeebec`
    console.log(requestURL2);
    fetch(requestURL2)
        .then(function(response) {
            console.log('Successful fetch 2');
            return response.json();
        })
        .then(getPlaceID)
        .then(getAPIs)
        .catch(function(error) {
            console.log('Location not found');
        });
        
}

function displayData(results) {
    result.innerHTML = 'Air Quality Index: ' + results.data.aqi;
    result2.innerHTML = 'Indoor Air Quality Index - Carbon Monoxide: ' + results.data.iaqi.co.v;
}

function getPlaceID(response) {
    placeID = response.results[0].place_id;
}

function displayInfo(location) {
    for (let i = 0; i < location.features.length; i++) {
        console.log('Currently iterating through: ', location.features[i]);

        for (let j = 0; j < location.features[i].properties.categories.length; j++) {
            if (location.features[i].properties.categories[j] == 'entertainment.culture') {
                entertainment.push(location.features[i].properties.formatted);
                console.log('Added to entertainment');
            }
            else if (location.features[i].properties.categories[j] == 'commercial.department_store') {
                shopping.push(location.features[i].properties.formatted);
                console.log('Added to shopping');
            }
            else if (location.features[i].properties.categories[j] == 'catering') {
                eating.push(location.features[i].properties.formatted);
                console.log('Added to eating');
            }
        }
    }

    clarifier.innerHTML = `Places to visit near ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    entertainmentList.style.display = 'block';
    entertainmentOption1.innerHTML = entertainment[0];
    if(entertainment.length > 1) {
        entertainmentOption2.innerHTML = entertainment[1];
    }

    shoppingClarifier.innerHTML = `Places to shop near ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    shoppingList.style.display = 'block';
    shoppingOption1.innerHTML = shopping[0];
    if(shopping.length > 1) {
        shoppingOption2.innerHTML = shopping[1];
    }    

    eatingClarifier.innerHTML = `Places to eat near ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    eatingList.style.display = 'block';
    eatingOption1.innerHTML = eating[0];
    if(eating.length > 1) {
        eatingOption2.innerHTML = eating[1];
    }
}

submitButton.onclick = function(event) {
    event.preventDefault();
    city = inputBox.value;
    getPlaceInfoAPI(city);
}

// http://fldraw.com/