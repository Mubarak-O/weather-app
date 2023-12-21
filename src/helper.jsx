import React from "react";
import {
	FaCloud,
	FaCloudRain,
	FaSun,
	FaSnowflake,
	FaBolt,
} from "react-icons/fa6";
import { RiDrizzleLine } from "react-icons/ri";

const weatherIcons = {
	rain: <FaCloudRain />,
	drizzle: <RiDrizzleLine />,
	clouds: <FaCloud />,
	clear: <FaSun />,
	snow: <FaSnowflake />,
	thunderstorm: <FaBolt />,
};

export function getWeatherIcon(weatherDescription, options = {}) {
	const { size = 125, className = "" } = options;
	const selectedIcon = weatherIcons[weatherDescription.toLowerCase()] || (
		<FaCloud />
	);
	return React.cloneElement(selectedIcon, {
		size,
		className: className,
	});
}

export function titleCase(str) {
	return str
		.toLowerCase()
		.replace(/(^|\s)\S/g, (firstLetter) => firstLetter.toUpperCase());
}
