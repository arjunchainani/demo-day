const inputBox = document.getElementById('inputBox'); 
const submitButton = document.getElementById('submit_button');
const submitDiv = document.getElementById('submission');
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


// graph divs
const coDiv = document.getElementById('co');
const pm10Div = document.getElementById('pm10');
const pm25Div = document.getElementById('pm25');
const no2Div = document.getElementById('no2');
const so2Div = document.getElementById('so2');

// table divs
const nycItems = document.getElementsByClassName('nyc');
const beijingItems = document.getElementsByClassName('beijing');
const parisItems = document.getElementsByClassName('paris');

let statDivs = document.querySelectorAll("#iaqi_stats div");
let pDivs = document.getElementsByClassName('pa');

let city; 
let orig;
let placeID;
let entertainment = [];
let shopping = [];
let eating = [];
let hotels = [];
let unsafeDiv, unsafeHeader, unsafeBodyText, unsafeMaskGraphic, unsafeMaskMessage;
let largestBar = 0;
let largestBarWidth;
let loading;

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

const iaqiKey = {
    num0: "O3",
    num1: "Co",
    num2: "PM10",
    num3: "PM2.5",
    num4: "NO2",
    num5: "SO2"
}

console.log(iaqiKey.num0);

// autocomplete(inputBox, cities);

function setPopularSearches() {
    // basically fetches the API 3 times for the cities on the intro page; this code needs to be cleaned up a bit lol :)
    let basicURL = `https://api.waqi.info/feed/`
    let requestURL = `${basicURL}New%20York/?token=781e1354fc87695d73d45f65e933367e640764f3`
    console.log("requestURL", requestURL);
    fetch(requestURL)
        .then(function(response) {
            console.log('Successful fetch');
            return response.json();
        })
        .then(function(nyJson) {
            nycItems[0].innerHTML = nyJson.data.aqi;
            if (nyJson.data.aqi > 100) {
                nycItems[0].style.color = 'red';
                nycItems[1].style.color = 'red';
                nycItems[1].innerHTML = 'Unsafe';
            }
            else if (nyJson.data.aqi > 50) {
                nycItems[0].style.color = '#a0a605';
                nycItems[1].style.color = '#a0a605';
                nycItems[1].innerHTML = 'Moderately safe';
            }
            else {
                nycItems[0].style.color = 'green';
                nycItems[1].style.color = 'green';
                nycItems[1].innerHTML = 'Safe';
            }
        })
        .catch(function(error) {
            console.log('Location not found 1', error);
        })

    basicURL = `https://api.waqi.info/feed/`
    requestURL = `${basicURL}Beijing/?token=781e1354fc87695d73d45f65e933367e640764f3`
    console.log("requestURL", requestURL);
    fetch(requestURL)
        .then(function(response) {
            console.log('Successful fetch');
            return response.json();
        })
        .then(function(beijingJson) {
            beijingItems[0].innerHTML = beijingJson.data.aqi;
            if (beijingJson.data.aqi > 100) {
                beijingItems[0].style.color = 'red';
                beijingItems[1].style.color = 'red';
                beijingItems[1].innerHTML = 'Unsafe';
            }
            else if (beijingJson.data.aqi > 50) {
                beijingItems[0].style.color = '#a0a605';
                beijingItems[1].style.color = '#a0a605';
                beijingItems[1].innerHTML = 'Moderately safe';
            }
            else {
                beijingItems[0].style.color = 'green';
                beijingItems[1].style.color = 'green';
                beijingItems[1].innerHTML = 'Safe';
            }
        })
        .catch(function(error) {
            console.log('Location not found 1', error);
        })

    basicURL = `https://api.waqi.info/feed/`
    requestURL = `${basicURL}Paris/?token=781e1354fc87695d73d45f65e933367e640764f3`
    console.log("requestURL", requestURL);
    fetch(requestURL)
        .then(function(response) {
            console.log('Successful fetch');
            return response.json();
        })
        .then(function(parisJson) {
            parisItems[0].innerHTML = parisJson.data.aqi;
            if (parisJson.data.aqi > 100) {
                parisItems[0].style.color = 'red';
                parisItems[1].style.color = 'red';
                parisItems[1].innerHTML = 'Unsafe';
            }
            else if (parisJson.data.aqi > 50) {
                parisItems[0].style.color = '#a0a605';
                parisItems[1].style.color = '#a0a605';
                parisItems[1].innerHTML = 'Moderately safe';
            }
            else {
                parisItems[0].style.color = 'green';
                parisItems[1].style.color = 'green';
                parisItems[1].innerHTML = 'Safe';
            }
        })
        .catch(function(error) {
            console.log('Location not found 1', error);
        })

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

function loadingGraphic() {
    loading = document.createElement('img');
    loading.src = 'images/loading-gif2.gif';
    loading.classList.add('loading');
    submitButton.style.display = 'none';
    submitDiv.appendChild(loading);
}

function getAPIs() {
    const basicURL = `https://api.waqi.info/feed/`
    const requestURL = `${basicURL}${city}/?token=781e1354fc87695d73d45f65e933367e640764f3`
    console.log("requestURL", requestURL);
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
    unsafeMaskGraphic = document.createElement('img');
    unsafeMaskMessage = document.createElement('p');
    unsafeHeader.innerHTML = 'WARNING: THIS PLACE HAS VERY POOR AIR QUALITY!';
    unsafeBodyText.innerHTML = `Bad air quality can lead to long term respiratory, cardiovascular, and other health issues. For this reason, we strongly advise against visiting ${city.charAt(0).toUpperCase() + city.slice(1)}\n`;
    unsafeMaskGraphic.src = 'images/mask.png';
    unsafeMaskMessage.innerHTML = `If you still plan to visit ${city.charAt(0).toUpperCase() + city.slice(1)}, we encourage you to WEAR A MASK!\n\n\n`;

    unsafeDiv.classList.add('unsafe_container');
    unsafeHeader.classList.add('unsafe_title');
    unsafeBodyText.classList.add('unsafe_body');
    unsafeMaskGraphic.classList.add('unsafe_body');
    unsafeMaskMessage.classList.add('unsafe_body');
    
    unsafeDiv.appendChild(unsafeHeader);
    unsafeDiv.appendChild(unsafeBodyText);
    unsafeDiv.appendChild(unsafeMaskGraphic);
    unsafeDiv.appendChild(unsafeMaskMessage);
    console.log('Entertainment Container: ', entertainmentContainer);
    inputContainer.insertBefore(unsafeDiv, entertainmentContainer);
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
        
        // statDivs[i].style.width = statValue + "%";
        statDivs[i].style.width = ((statValue/100)*400) + 'px';
        console.log('Statdivs Width:', statDivs[i].style.width);
    }

    let statValue1 = stats[0];
    let statValue2 = stats[1];
    let statValue3 = stats[2];
    let statValue4 = stats[3];
    let statValue5 = stats[4];
    let statValue6 = stats[5];

    pDivs[0].innerHTML = `O3 - ${statValue1}`;
    pDivs[0].style.width = '300px';
    pDivs[1].innerHTML = `Co - ${statValue2}`;
    pDivs[1].style.width = '300px';
    pDivs[2].innerHTML = `PM10 - ${statValue3}`;
    pDivs[2].style.width = '300px';
    pDivs[3].innerHTML = `PM2.5 - ${statValue4}`;
    pDivs[3].style.width = '300px';
    pDivs[4].innerHTML = `NO2 - ${statValue5}`;
    pDivs[4].style.width = '300px';
    pDivs[5].innerHTML = `SO2 - ${statValue6}`;
    pDivs[5].style.width = '300px';

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
    
    loading.style.display = 'none';
    submitButton.style.display = '';
}

submitButton.onclick = function(event) {
    event.preventDefault();

    bottom.scrollIntoView();

    loadingGraphic();

    inputContainer.style.overflow = 'auto';

    inputContainer.style.height = '600px';
    bottom.style.height = '400px';

    city = parseText(inputBox.value);

    document.title = `${inputBox.value} Air Quality Statistics, Recommendations, and More - AirVision`

    getPlaceInfoAPI(city);
    iaqiContainer.style.display = 'flex';
}

setPopularSearches();