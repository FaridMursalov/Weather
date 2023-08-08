let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let weather = document.querySelector(".weather");
let country = document.querySelector(".country");
let dateClass = document.querySelector(".date");
let minTemp = document.querySelector(".min");
let maxTemp = document.querySelector(".max");
let main = document.querySelector(".main");
let pressure = document.querySelector(".pressureDegree");
let wind = document.querySelector(".windDegree");
let reelFeel = document.querySelector(".reelDegree");
let humidity = document.querySelector(".humidityDegree");
let weatherImg = document.querySelector(".weatherIcon");

let latitude, longitude;
//Date
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = new Date();
let dayName = weekday[date.getDay()];
let monthName = month[date.getMonth()];
let getDate = date.getDate();
let getYear = date.getFullYear();
let getHours = `${date.getHours()}`.padStart(2, "0");
let getMinute = `${date.getMinutes()}`.padStart(2, "0");
dateClass.innerHTML = `${dayName} ${getDate} ${monthName} ${getYear} ${getHours}:${getMinute}`;

navigator.geolocation.getCurrentPosition(getPositions);

function getPositions(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  getData();
}

const getData = () => {
  
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=be9006a3c7cf8d86ce4c460922f6c8ca&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      city.innerHTML = data.name;
      temp.innerHTML = Math.round(data.main.temp);
      country.innerHTML = data.sys.country;
      minTemp.innerHTML = `Min:${Math.round(data.main.temp_min)}°`;
      maxTemp.innerHTML = `Max:${Math.round(data.main.temp_max)}°`;
      reelFeel.innerHTML = `${Math.round(data.main.feels_like)}°`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} m/s`;
      pressure.innerHTML = `${data.main.pressure} hPa`;
      if (
        data.weather[0].main === "Clear" &&
        new Date().getHours() >= 6 &&
        new Date().getHours() < 20
      ) {
        weatherImg.src = "icon/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherImg.src = "icon/raining.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherImg.src = "icon/rainy-day.png";
      }
      else if (data.weather[0].main == "Clouds") {
        weatherImg.src = "icon/clouds.png";
      }
      else if (data.weather[0].main == "Mist") {
        weatherImg.src = "icon/mist.png";
      } else if (data.weather[0].main == "Snow") {
        weatherImg.src = "icon/snow.png";
      } else if (new Date().getHours() >= 20 || new Date().getHours() < 7) {
        weatherImg.src = "icon/moon.png";
      }
    });
};
