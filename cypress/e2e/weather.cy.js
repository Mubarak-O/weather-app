import { format } from "date-fns";

describe("WeatherIO Tests", () => {
	beforeEach(() => {
		cy.visit("/");

		// needed so that we don't get the too many requests sent error (429) in between tests
		cy.wait(5000);

		cy.get('[data-cy="search-bar"]').as("searchBar");
		cy.get("@searchBar").click().wait(2000).type("Dub");

		cy.get('[id$="listbox"]').as("dropdownMenu");
		cy.get("@dropdownMenu").contains("Dublin").click();
	});
	it("Testing the search functionality of the Search component", () => {
		cy.get('[data-cy="search-bar"]').as("searchBar");
		cy.get("@searchBar").should("exist");
		cy.get("@searchBar").click().wait(2000).type("Abu");

		cy.get('[id$="listbox"]').as("dropdownMenu");
		cy.get("@dropdownMenu")
			.children()
			.should("exist")
			.should("include.text", "Abu Dhabi");
	});
	it("Checking to see if the CurrentWeather component was rendered correctly", () => {
		cy.get('[data-cy="current-weather"]').as("currentWeather");
		cy.get("@currentWeather")
			.should("exist")
			.find("h2")
			.should("have.text", "Current Weather");

		const currentDate = format(new Date(), "EEEE do MMM");
		cy.get('[data-cy="current-weather-main"]').as("currentWeatherMain");
		cy.get("@currentWeatherMain")
			.should("exist")
			.find('[data-cy="date"]')
			.should("have.text", currentDate);

		const titles = ["Feels Like", "Humidity", "Wind", "Pressure"];
		cy.get('[data-cy="current-weather-grid"]').as("currentWeatherGrid");
		cy.get("@currentWeatherGrid")
			.should("exist")
			.children()
			.should("have.length", 4)
			.each(($childDiv, index) => {
				cy.wrap($childDiv).should("have.descendants", "svg");
				cy.wrap($childDiv)
					.find("p:first")
					.should("have.text", titles[index]);
			});
	});
	it("Checking to see if the ForecastWeather component was rendered correctly", () => {
		cy.get('[data-cy="forecast-weather"]').as("forecastWeather");
		cy.get("@forecastWeather")
			.should("exist")
			.find("h2")
			.should("have.text", "Weekly Forecast");

		cy.get('[data-cy="forecast-weather-main"]').as("forecastWeatherMain");
		cy.get("@forecastWeatherMain")
			.should("exist")
			.children()
			.should("have.length", 7);

		cy.get('[data-cy="forecast-weather-card"]').as("forecastWeatherCard");
		cy.get("@forecastWeatherCard")
			.should("exist")
			.each(($childDiv) => {
				cy.wrap($childDiv).children().should("have.length", 2);
				cy.get($childDiv).within(() => {
					cy.get('[data-cy="fw-main"]')
						.should("exist")
						.children()
						.should("have.length", 3);
					cy.get('[data-cy="fw-extra"]')
						.should("exist")
						.children()
						.should("have.length", 3);
				});
			});
	});
	it("Testing the Locate Me button", () => {
		cy.get('[data-cy="locate-button"]').as("locateMeButton");
		cy.get("@locateMeButton").should("exist").click();

		cy.get('[data-cy="current-weather"]').as("currentWeather");
		cy.get("@currentWeather").should("exist");

		cy.get('[data-cy="forecast-weather"]').as("forecastWeather");
		cy.get("@forecastWeather").should("exist");
	});
});
