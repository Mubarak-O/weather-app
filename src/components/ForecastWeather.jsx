import PropTypes from "prop-types";
import ForecastWeatherItem from "./ForecastWeatherItem";

const WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const ForecastWeather = ({ data }) => {
	const currentDay = new Date().getDay();

	const forecastDays = WEEK_DAYS.slice(currentDay)
		.concat(WEEK_DAYS.slice(0, currentDay))
		.map((day) => day.slice(0, 3).toUpperCase());

	return (
		<div className="container flex flex-col max-w-4xl mx-auto bg-[#1C1C1E] rounded-t-2xl rounded-b-md p-3">
			<h2 className="mt-2 ml-4 font-saira text-white text-2xl">
				Weekly Forecast
			</h2>
			<div className="scrollbar-container flex flex-row space-x-12 p-4 overflow-x-auto">
				{data.list.slice(0, 7).map((item, idx) => (
					<ForecastWeatherItem
						key={idx}
						data={item}
						date={forecastDays[idx]}
					/>
				))}
			</div>
		</div>
	);
};

export default ForecastWeather;

ForecastWeather.propTypes = {
	data: PropTypes.shape({
		list: PropTypes.arrayOf(PropTypes.shape),
	}),
};
