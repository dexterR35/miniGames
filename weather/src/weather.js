const apiKey = "f0d25897d49d448da8482126241211";

function getUserLocation() {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    getWeather(`${latitude},${longitude}`);
  },
  error => {
    if (error.code === error.PERMISSION_DENIED) {
      alert("Location access denied. Please enter a city name.");
    } else {
      alert("Unable to retrieve location. Please enter a city name.");
    }
  }
);
} else {
alert("Geolocation not supported. Please enter a city name.");
}
}

function searchWeather() {
  const city = $('#cityInput').val().trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
}

function getWeather(query) {
    $.ajax({
      url: `https://api.weatherapi.com/v1/current.json`,
      data: { key: apiKey, q: query },
      method: "GET",
      success: function (data) {
        const temperature = data.current.temp_c;
        const weatherCondition = data.current.condition.text;
        const isDaytime = data.current.is_day === 1;
        const localTime = data.location.localtime;
        const weatherCode = data.current.condition.code;
        
        console.log("Weather Code:", weatherCode);
        console.log("Data:", data);
  
        $('#temperature').text(`${temperature.toFixed(1)}°C`);
        $('#condition').text(weatherCondition);
        $('#timeOfDay').text(isDaytime ? "Day" : "Night");
        $('#country').text(data.location.country);
        $('#city').text(data.location.region);
        
        // Update background and precipitation effects
        updateBackground(weatherCode, isDaytime);
        updatePrecipitation(weatherCode);
      },
      error: function () {
        $('#temperature').text("Error fetching data");
        $('#condition').text("");
        $('#timeOfDay').text("");
        $('#details').text("");
      }
    });
  }


  function updatePrecipitation(code) {
    // Map weather codes to precipitation type and intensity
    let precipitationType = null;
    let intensity = "light";
  
    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240].includes(code)) {
      precipitationType = "rain";
      intensity = "moderate"; // Adjust based on the code
    } else if ([1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
      precipitationType = "snow";
      intensity = "heavy"; // Adjust based on the code
    }
  
    if (precipitationType) {
      setPrecipitation(precipitationType, intensity);
    } else {
      // Clear precipitation effects if no precipitation
      options.precipitation = null;
    }
  }
$(document).ready(function() {
  getUserLocation();
});