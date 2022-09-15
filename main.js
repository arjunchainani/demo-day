const inputBox = document.getElementById('inputBox'); 
const submitButton = document.getElementById('submit_button');
const inputContainer = document.getElementById('input_container');
const bottom = document.getElementById('iaqi_container');
const result = document.getElementById('result');
const entertainmentList = document.getElementById('entertainment_list');
const clarifier = document.getElementById('clarifier');
const entertainmentOption1 = document.getElementById('location1');
const entertainmentOption2 = document.getElementById('location2');
const entertainmentContainer = document.getElementById('entertainment');
const shoppingList = document.getElementById('shopping_list');
const shoppingClarifier = document.getElementById('shopping_clarifier');
const shoppingOption1 = document.getElementById('shopping_location1');
const shoppingOption2 = document.getElementById('shopping_location2');
const shoppingContainer = document.getElementById('shopping');
const eatingList = document.getElementById('eating_list');
const eatingClarifier = document.getElementById('eating_clarifier');
const eatingOption1 = document.getElementById('eating_location1');
const eatingOption2 = document.getElementById('eating_location2');
const eatingContainer = document.getElementById('eating');
const hotelList = document.getElementById('hotel_list');
const hotelClarifier = document.getElementById('hotel_clarifier');
const hotelOption1 = document.getElementById('hotel_location1');
const hotelOption2 = document.getElementById('hotel_location2');
const hotelContainer = document.getElementById('hotels');
const iaqiContainer = document.getElementById('iaqi_stats');


// Table divs
const coDiv = document.getElementById('co');
const pm10Div = document.getElementById('pm10');
const pm25Div = document.getElementById('pm25');
const no2Div = document.getElementById('no2');
const so2Div = document.getElementById('so2');

let statDivs = document.querySelectorAll("#iaqi_stats div");
let pDivs = document.querySelectorAll('#iaqi_stats div p');

let city; 
let orig;
let placeID;
let entertainment = [];
let shopping = [];
let eating = [];
let hotels = [];
let unsafeDiv, unsafeHeader, unsafeBodyText;

let o3, co, pm10, pm25, no2, so2, aqi;

const iaqiData = {
    "stats": {
        "o3": o3,
        "co": co,
        "pm10": pm10,
        "pm25": pm25,
        "no2": no2,
        "so2": so2,
    },
    
    "aqi": aqi,
}

function parseText(input) {
    // let splitText = input.split(' ');
    orig = input;
    // // let parsed;   
    // // console.log('Input before parsing:', input);
    // console.log('Split text:', splitText);
    // let parsed = splitText.join('%20');
    // console.log('Parsed:', parsed);

    let newText = input.replaceAll(' ', '%20');
    return newText;
}

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
            console.log('Location not found 1', error);
        })
        
    // geoapify API

    // To get actual place data
    const requestURL3 = `https://api.geoapify.com/v2/places?categories=entertainment,commercial.department_store,catering,accommodation.hotel&filter=place:${placeID}&limit=22&apiKey=0762c43c3f6547c5874939855cdeebec`;
    console.log(requestURL3);
    fetch(requestURL3)
        .then(function(response) {
            console.log('Successful fetch 3');
            return response.json();
        })
        .then(displayInfo)
        .catch(function(error) {
            console.log('Location not found 3:', error);
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
            console.log('Location not found 2:', error);
        });
        
}

function unsafeLocation() {
    // entertainmentContainer.style.display = 'none';
    // shoppingContainer.style.display = 'none';
    // eatingContainer.style.display = 'none';
    // hotelContainer.style.display = 'none';

    unsafeDiv = document.createElement('div');
    unsafeHeader = document.createElement('h2');
    unsafeBodyText = document.createElement('p');
    unsafeHeader.innerHTML = 'THIS PLACE HAS VERY POOR AIR QUALITY!';
    unsafeBodyText.innerHTML = `Bad air quality can lead to long term respiratory, cardiovascular, and other health issues. For this reason, we strongly advise against visiting ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    
    unsafeDiv.classList.add('unsafe_container');
    unsafeHeader.classList.add('unsafe_title');
    unsafeBodyText.classList.add('unsafe_body');
    
    unsafeDiv.appendChild(unsafeHeader);
    unsafeDiv.appendChild(unsafeBodyText);
    document.body.insertBefore(unsafeDiv, entertainmentContainer);
}

function displayData(results) {
    aqi = results.data.aqi;
    if (results.data.iaqi.co !== undefined) {
        co = results.data.iaqi.co.v;    
    }
    if (results.data.iaqi.o3 !== undefined) {
        o3 = results.data.iaqi.o3.v;    
    }
    if (results.data.iaqi.pm10 !== undefined) {
        pm10 = results.data.iaqi.pm10.v;
    }
    if (results.data.iaqi.pm25 !== undefined) {
        pm25 = results.data.iaqi.pm25.v;    
    }
    if (results.data.iaqi.no2 !== undefined) {
        no2 = results.data.iaqi.no2.v;    
    }
    if (results.data.iaqi.so2 !== undefined) {
        so2 = results.data.iaqi.so2.v;    
    }
    

    let stats = [o3, co, pm10, pm25, no2, so2];
    
    if (aqi > 100) {
        result.style.color = 'red';
        unsafeLocation();
    }
    else if (aqi > 50) {
        result.style.color = 'yellow';
    }
    else {
        result.style.color = 'greenyellow';
    }
    
    result.innerHTML = 'Air Quality Index: ' + aqi;

    iaqiContainer.style.display = 'block';
    console.log('Running if statement. Statdivs:', statDivs);
    let statValue;
    let defined = [true, true, true, true, true, true];
    for (let i = 0; i < statDivs.length; i++) {
        if (stats[i] > 0) {
            console.log('running if statement for', stats[i]);
            statValue = stats[i];
            defined[i] = true;
        }
        else {
            statValue = 0;
            defined[i] = false;
        }
        
        statDivs[i].style.width = statValue + "%";
    }

    for (let i = 0; i < pDivs.length; i++) {
        let statValue = stats[i];
        console.log('value of defined', defined);

        if (defined[i] == true) {
            pDivs[i].innerHTML += `- ${statValue}`;
        }
        else {
            console.log('running else statement for', stats[i]);
            pDivs[i].innerHTML += '- N/A';
        }
        
        pDivs[i].style.width = '300px';
        console.log('innerHTML:', pDivs[i]);
    }
    if (statDivs.style.width > iaqiContainer.style.width) {
        iaqiContainer.style.width = statDivs.style.width;
    }
}   

function getPlaceID(response) {
    placeID = response.results[0].place_id;
}

function displayInfo(location) {
    for (let i = 0; i < location.features.length; i++) {
        console.log('Currently iterating through: ', location.features[i]);

        for (let j = 0; j < location.features[i].properties.categories.length; j++) {
            if (location.features[i].properties.categories[j] == 'entertainment') {
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
            else if (location.features[i].properties.categories[j] == 'accommodation.hotel') {
                hotels.push(location.features[i].properties.formatted);
                console.log('Added to hotels');
            }
        }
    }

    console.log('Orig:', orig);

    if (entertainment.length > 0) {
        console.log('Displaying entertainment');
        clarifier.innerHTML = `Places to visit near ${orig.charAt(0).toUpperCase() + orig.slice(1)}`;
        entertainmentList.style.display = 'block';
        entertainmentOption1.innerHTML = entertainment[0];
        console.log('InnerHTML Entertainment:', entertainmentOption1.innerHTML);
        if (entertainment.length > 1) {
            entertainmentOption2.innerHTML = entertainment[1];
        }
        else {
            entertainmentOption2.style.display = 'none';
        }
    }
    
    if (shopping.length > 0) {
        console.log('Displaying shopping');
        shoppingClarifier.innerHTML = `Places to shop near ${orig.charAt(0).toUpperCase() + orig.slice(1)}`;
        shoppingList.style.display = 'block';
        shoppingOption1.innerHTML = shopping[0];
        console.log('InnerHTML Shopping:', shoppingOption1.innerHTML);
        if (shopping.length > 1) {
            shoppingOption2.innerHTML = shopping[1];
        }
        else {
            shoppingOption2.style.display = 'none';
        }
    }
        
    if (eating.length > 0) {
        console.log('Displaying eating');
        eatingClarifier.innerHTML = `Places to eat near ${orig.charAt(0).toUpperCase() + orig.slice(1)}`;
        eatingList.style.display = 'block';
        eatingOption1.innerHTML = eating[0];
        console.log('InnerHTML Eating:', eatingOption1.innerHTML);
        if (eating.length > 1) {
            eatingOption2.innerHTML = eating[1];
        }
        
        else {
            eatingOption2.style.display = 'none';
        }
    }
    
    if (hotels.length > 0) {
        console.log('Displaying hotels');
        hotelClarifier.innerHTML = `Places to stay near ${orig.charAt(0).toUpperCase() + orig.slice(1)}`;
        hotelList.style.display = 'block';
        hotelOption1.innerHTML = hotels[0];
        console.log('InnerHTML Hotels:', hotelOption1.innerHTML);
        if (hotels.length > 1) {
            hotelOption2.innerHTML = hotels[1];
        }
        else {
            hotelOption2.style.display = 'none';
        }
    }
    
}

submitButton.onclick = function(event) {
    event.preventDefault();

    bottom.scrollIntoView();

    inputContainer.style.height = '600px';
    bottom.style.height = '400px';

    city = parseText(inputBox.value);

    getPlaceInfoAPI(city);
    iaqiContainer.style.display = 'flex';
}