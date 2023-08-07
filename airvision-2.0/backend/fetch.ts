async function APIRequest(city: string, api: number) {
    const requestURLs = {
        "geoapify": `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=0762c43c3f6547c5874939855cdeebec`,
        "waqi": `https://api.waqi.info/feed/${city}/?token=781e1354fc87695d73d45f65e933367e640764f3`,
    };

    const RequestList = [
        `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=0762c43c3f6547c5874939855cdeebec`,
        `https://api.waqi.info/feed/${city}/?token=781e1354fc87695d73d45f65e933367e640764f3`,
    ]
    
    return new Promise((resolve, reject) => {
        fetch(RequestList[api])
            .then(function(response) {
                if (api === 0) {
                    resolve(response.json());
                }
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