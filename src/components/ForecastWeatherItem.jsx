import PropTypes from "prop-types";
import { FaWind } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { getWeatherIcon } from "../utils/utility";

const ForecastWeatherItem = ({ data, date }) => {
	const weatherIcon = getWeatherIcon(data.weather[0].main, {
		size: 65,
		className: `fill-white`,
	});

	const gray = "fill-[#848484]";
	return (
		<div className="flex flex-col flex-shrink-0 w-[130px] items-center bg-[#1A191C] rounded-2xl p-4 space-y-3">
			<div className="flex flex-col items-center space-y-1 ">
				<h2 className="text-[#A1A1A1] text-3xl font-saira">{date}</h2>
				{weatherIcon}
				<p className="text-white text-2xl font-saira">
					{Math.round(data.main.temp)}&deg;C
				</p>
			</div>
			<div className="flex flex-col items-start p-0.5 space-y-0.5">
				<div className="flex flex-row items-center space-x-2">
					<FaWind size={20} className={`${gray}`} />
					<p className="pl-0.5 text-md text-gray-300/90  font-saira">
						{Math.round(data.wind.speed * 10) / 10}m/s
					</p>
				</div>
				<div className="flex flex-row items-center space-x-4">
					<div className="relative">
						<FaCloud size={20} className={`${gray}`} />
						<FaPercent
							className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
							size={10}
						/>
					</div>
					<p className="text-md text-gray-300/90  font-saira">
						{data.clouds.all}%
					</p>
				</div>
				<div className="flex flex-row items-center space-x-4">
					<FaDroplet size={20} className={`${gray}`} />
					<p className="text-md text-gray-300/90 font-saira">
						{data.main.humidity}%
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForecastWeatherItem;

ForecastWeatherItem.propTypes = {
	data: PropTypes.shape({
		main: PropTypes.shape({
			humidity: PropTypes.number,
			temp: PropTypes.number,
		}),
		weather: PropTypes.arrayOf(
			PropTypes.shape({
				main: PropTypes.string,
			})
		),
		wind: PropTypes.shape({
			speed: PropTypes.number,
		}),
		clouds: PropTypes.shape({
			all: PropTypes.number,
		}),
	}),
	date: PropTypes.string,
};
