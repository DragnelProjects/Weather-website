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

async function toGetData() {
  try {
    const data = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd2747019ac3dfcba6167101fd8bc51b",
    );

    if (!data.ok) {
      throw new Error("Can't find the file");
    }

    const weatherData = await data.json();
    return weatherData;
    // console.log(weatherData);
  } catch (error) {
    console.log(error);
  }
}
toGetData();
async function toGetOtherData(){
    const weatherData = await toGetData();

    const weather={
        humidity: weatherData.main.humidity,
        klevin: weatherData.main.temp,

    }

    console.log(weather.humidity);
    // const humidity= weatherData.main.humidity;

    // const kelvin= weatherData.main.temp;
    // const tempreture= Math.floor(kelvin - 273.15);

    // const kelvin2= weatherData.main.feels_like;
    // const feelsLike= Math.floor(kelvin2 - 273.15);
    // return feelsLike;

    // const windSpeed= weatherData.wind.speed;
    // return windSpeed;
    // const discription=weatherData.weather[0].description;
    // return discription;

}
toGetOtherData();
// async function toDisplayTheData(){

