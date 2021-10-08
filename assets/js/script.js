let homepageSubmit = document.querySelector('#getLayoverInfo');



function resolveLayoverTime (city,date,layoverTime){
	if (layoverTime < 4){
		//1610 ~ 1 mile
		console.log("layover 4");
		meters = 1610;
		getRestaurantAPI(city, meters);
	}else if (layoverTime >= 4 && layoverTime < 8){
		//1693 ~ 10 miles
		console.log("layover 4-8");
		meters = 16093;
		getRestaurantAPI(city, meters);
		} else
		console.log("layover 8");
		meters = 16093;
		getRestaurantAPI(city, meters);
		hotelAPI(city);
}

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

homepageSubmit.addEventListener('click', function (event){
	event.preventDefault();
	let cityInput = document.querySelector('#layoverCity');
	let layoverTimeInput = document.querySelector('#layoverTime');
	console.log("city "+ cityInput.value);
	let city = cityInput.value;
	let layoverTime = layoverTimeInput.value;
	resolveLayoverTime (city, layoverTime);
	let searchObject = {
		city: city,
		layoverTime: layoverTime
	};
	localStorage.setItem('layoverSearch', JSON.stringify(searchObject));
});
