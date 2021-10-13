//Please put all global variables at the top of the js file
let homepageSubmit = document.querySelector('#getLayoverInfo');
let hotelResults = document.querySelector('#hotelNameResults');
let resultsDetails = document.querySelector('#resultsDetailsList');
let cityInput = document.querySelector('#layoverCity');
let resultsCards = document.querySelector('.my-card')
let previousSearchEl=document.querySelector('#previousSearch')

//Disabling fetching the users location for this iteration due to needing additional calls to resolve the lon/lat
// let coords = {}
// const successCallback = (position) => {
// 	console.log(position);
// 	coords = {
// 		lat: position.coords.longitude,
// 		lon: position.coords.latitude
// 	}
// 	console.log(coords);
// };
// const errorCallback = (error) => {
// 	console.log(error);
// }
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//Fetch previous search from local storage
function previousCitiesButton() {
	let searchObject = JSON.parse(localStorage.getItem("layoverSearch"));
	console.log(searchObject);
	// check local storage 
	
	if (searchObject !== null) {
		let city = searchObject.city;
		let layoverTime = searchObject.layoverTime;
		//define button define parameters of button fetch and parse object 
		let previousSearch = document.querySelector("#previousSearch");
		console.log(previousSearch);
		previousSearch.innerHTML = '<a class="waves-effect waves-light btn cityButton" id="' + city + '">' + city + ' ' + layoverTime + ' hrs<i class="material-icons left">compare_arrows</i></a>';
	};
		document.querySelector('.cityButton').addEventListener('click', function (event) {
		if (searchObject !== null){
			let city = searchObject.city;
			let layoverTime = searchObject.layoverTime;
			weatherGrab(city);
			resolveLayoverTime(city, layoverTime);
			cityToPage(city);
		}
		event.preventDefault();
		const clearMain = document.querySelector('#searchCriteria');
		clearMain.innerHTML = '';
		
	});
};

previousCitiesButton();

function resolveLayoverTime(city, layoverTime) {
	if (layoverTime < 4) {
		//1610 ~ 1 mile
		console.log("layover 4");
		meters = 1610;
		getRestaurantAPI(city, meters);
	} else if (layoverTime >= 4 && layoverTime < 8) {
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


function hotelAPI(cityInput) {
	fetch("https://hotels4.p.rapidapi.com/locations/search?query=" + cityInput + "&locale=en_US", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "hotels4.p.rapidapi.com",
			"x-rapidapi-key": "47dd23d239msh1ddfbdbd3bd2081p1fcc71jsn32fd8fabb7c8"
		}
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new console.error("FETCH ERROR");
			}
		})
		.then(data => {
			console.log(data);
			console.log(data.suggestions[1].entities[0].name);
			let hotels = data.suggestions[1].entities
			for (let i = 0; i < hotels.length; i++) {
				console.log(hotels[i].name);
				let hotelNames = hotels[i].name;
				// let hotelNamesEl = document.createElement('div');
				// hotelNamesEl.setAttribute('id', 'hotelNameResults');
				// hotelResults.append(hotelNamesEl);
				// hotelNamesEl.textContent = hotelNames;
				// let hotelStockImg = document.createElement("img");
				// hotelStockImg.setAttribute('src', '.assets/images/stockhotelimg.jpg');
				let cardHTML = '<div class="row"><div class="col s12 m7"><div class="card"><div class="card-image">';
				cardHTML += '<img src="./assets/images/stockHotelIMG.jpeg">';
				cardHTML += '<span class="card-title">'+hotelNames+'</span>';
				cardHTML += '</div><div class="card-content"><p></p></div>';
				cardHTML += '<div class="card-action"><a href="https://www.google.com/search?q='+hotelNames+'">'+hotelNames+' Details</a></div></div></div></div>';
			  hotelResults.innerHTML += cardHTML;
			}
		})
		.catch((error) => console.error("FETCH ERROR:", error));
}

function getRestaurantAPI(city, meters) {
	const corsApiUrl = 'https://cors-anywhere.herokuapp.com/';
	openNow = '&open_now=true';
	let key = "Bearer lN5mZwh8nn27vZespEp6B0IvX4ExqQ-F01v5S84I9WD5m_eWe0uo2PgVXWSZB1u6-2JRz4wKPpdUjaCr5DvgzTlO5mdxLUZTQbItcVRYe7Puaikp76jSG8rwiUVeYXYx";
	$.ajax(corsApiUrl + 'https://api.yelp.com/v3/businesses/search?location=' + city + "&term=restaurants&radius=" + meters + openNow, {
		headers: {
			'Authorization': key
		}
	})
		.done(function (response) {
			//uncomment out the below if you hit the threshold of 50 to test one card at least
			// response = JSON.parse('{"businesses": [{"id": "GJxFtnTqTiokFedNrW9iDQ", "alias": "atlanta-breakfast-club-atlanta", "name": "Atlanta Breakfast Club", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/cGL6b-pSEqzaNrF32gXd2w/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/atlanta-breakfast-club-atlanta?adjust_creative=veZxpMvRQzCZKsxie8vKUw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=veZxpMvRQzCZKsxie8vKUw", "review_count": 4339, "categories": [{"alias": "southern", "title": "Southern"}, {"alias": "breakfast_brunch", "title": "Breakfast & Brunch"}, {"alias": "tradamerican", "title": "American (Traditional)"}], "rating": 4.5, "coordinates": {"latitude": 33.7649, "longitude": -84.39546}, "transactions": ["delivery", "pickup"], "price": "$$", "location": {"address1": "249 Ivan Allen Jr Blvd", "address2": "", "address3": "", "city": "Atlanta", "zip_code": "30313", "country": "US", "state": "GA", "display_address": ["249 Ivan Allen Jr Blvd", "Atlanta, GA 30313"]}, "phone": "+14704283825", "display_phone": "(470) 428-3825", "distance": 5735.1550054639665}]}');
			cardCreationRestaurant(response);
		});
}

function cityToPage(cityName) {
	let headerEl = document.querySelector('#header')
	let enterCityEl = document.querySelector('#center')
	console.log(headerEl)
	headerEl.textContent = '';
	//cityName = 'Atlanta';  //Hardcoded, should be changed to entered city name
	let resultsTitleEl = document.createElement('section', 'resultsTitle');
	resultsTitleEl.setAttribute('style','color:#ff5252');
	headerEl.appendChild(resultsTitleEl);
	resultsTitleEl.textContent = cityName;
}

homepageSubmit.addEventListener('click', function (event) {
	event.preventDefault();
	// let cityInput = document.querySelector('#layoverCity'); moving to global scope bc needed in hotelAPI also - Baylor 
	let layoverTimeInput = document.querySelector('#layoverTime');
	console.log("city " + cityInput.value);
	let city = cityInput.value;
	weatherGrab(city);
	//populating the cards for the results page must go below this weatherGrab function on the line above!
	console.log("inputVal " + layoverTimeInput.value);
	let layoverTime = layoverTimeInput.value;
	resolveLayoverTime(city, layoverTime);
	let searchObject = {
		city: city,
		layoverTime: layoverTime
	};
	localStorage.setItem('layoverSearch', JSON.stringify(searchObject));
	const clearMain = document.querySelector('#searchCriteria');
	clearMain.innerHTML = '';
	cityToPage(city);
});

function weatherGrab(cityName) {
	let todayTemp;
	let todayWeatherIcon;
	let todaysUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
	//fetches the lat and long using the city name
	fetch(todaysUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			let latcoord = data.coord.lat;
			let loncoord = data.coord.lon;
			let todaysOneUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latcoord + '&lon=' + loncoord + '&exclude={part}&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
			let inputCityEl = document.querySelector('.boxes');
			let inputHourEl = document.querySelector('.row');
			inputCityEl.innerHTML = '';
			inputHourEl.innerHTML = '';
			//fetches weather data
			fetch(todaysOneUrl)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data)
					todayTemp = data.current.temp;
					todayWeatherIcon = data.current.weather[0].icon;
					let iconUrl = 'http://openweathermap.org/img/wn/' + todayWeatherIcon + '@2x.png';
					let weatherResultsEl = document.createElement('section');
					weatherResultsEl.setAttribute('style','color:#ff5252');
					let weatherIconEl = document.createElement('img', '');
					weatherIconEl.setAttribute('src', iconUrl);
					weatherIconEl.setAttribute('style', 'width:100px; height:100px; align-self:center')
					let headerEl = document.querySelector('#header')
					weatherResultsEl.textContent = 'Temp: ' + todayTemp + " F";
					weatherIconEl.textContent = iconUrl;
					console.log(weatherIconEl);
					headerEl.append(weatherResultsEl);
					headerEl.append(weatherIconEl)

				})
		})
}

function cardCreationRestaurant(resultsObject) {
	resultsObject.businesses.forEach(function (business) {
		console.log(business);
		let price = business.price;
		let name = business.name;
		let phone = business.phone;
		let distance = Math.round(business.distance * 0.000621371);
		let img = business.image_url;
		let yelpURL = business.url;
		let cardHTML = '<div class="row"><div class="col s12 m7"><div class="card"><div class="card-image"><img src="' + img + '">';
		cardHTML += '<span class="card-title">' + name + '</span></div><div class="card-content">';
		if (phone != null) {
			cardHTML += '<p class="phone">' + phone + '</p>';
		}
		if (price != null) {
			cardHTML += '<p class="price">' + price + '</p>';
		}
		if (distance != null) {
			cardHTML += '<p class="distance">' + distance + ' mi</p>';
		}
		cardHTML += '</div><div class="card-action"><a href="' + yelpURL + '">Go to Yelp</a></div></div></div></div>';

		resultsDetails.innerHTML += cardHTML;
	});
}