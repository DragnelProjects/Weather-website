const tempText = document.getElementById("tempText");
const cloudInfo = document.getElementById("cloudInfo");
const dateInfo = document.getElementById("dateInfo");

function toGetDate() {
  const date = new Date();
  const forDate = date.getDate();
  const forDay = date.getDay();
  const forMonth = date.getMonth();

  let day;
  switch (forDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  let month;
  switch (forMonth) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "Febuary";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }

  dateInfo.innerText = `${day}, ${forDate} ${month} `;
}
toGetDate();

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  let city = cityInput.value || "Delhi";
  toDisplayTheData(city);
  loadForecast(city);
});

async function toGetData(city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    );

    if (!data.ok) {
      throw new Error("Can't find the file");
    }

    const weatherData = await data.json();
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}
// toGetData();

async function toGetOtherData(city) {
  const weatherData = await toGetData(city);
  const kelvin = weatherData.main.temp;
  const temp = Math.floor(kelvin - 273.15);

  const kelvin2 = weatherData.main.feels_like;
  const feels = Math.floor(kelvin2 - 273.15);

  const weather = {
    city2: weatherData.name,
    humidity: weatherData.main.humidity,
    tempreture: temp,
    feelsLike: feels,
    windSpeed: weatherData.wind.speed,
    cloudsDip: weatherData.weather[0].description,
    sunrise: weatherData.sys.sunrise,
    sunset: weatherData.sys.sunset,
  };

  return weather;
  // console.log(weather.city);
}

const upperTemp = document.getElementById("upperTemp");
const upperHumid = document.getElementById("upperHumid");
const upperWind = document.getElementById("upperWind");
const showFeels = document.getElementById("showFeels");
const showNum = document.getElementById("showNum");
const showWindNum = document.getElementById("showWindNum");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");
const cityName = document.getElementById("cityName");

async function toDisplayTheData(city) {
  const weather = await toGetOtherData(city);

  cityName.innerText = `${weather.city2}`;
  tempText.innerText = `${weather.tempreture}`;

  const clouds =
    String(weather.cloudsDip).trim().charAt(0).toUpperCase() +
    String(weather.cloudsDip).trim().slice(1).toLowerCase();
  cloudInfo.innerText = `${clouds}`;

  upperTemp.innerText = `${weather.tempreture}`;
  upperHumid.innerText = `${weather.humidity}`;
  upperWind.innerText = `${weather.windSpeed} km/h`;
  showFeels.innerText = `${weather.feelsLike}`;

  showNum.innerText = `${weather.humidity}`;
  showWindNum.innerText = `${weather.windSpeed} km/h`;

  const sun1 = new Date(weather.sunrise * 1000);
  const sun2 = new Date(weather.sunset * 1000);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const sunriseT = sun1.toLocaleTimeString([], options);
  const sunsetT = sun2.toLocaleTimeString([], options);

  sunriseTime.innerText = `${sunriseT}`;
  sunsetTime.innerText = `${sunsetT}`;
}
toDisplayTheData("Delhi");

async function loadForecast(city = "Delhi") {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    // get only one forecast per day (12:00 PM)
    const daily = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    ).slice(0, 5);

    const cards = document.querySelectorAll(".card");

    daily.forEach((day, i) => {
      const card = cards[i];

      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "long"
      });

      card.querySelector(".day").textContent = dayName;
      card.querySelector(".temp").textContent = `${Math.round(day.main.temp - 273.15)}°C`;
      card.querySelector(".desc").textContent = day.weather[0].description;
      card.querySelector(".icon").src =
       `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    });

  } catch (err) {
    console.error(err);
  }
}

loadForecast();