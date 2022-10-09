const inputBox = document.getElementById('inputBox'); 
const submitButton = document.getElementById('submit_button');
const submitDiv = document.getElementById('submission');
const inputContainer = document.getElementById('input_container');
const bottom = document.getElementById('iaqi_container');
const result = document.getElementById('result');
const entertainmentList = document.getElementById('entertainment_list');
const clarifier = document.getElementById('clarifier');
const entertainmentOption1 = document.getElementById('location1');
const entertainmentOption1Container = document.getElementById('location1container');
const entertainmentOption2 = document.getElementById('location2');
const entertainmentOption2Container = document.getElementById('location2container');
const entertainmentContainer = document.getElementById('entertainment');
const shoppingList = document.getElementById('shopping_list');
const shoppingClarifier = document.getElementById('shopping_clarifier');
const shoppingOption1 = document.getElementById('shopping_location1');
const shoppingOption1Container = document.getElementById('shopping1container');
const shoppingOption2 = document.getElementById('shopping_location2');
const shoppingOption2Container = document.getElementById('shopping2container');
const shoppingContainer = document.getElementById('shopping');
const eatingList = document.getElementById('eating_list');
const eatingClarifier = document.getElementById('eating_clarifier');
const eatingOption1 = document.getElementById('eating_location1');
const eatingOption1Container = document.getElementById('eating1container');
const eatingOption2 = document.getElementById('eating_location2');
const eatingOption2Container = document.getElementById('eating2container');
const eatingContainer = document.getElementById('eating');
const hotelList = document.getElementById('hotel_list');
const hotelClarifier = document.getElementById('hotel_clarifier');
const hotelOption1 = document.getElementById('hotel_location1');
const hotelOption1Container = document.getElementById('hotel1container');
const hotelOption2 = document.getElementById('hotel_location2');
const hotelOption2Container = document.getElementById('hotel2container');
const hotelContainer = document.getElementById('hotels');
const iaqiContainer = document.getElementById('iaqi_stats');

// Copy to clipboard buttons
const entertainmentCopyBtn1 = document.createElement('button');
const entertainmentCopyBtn2 = document.createElement('button');
const shoppingCopyBtn1 = document.createElement('button');
const shoppingCopyBtn2 = document.createElement('button');
const eatingCopyBtn1 = document.createElement('button');
const eatingCopyBtn2 = document.createElement('button');
const hotelCopyBtn1 = document.createElement('button');
const hotelCopyBtn2 = document.createElement('button');

let copyButtons = [entertainmentCopyBtn1, entertainmentCopyBtn2, shoppingCopyBtn1, shoppingCopyBtn2, eatingCopyBtn1, eatingCopyBtn2, hotelCopyBtn1, hotelCopyBtn2];
for (let element of copyButtons) {
    element.innerText = 'Copy';
}


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

    if (statValue1) {
        pDivs[0].innerHTML = `O3 - ${statValue1}`;
    }
    else {
        pDivs[0].innerHTML = 'O3 - N/A';
    }

    if (statValue2) {
        pDivs[1].innerHTML = `Co - ${statValue2}`;
    }
    else {
        pDivs[1].innerHTML = 'Co - N/A';
    }

    if (statValue3) {
        pDivs[2].innerHTML = `PM10 - ${statValue3}`;
    }
    else {
        pDivs[2].innerHTML = 'PM10 - N/A';
    }
    
    if (statValue4) {
        pDivs[3].innerHTML = `PM2.5 - ${statValue4}`;
    }
    else {
        pDivs[3].innerHTML = 'PM2.5 - N/A';
    }

    if (statValue5) {
        pDivs[4].innerHTML = `NO2 - ${statValue5}`;
    }
    else {
        pDivs[4].innerHTML = 'NO2 - N/A';
    }

    if (statValue6) {
        pDivs[5].innerHTML = `SO2 - ${statValue6}`;
    }
    else {
        pDivs[5].innerHTML = 'SO2 - N/A';
    }

    pDivs[0].style.width = '300px';
    pDivs[1].style.width = '300px';
    pDivs[2].style.width = '300px';
    pDivs[3].style.width = '300px';
    pDivs[4].style.width = '300px';
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

        entertainmentCopyBtn1.classList.add('copy-buttons');
        entertainmentOption1Container.appendChild(entertainmentCopyBtn1);

        entertainmentCopyBtn1.onclick = function() {
            navigator.clipboard.writeText(entertainmentOption1.innerHTML)
                .then(function() {})
        }
        
        console.log('InnerHTML Entertainment:', entertainmentOption1.innerText);
        if (entertainment.length > 1) {
            entertainmentCopyBtn2.classList.add('copy-buttons');
            entertainmentOption2Container.appendChild(entertainmentCopyBtn2);

            entertainmentCopyBtn2.onclick = function() {
                navigator.clipboard.writeText(entertainmentOption2.innerHTML)
                    .then(function() {})
            }

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

        shoppingCopyBtn1.classList.add('copy-buttons');
        shoppingOption1Container.appendChild(shoppingCopyBtn1);

        shoppingCopyBtn1.onclick = function() {
            navigator.clipboard.writeText(shoppingOption1.innerHTML)
                .then(function() {})
        }

        shoppingOption1.innerHTML = shopping[0];
        console.log('InnerHTML Shopping:', shoppingOption1.innerHTML);
        if (shopping.length > 1) {
            shoppingCopyBtn2.classList.add('copy-buttons');
            shoppingOption2Container.appendChild(shoppingCopyBtn2);

            shoppingCopyBtn2.onclick = function() {
                navigator.clipboard.writeText(shoppingOption2.innerHTML)
                    .then(function() {})
            }

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

        eatingCopyBtn1.classList.add('copy-buttons');
        eatingOption1Container.appendChild(eatingCopyBtn1);

        eatingCopyBtn1.onclick = function() {
            navigator.clipboard.writeText(eatingOption1.innerHTML)
                .then(function() {})
        }
        eatingOption1.innerHTML = eating[0];
        console.log('InnerHTML Eating:', eatingOption1.innerHTML);
        
        if (eating.length > 1) {
            eatingCopyBtn2.classList.add('copy-buttons');
            eatingOption2Container.appendChild(eatingCopyBtn2);

            eatingCopyBtn2.onclick = function() {
                navigator.clipboard.writeText(eatingOption2.innerHTML)
                    .then(function() {})
            }
            
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

        hotelCopyBtn1.classList.add('copy-buttons');
        hotelOption1Container.appendChild(hotelCopyBtn1);

        hotelCopyBtn1.onclick = function() {
            navigator.clipboard.writeText(hotelOption1.innerHTML)
                .then(function() {})
        }

        hotelOption1.innerHTML = hotels[0];
        console.log('InnerHTML Hotels:', hotelOption1.innerHTML);
        
        if (hotels.length > 1) {
            hotelCopyBtn2.classList.add('copy-buttons');
            hotelOption2Container.appendChild(hotelCopyBtn2);

            hotelCopyBtn2.onclick = function() {
                navigator.clipboard.writeText(hotelOption2.innerHTML)
                    .then(function() {})
            }

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