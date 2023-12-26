const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const geoApiOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": GEO_API_KEY,
		"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
	},
};

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const REV_GEO_API_URL = "https://geocodeapi.p.rapidapi.com/GetLargestCities?";
const revGeoApiOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": GEO_API_KEY,
		"X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
	},
};

export async function fetchWeatherDetails(lat, lon, units) {
	const currentWeatherFetch = fetch(
		`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
	);

	const forecastWeatherFetch = fetch(
		`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
	);

	try {
		const [weatherResponse, forecastResponse] = await Promise.all([
			currentWeatherFetch,
			forecastWeatherFetch,
		]);

		const currentWeather = await weatherResponse.json();
		const forecastWeather = await forecastResponse.json();

		return { currentWeather, forecastWeather };
	} catch (err) {
		console.log(err);
	}
}

export async function fetchCityData(lat, lon) {
	const response = await fetch(
		`${REV_GEO_API_URL}latitude=${lat}&longitude=${lon}&range=50000`,
		revGeoApiOptions
	);
	const data = await response.json();
	const city = data[0].City;
	const countryCode = data[0].CountryId;

	return { city, countryCode };
}

export async function fetchCitySearchData(inputValue) {
	try {
		const response = await fetch(
			`${GEO_API_URL}?minPopulation=500000&namePrefix=${inputValue}`,
			geoApiOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}
