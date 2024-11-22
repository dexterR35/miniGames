// Weather Application with Precipitation Animation

// Global Variables and Settings
const apiKey = "f0d25897d49d448da8482126241211";
const isMobile = window.innerWidth <= 768;
const options = {
  precipitation: null, // "rain" or "snow", or null for no precipitation
  intensity: "light",
  easing: 1,
};

const intensitySettings = {
  rain: {
    light: {
      maxParticles: isMobile ? 200 : 400, // Reduce max particles for mobile
      density: isMobile ? 0.4 : 0.7,
      speed: 15, // Slightly slower on mobile
      wind: -1,
      dropSize: 8,
      dropWidth: 1.5,
    },
    moderate: {
      maxParticles: isMobile ? 350 : 700,
      density: isMobile ? 0.5 : 0.7,
      speed: 25,
      wind: 2,
      dropSize: 10,
      dropWidth: 2,
    },
    heavy: {
      maxParticles: isMobile ? 600 : 1200,
      density: isMobile ? 0.8 : 1,
      speed: 40,
      wind: -4,
      dropSize: 12,
      dropWidth: 2,
    },
  },
  snow: {
    light: {
      maxParticles: isMobile ? 300 : 500,
      density: isMobile ? 0.2 : 0.3,
      speed: 15,
      wind: -1,
      snowSize: 3,
    },
    moderate: {
      maxParticles: isMobile ? 500 : 700,
      density: isMobile ? 0.4 : 0.7,
      speed: 25,
      wind: -2,
      snowSize: 4,
    },
    heavy: {
      maxParticles: isMobile ? 800 : 1000,
      density: isMobile ? 0.9 : 1.4,
      speed: 35,
      wind: 4,
      snowSize: 5,
    },
  },
};


const oCanvas = document.getElementById("canvas");
const oCanvasCtx = oCanvas.getContext("2d");
let oSize = { h: window.innerHeight, w: window.innerWidth };

// Utility Functions
const requestAnimFrame = (() =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  ((callback) =>
    setTimeout(callback, isMobile ? 1000 / 30 : 1000 / 60)))(); 

const resizeCanvas = () => {
  oSize.w = oCanvas.width = window.innerWidth;
  oSize.h = oCanvas.height = window.innerHeight;

  if (oPrecipitation) {
    oPrecipitation.particles.forEach((particle) => {
      particle.x = Math.random() * oSize.w;
      particle.y = Math.random() * oSize.h;
    });
    if (isMobile) {
      options.easing = 0.9; // Smoother movement on mobile
    }
  }
};

// Precipitation Class
class Precipitation {
  constructor() {
    this.particles = [];
  }

  rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  addParticle() {
    if (!options.precipitation) return;

    const settings =
      intensitySettings[options.precipitation][options.intensity];
    const newParticles = isMobile
      ? Math.ceil(settings.density * 2) // Fewer particles on mobile
      : Math.ceil(settings.density * 5);
  
    for (let i = 0; i < newParticles; i++) {
      if (
        this.particles.length < settings.maxParticles &&
        Math.random() < settings.density
      ) {
        this.particles.push(this.buildParticle(settings));
      }
    }
  }

  buildParticle(settings) {
    if (options.precipitation === "rain") {
      return {
        x: this.rand(-100, oSize.w + 100),
        y: -this.rand(50, 200),
        h: this.rand(3, settings.dropSize),
        w: this.rand(1, settings.dropWidth),
        speedy: this.rand(settings.speed / 2.5, settings.speed),
        speedx: settings.wind,
      };
    } else if (options.precipitation === "snow") {
      return {
        x: this.rand(-100, oSize.w + 100),
        y: -this.rand(50, 200),
        size: Math.max(2, this.rand(2, settings.snowSize)),
        speedy: this.rand(settings.speed / 5, settings.speed / 2),
        speedx: this.rand(settings.wind - 1, settings.wind + 1),
      };
    }
  }

  updateParticles() {
    if (!options.precipitation) return;

    this.particles = this.particles.filter((particle) => {
      const targetX = particle.x + particle.speedx + Math.sin(particle.y / 2);
      const targetY = particle.y + particle.speedy;

      particle.x += (targetX - particle.x) * options.easing;
      particle.y += (targetY - particle.y) * options.easing;

      return (
        particle.y <= oSize.h &&
        particle.x >= -100 &&
        particle.x <= oSize.w + 100
      );
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, oSize.w, oSize.h);
    if (!options.precipitation) return;

    this.particles.forEach((particle) => {
      if (options.precipitation === "rain") {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.speedx, particle.y + particle.h);
        ctx.strokeStyle = "rgba(200,230,255,0.9)";
        ctx.lineWidth = particle.w;
        ctx.stroke();
      } else if (options.precipitation === "snow") {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
      }
    });
  }
}

const oPrecipitation = new Precipitation();

// Weather Handling Functions
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(`${latitude},${longitude}`);
      },
      (error) => {
        const messages = {
          [error.PERMISSION_DENIED]:
            "Location access denied. Please enter a city name.",
          [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
          [error.TIMEOUT]: "The request to get your location timed out.",
        };
        showError(messages[error.code] || "An unknown error occurred.");
      }
    );
  } else {
    showError("Geolocation is not supported by this browser.");
  }
}

function getWeather(query) {
  $.ajax({
    url: `https://api.weatherapi.com/v1/current.json`,
    data: { key: apiKey, q: query },
    method: "GET",
    success: function (data) {
      const temperature = data.current.temp_c;
      const weatherCode = data.current.condition.code;
      const isDay = data.current.is_day === 1; // Check for day or night
      console.log("Weather Code:", data);
      console.log("Weather Code:", weatherCode);
      $("#temperature").text(`${temperature.toFixed(1)}°C`);
      $("#condition").text(data.current.condition.text);
      $("#timeOfDay").text(isDay ? "Day" : "Night");
      $("#country").text(data.location.country);
      $("#city").text(data.location.region);

      updatePrecipitation(weatherCode, isDay); // Pass isDay to the updatePrecipitation function
    },
    error: function () {
      showError("Error fetching weather data. Please try again.");
    },
  });
}

function updatePrecipitation(code, isDay) {
  const rainCodes = {
    light: [1150, 1153, 1180, 1183],
    moderate: [1186, 1189],
    heavy: [1192, 1195],
  };
  const snowCodes = {
    light: [1210, 1213, 1216],
    moderate: [1219, 1222,1117],
    heavy: [1225, 1237],
  };
  const fogCodes = [1135, 1147, 1030, 1006, 1009]; // Fog or cloudy codes
  const sunCodes = [1000]; // Clear sunny day

  let precipitationType = null;
  let intensity = "light";

  if (rainCodes.light.includes(code)) {
    precipitationType = "rain";
  } else if (rainCodes.moderate.includes(code)) {
    precipitationType = "rain";
    intensity = "moderate";
  } else if (rainCodes.heavy.includes(code)) {
    precipitationType = "rain";
    intensity = "heavy";
  } else if (snowCodes.light.includes(code)) {
    precipitationType = "snow";
  } else if (snowCodes.moderate.includes(code)) {
    precipitationType = "snow";
    intensity = "moderate";
  } else if (snowCodes.heavy.includes(code)) {
    precipitationType = "snow";
    intensity = "heavy";
  } else if (fogCodes.includes(code)) {
    precipitationType = "fog";
  } else if (sunCodes.includes(code)) {
    precipitationType = "sun";
  }

  options.precipitation = precipitationType;
  options.intensity = intensity;

  // Handle night-specific changes
  let timeOfDayText = isDay ? "Day" : "Night";

  if (precipitationType === "rain") {
    $(".test").text(
      `It's ${timeOfDayText}, and it's raining (${intensity}). Stay dry!`
    );
    if (!isDay) {
      oCanvasCtx.strokeStyle = "rgba(100,120,150,0.7)"; // Dimmer rain particles
    }
  } else if (precipitationType === "snow") {
    $(".test").text(
      `It's ${timeOfDayText}, and it's snowing (${intensity}). Stay warm!`
    );
    if (!isDay) {
      oCanvasCtx.fillStyle = "rgba(200,200,255,0.8)"; // Slightly bluish snow particles
    }
  } else if (precipitationType === "fog") {
    $(".test").text(
      `It's ${timeOfDayText}, and it's cloudy/foggy. Visibility may be low.`
    );
    options.precipitation = null;
    oPrecipitation.particles = [];
    oCanvasCtx.clearRect(0, 0, oSize.w, oSize.h);
  } else if (precipitationType === "sun") {
    $(".test").text(
      `It's ${timeOfDayText}, and the skies are clear. Enjoy the weather!`
    );
    options.precipitation = null;
    oPrecipitation.particles = [];
    oCanvasCtx.clearRect(0, 0, oSize.w, oSize.h);
  } else {
    $(".test").text(`It's ${timeOfDayText}, and weather information is updating.`);
    options.precipitation = null;
    oPrecipitation.particles = [];
    oCanvasCtx.clearRect(0, 0, oSize.w, oSize.h);
  }
}


function searchWeather() {
  const city = $("#cityInput").val().trim(); // Ensure you have an input element with id="cityInput"
  if (city) {
    getWeather(city);
  } else {
    showError("Please enter a city name.");
  }
}
function showError(message) {
  alert(message); // Display error
}

// Event Listeners
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 150);
});

// Rendering Animation
function render() {
  oPrecipitation.addParticle();
  oPrecipitation.updateParticles();
  oPrecipitation.draw(oCanvasCtx);
  requestAnimFrame(render);
}

// Initial Setup
resizeCanvas();
render();
window.onload = function () {
  getUserLocation();
};
