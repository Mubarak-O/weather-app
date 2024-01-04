import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";
import CurrentWeatherSkeleton from "./components/skeletons/CurrentWeatherSkeleton";
import ForecastWeatherSkeleton from "./components/skeletons/ForecastWeatherSkeleton";
import { FaLocationDot } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { fetchWeatherDetails, fetchCityData } from "./api/api";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecastWeather, setForecastWeather] = useState(null);

	const handleOnSearchChange = async (searchData) => {
		const [lat, lon] = searchData.value.split(" ");
		const units = "metric";

		setIsLoading(true);

		const weatherData = await fetchWeatherDetails(lat, lon, units);

		setCurrentWeather({
			location: searchData.label,
			...weatherData.currentWeather,
		});

		setForecastWeather({
			location: searchData.label,
			...weatherData.forecastWeather,
		});

		// Simulate a delay for skeleton loading
		// This delay allows time for skeleton components to render
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsLoading(false);
	};

	const handleLocateMe = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				const { city, countryCode } = await fetchCityData(
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
				<div data-cy="search-bar" className="grow px-8 relative">
					<Search onSearchChange={handleOnSearchChange} />
					<FaSearch
						className="absolute top-1/2 left-[11%] transform -translate-x-1/2 -translate-y-1/2 fill-white"
						size={22}
					/>
				</div>
				<button
					data-cy="locate-button"
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
				{isLoading ? (
					<>
						<CurrentWeatherSkeleton />
						<ForecastWeatherSkeleton />
					</>
				) : (
					currentWeather &&
					forecastWeather && (
						<>
							<CurrentWeather data={currentWeather} />
							<ForecastWeather data={forecastWeather} />
						</>
					)
				)}
			</div>
		</>
	);
}

export default App;
