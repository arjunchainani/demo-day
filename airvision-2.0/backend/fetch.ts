import loadEnvVars from './env';

const [GEOAPIFY_KEY, WAQI_KEY] = loadEnvVars();

async function APIRequest(city: string, api: number) {
    const requestURLs = {
        "geoapify": `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=${GEOAPIFY_KEY}`,
        "waqi": `https://api.waqi.info/feed/${city}/?token=${WAQI_KEY}`,
    };

    const RequestList = [
        `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=${GEOAPIFY_KEY}`,
        `https://api.waqi.info/feed/${city}/?token=${WAQI_KEY}`,
    ]
    
    return new Promise((resolve, reject) => {
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