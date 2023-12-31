import React from "react";
import PropTypes from "prop-types";
import { FaWind } from "react-icons/fa6";
import { FaThermometerHalf } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaGaugeHigh } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa6";
import { format } from "date-fns";
import { getWeatherIcon, titleCase } from "../utils/utility";

const CurrentWeather = ({ data }) => {
	// Styling for the main left hand side weather component
	const mainIconStyle = `absolute top-[60%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 fill-white`;
	const mainIcon = getWeatherIcon(data.weather[0].main, {
		size: 125,
		className: mainIconStyle,
	});

	const gridData = [
		{
			icon: FaThermometerHalf,
			title: "Feels Like",
			value: `${Math.round(data.main.feels_like)}°C`,
		},
		{
			icon: FaDroplet,
			title: "Humidity",
			value: `${data.main.humidity}%`,
		},
		{
			icon: FaWind,
			title: "Wind",
			value: `${Math.round(data.wind.speed * 10) / 10} m/s`,
		},
		{
			icon: FaGaugeHigh,
			title: "Pressure",
			value: `${data.main.pressure} hPa`,
		},
	];

	// Styling for all of the grid items in 2x2 format
	const gridStyle =
		"bg-[#1A191C] rounded-2xl flex flex-col justify-center items-center";
	const gridIconStyle = "fill-white";
	const gridIconSize = 35;
	const gridTitleStyle = "text-md text-[#7C7C7E] font-kanit pt-1.5";
	const gridInfoTextStyle = "text-white text-md font-kanit";

	const date = new Date();
	const formattedDate = format(date, "EEEE do MMM");

	return (
		<div
			data-cy="current-weather"
			className="container flex flex-col max-w-4xl mx-auto my-10 bg-[#1C1C1E] rounded-2xl p-3"
		>
			<h2 className="my-2 ml-4 font-saira text-white text-2xl">
				Current Weather
			</h2>
			<div className="flex gap-8">
				<div
					data-cy="current-weather-main"
					className="w-1/2 mb-4 ml-4 bg-[#1A191C] rounded-2xl relative p-8"
				>
					<div className="flex items-center pb-3">
						<FaCalendarDay className="fill-[#a1a1a1]" size={20} />
						<p
							data-cy="date"
							className="pl-2 text-[#a1a1a1] font-saira text-lg"
						>
							{formattedDate}
						</p>
					</div>
					<p className="text-lg text-white pt-1 font-cutive max-w-[175px]">
						{data.location}
					</p>
					<p className="text-5xl text-white py-3 font-cutive">
						{Math.round(data.main.temp)}&deg;C
					</p>
					<p className="text-white text-lg font-cutive max-w-[200px]">
						{titleCase(data.weather[0].description)}
					</p>
					{mainIcon}
				</div>
				<div
					data-cy="current-weather-grid"
					className="w-1/2 mb-4 mr-4 grid grid-cols-2 grid-rows-2 gap-4"
				>
					{gridData.map((item, index) => (
						<div key={index} className={gridStyle}>
							{React.createElement(item.icon, {
								size: gridIconSize,
								className: gridIconStyle,
							})}
							<p className={gridTitleStyle}>{item.title}</p>
							<p className={gridInfoTextStyle}>{item.value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;

CurrentWeather.propTypes = {
	data: PropTypes.shape({
		main: PropTypes.shape({
			feels_like: PropTypes.number,
			humidity: PropTypes.number,
			pressure: PropTypes.number,
			temp: PropTypes.number,
		}),
		weather: PropTypes.arrayOf(
			PropTypes.shape({
				main: PropTypes.string,
				description: PropTypes.string,
			})
		),
		location: PropTypes.string,
		wind: PropTypes.shape({
			speed: PropTypes.number,
		}),
	}),
};
