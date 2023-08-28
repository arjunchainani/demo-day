// Defining interfaces for using TypeScript with API responses
interface GeoApifyPlaceInfo {
    address_line1: string;
    address_line2: string;
    bbox: {
        lat1: number;
        lat2: number;
        lon1: number;
        lon2: number;
    };
    category: string;
    city: string;
    country: string;
    country_code: string;
    datasource: {
        attribution: string;
        license: string;
        sourcename: string;
        url: string;
    };
    formatted: string;
    lat: number;
    lon: number;
    old_name: string;
    place_id: string;
    plus_code: string;
    plus_code_short: string;
    rank: {
        confidence: number;
        confidence_city_level: number;
        importance: number;
        match_type: string;
        popularity: number;
    }
    region: string;
    result_type: string;
    state: string;
    state_COG: string;
    state_code: string;
    timezone: {
        abbreviation_DST: string;
        abbreviation_STD: string;
        name: string;
        offset_DST: string;
        offset_DST_seconds: number;
        offset_STD: string;
        offset_STD_seconds: number;
    }
}

export default interface GeoApify {
    query: {
        parsed: {
            city: string;
            expected_type: string;
        };
        text: string;
    };
    results: GeoApifyPlaceInfo[];
}

interface WAQIAttributions {
    logo: string;
    name: string;
    url: string;
}

interface ParticulateMatterForecast {
    avg: number;
    day: string;
    max: number;
    min: number;
}

export interface WAQI {
    data: {
        aqi: string;
        attributions: WAQIAttributions[];
        city: {
            geo: number[];
            location: string;
            name: string;
            url: string;
        };
        debug: {
            sync: string;
        };
        dominentpol: string;
        forecast: {
            daily: {
                o3: ParticulateMatterForecast[];
                pm10: ParticulateMatterForecast[];
                pm25: ParticulateMatterForecast[];
                uvi: ParticulateMatterForecast[];
            };
        };
        iaqi: {
            co: {
                v: number;
            };
            h: {
                v: number;
            };
            no2: {
                v: number;
            };
            o3: {
                v: number;
            };
            p: {
                v: number;
            };
            pm10: {
                v: number;
            };
            pm25: {
                v: number;
            };
            so2: {
                v: number;
            };
            t: {
                v: number;
            };
            w: {
                v: number;
            };
        };
        idx: number;
        time: {
            iso: string;
            s: string;
            tz: string;
            v: number;
        }
    }
    status: string;
}

export interface PlaceFeature {
    geometry: {
        coordinates: number[];
        type: string;
    };
    properties: {
        address_line1: string;
        address_line2: string;
        categories: string[];
        city: string;
        city_block: string;
        country: string;
        country_code: string;
        datasource: {
            attribution: string;
            license: string;
            raw: {
                addr_city: string;
                addr_postcode: number; 
                addr_street: string;
                building: string;
                dog: string;
                internet_access: string;
                name: string;
                name_zh: string;
                opening_hours: string;
                osm_id: number;
                osm_type: string;
                phone: string;
                shop: string;
                website: string;
                wheelchair: string;
                wikidata: string;
                wikipedia: string;
            };
            sourcename: string;
            url: string;
        };
        details: string[];
        district: string;
        formatted: string;
        lat: number;
        lon: number;
        name: string;
        place_id: string;
        postcode: string;
        region: string;
        state: string;
        street: string;
        suburb: string;
    };
    type: string;
}

export interface FeatureCollection {
    features: PlaceFeature[];
    type: string;
}