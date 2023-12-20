import { useState } from "react";
import Search from "./components/search/search";
import { CurrentWeather } from "./components/CurrentWeather";
import { ForecastWeather } from "./components/ForecastWeather";
import { FaLocationDot } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { WEATHER_API_URL } from "./api";
import { REV_GEO_API_URL, revGeoApiOptions } from "./api";

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecastWeather, setForecastWeather] = useState(null);

	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(" ");
		const units = "metric";

		const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
		);

		const forecastWeatherFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
		);

		Promise.all([currentWeatherFetch, forecastWeatherFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();

				setCurrentWeather({
					location: searchData.label,
					...weatherResponse,
				});
				setForecastWeather({
					location: searchData.label,
					...forecastResponse,
				});
			})
			.catch((err) => console.log(err));
	};

	const fetchCity = async (lat, lon) => {
		const response = await fetch(
			`${REV_GEO_API_URL}latitude=${lat}&longitude=${lon}&range=50000`,
			revGeoApiOptions
		);
		const data = await response.json();
		const city = data[0].City;
		const countryCode = data[0].CountryId;
		return { city, countryCode };
	};

	const handleLocateMe = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				const { city, countryCode } = await fetchCity(
					latitude,
					longitude
				);
				const searchData = {
					value: `${latitude} ${longitude}`,
					label: `${city}. ${countryCode}`,
				};
				handleOnSearchChange(searchData);
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	return (
		<>
			<div className="max-w-4xl mt-8 flex justify-between mx-auto">
				<header className="flex items-center mx-1 space-x-2">
					<MdSunny className="fill-white" size={40} />
					<h1 className="text-white font-kanit text-3xl">
						WeatherIO
					</h1>
				</header>
				<div className="grow px-8 relative">
					<Search onSearchChange={handleOnSearchChange} />
					<FaSearch
						className="absolute top-1/2 left-[11%] transform -translate-x-1/2 -translate-y-1/2 fill-white"
						size={22}
					/>
				</div>
				<button
					onClick={handleLocateMe}
					className="flex bg-[#7aa8b8] text-lg rounded-3xl py-2 px-4 items-center mx-2"
				>
					<FaLocationDot className="mr-2" />
					<span className="font-kanit font-bold">
						Current Location
					</span>
				</button>
			</div>
			<div>
				{currentWeather && <CurrentWeather data={currentWeather} />}
				{forecastWeather && <ForecastWeather data={forecastWeather} />}
			</div>
		</>
	);
}

export default App;
