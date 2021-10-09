const successCallback = (position) => {
	console.log(position);
};

const errorCallback = (error) => {
	console.log(error);

}



navigator.geolocation.getCurrentPosition(successCallback, errorCallback);




function hotelAPI(inputLocation) {
	inputLocation = 'Atlanta';
	fetch("https://hotels4.p.rapidapi.com/locations/search?query=" + inputLocation + "&locale=en_US", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "hotels4.p.rapidapi.com",
			"x-rapidapi-key": "47dd23d239msh1ddfbdbd3bd2081p1fcc71jsn32fd8fabb7c8"
		}
	})
		.then(response => {
			console.log(response);
		})
		.catch(err => {
			console.error(err);
		});
}

function getRestaurantAPI(city, meters) {
	const corsApiUrl = 'https://cors-anywhere.herokuapp.com/';
	city = "Atlanta";
	meters = 1610;
	openNow = '&open_now=true';
	let key = "Bearer lN5mZwh8nn27vZespEp6B0IvX4ExqQ-F01v5S84I9WD5m_eWe0uo2PgVXWSZB1u6-2JRz4wKPpdUjaCr5DvgzTlO5mdxLUZTQbItcVRYe7Puaikp76jSG8rwiUVeYXYx";
	$.ajax(corsApiUrl + 'https://api.yelp.com/v3/businesses/search?location=' + city + "&term=restaurants&radius=" + meters + openNow, {
		headers: {
			'Authorization': key
		}
	})
		.done(function (response) {
			console.log(response)
		})

}

function cityToPage(cityName) {
	let headerEl = document.querySelector('header')
	console.log(headerEl)
	headerEl.textContent = '';
	//cityName = 'Atlanta';  //Hardcoded, should be changed to entered city name
	let resultsTitleEl = document.createElement('section', 'resultsTitle');
	resultsTitleEl.setAttribute('id', 'resultsTitle');
	headerEl.appendChild(resultsTitleEl);
	resultsTitleEl.textContent = cityName;
}
