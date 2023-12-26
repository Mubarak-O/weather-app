import { useState } from "react";
import PropTypes from "prop-types";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCitySearchData } from "../../api/api";

const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);

	async function loadOptions(inputValue) {
		try {
			const cityData = await fetchCitySearchData(inputValue);
			return {
				options: cityData.data.map((city) => {
					return {
						value: `${city.latitude} ${city.longitude}`,
						label: `${city.name}. ${city.countryCode} `,
					};
				}),
			};
		} catch (error) {
			console.error(error);
		}
	}

	const handleOnChange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	const searchBarStyling = {
		control: (provided) => ({
			...provided,
			backgroundColor: "#1c1c1e",
			borderColor: "#1c1c1e",
			borderRadius: "1.5rem",
			padding: "0.15rem",
			boxShadow: "0 1px 3px rgba(0, 0, 0, 0.9)",
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#1c1c1e",
			color: "white",
		}),
		input: (provided) => ({
			...provided,
			color: "white",
			padding: "0 30px 0 30px", // spacing of text caret
			fontSize: "22px",
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isFocused ? "black" : "white",
			fontSize: "22px",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: state.isDisabled ? "" : "white",
			paddingLeft: "30px", // spacing of selected value
			fontSize: "22px",
		}),
		placeholder: (provided) => ({
			...provided,
			paddingLeft: "30px", // spacing of placeholder text
			fontSize: "22px",
		}),
	};

	return (
		<AsyncPaginate
			placeholder="Search for a city"
			debounceTimeout={650}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
			styles={searchBarStyling}
		/>
	);
};

export default Search;

Search.propTypes = {
	onSearchChange: PropTypes.func,
};
