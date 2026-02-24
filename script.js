const UI = {
  input: document.getElementById("cityInput"),
  searchBtn: document.getElementById("searchBtn"),
  city: document.getElementById("cityName"),
  temp: document.getElementById("tempText"),
  clouds: document.getElementById("cloudInfo"),
  date: document.getElementById("dateInfo"),
  upperTemp: document.getElementById("upperTemp"),
  upperHumid: document.getElementById("upperHumid"),
  upperWind: document.getElementById("upperWind"),
  feels: document.getElementById("showFeels"),
  humiditityNum: document.getElementById("showNum"),
  windNum: document.getElementById("showWindNum"),
  sunrise: document.getElementById("sunriseTime"),
  sunset: document.getElementById("sunsetTime"),
  cards: document.querySelectorAll(".card"),
};

const formatDate = () => {
  const d = new Date();
  const day = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  return `${day} ${d.getDate()} ${month}`;
};

const formatTime = (unix) =>
  new Date(unix * 1000).toLocaleDateString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// TODO: API CALLS
async function fetchWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );

  if (!res.ok) throw new Error("City not found");

  return res.json();
}

async function fetchForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log("Forecast API Error", errorData);
    throw new Error("Forecast fecth failed");
  }

  return res.json();
}

// TODO: DATA PROCESSORS

function parseWeather(data) {
  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    feels: Math.round(data.main.feels_like),
    wind: data.wind.speed,
    desc: data.weather[0].description,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
}

function parseForcast(data) {
  if (!data || !data.list) return [];

  const daily = [];

  for (let i = 0; i < data.list.length; i += 8) {
    daily.push(data.list[i]);
  }

  return daily.slice(0, 5);
}

// ? UI RENDERS

function renderWeather(w) {
  UI.city.textContent = w.city;
  UI.temp.textContent = w.temp;
  UI.clouds.textContent = capitalize(w.desc);
  UI.upperTemp.textContent = w.temp;
  UI.upperHumid.textContent = w.humidity;
  UI.upperWind.textContent = w.wind + "km/h";
  UI.feels.textContent = w.feels;
  UI.humiditityNum.textContent = w.humidity;
  UI.windNum.textContent = w.wind + "km/h";
  UI.sunrise.textContent = formatTime(w.sunrise);
  UI.sunset.textContent = formatTime(w.sunset);
  UI.city.textContent = w.city;
}

function renderForcast(days) {
  days.forEach((day, i) => {
    if (!UI.cards[i]) return;

    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-Us", { weekday: "long" });
    UI.cards[i].querySelector(".day").textContent = dayName;
    UI.cards[i].querySelector(".temp").textContent =
      Math.round(day.main.temp) + "C";
    UI.cards[i].querySelector(".desc").textContent = capitalize(
      day.weather[0].description,
    );
    UI.cards[i].querySelector(".icon").src =
      `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
  });
}

// ? MAIN CONTROLLER
async function loadCity(city = "Delhi") {
  try {
    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);

    renderWeather(parseWeather(weatherData));

    renderForcast(parseForcast(forecastData));
  } catch (err) {
    alert(err.message);
  }
}

// ! EVENTS

UI.searchBtn.addEventListener("click", () => {
  const city = UI.input.value.trim() || "Delhi";
  loadCity(city);
});

UI.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") UI.searchBtn.click();
});

// ! INIT

UI.date.textContent = formatDate();
loadCity();
