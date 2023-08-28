import loadEnvVars from './env';
import GeoApify from './interfaces';

const [GEOAPIFY_KEY, WAQI_KEY] = loadEnvVars();

async function APIRequest(city: string, api: number, placeID: string = "") {
    const requestURLs = {
        "geoapify": `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=${GEOAPIFY_KEY}`,
        "waqi": `https://api.waqi.info/feed/${city}/?token=${WAQI_KEY}`,
    };

    const RequestList = [
        `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=${GEOAPIFY_KEY}`,
        `https://api.waqi.info/feed/${city}/?token=${WAQI_KEY}`,
        `https://api.geoapify.com/v2/places?categories=entertainment,commercial.department_store,catering,accommodation.hotel&filter=place:${placeID}&limit=22&apiKey=${GEOAPIFY_KEY}`
    ]
    
    console.log(`Querying ${RequestList[api]}`)

    return new Promise((resolve, reject) => {
        console.log(`Fetching ${RequestList[api]}`)
        fetch(RequestList[api])
            .then((response) => {
                resolve(response.json());
            })
            .catch((e) => reject(e));
    });
}

async function test() {
    let result = await APIRequest('Paris', 0);
    console.log(result);
}

test();

export default APIRequest;