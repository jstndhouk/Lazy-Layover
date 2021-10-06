let inputLocation = document.querySelector();

fetch("https://hotels4.p.rapidapi.com/locations/search?query=" + inputLocation +"&locale=en_US", {
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

