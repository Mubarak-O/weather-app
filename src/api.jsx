const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
export const geoApiOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": GEO_API_KEY,
		"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
	},
};

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

export const REV_GEO_API_URL =
	"https://geocodeapi.p.rapidapi.com/GetLargestCities?";
export const revGeoApiOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": GEO_API_KEY,
		"X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
	},
};
