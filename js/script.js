let weather = {
    apiKey: "ff1ba1fd39e3a27ccf79e1b63ee8c5a0",
    RepMeteo: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?appid=` +
            this.apiKey + `&units=metric&lang=fr` + `&q=` + city

        )
            .then((response) => {
                if (!response.ok) {
                    alert("Aucune météo de trouvée pour cette ville !");
                    throw new Error("Aucune météo de trouvée pour cette ville !");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Météo " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity_two").innerText =
            + humidity + "%";
        document.querySelector(".wind_two").innerText =
            + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },
    search: function () {
        this.RepMeteo(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
weather.RepMeteo("Fresnay-le-Comte");
