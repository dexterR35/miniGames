
const requestAnimFrame = (() =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  ((callback) => setTimeout(callback, 1000 / 60)))();

/** Options **/
const options = {
  precipitation: "rain", // "rain" or "snow"
  intensity: "light", // "light", "moderate", "heavy"
  easing: 1, // Easing value (e.g., 0.01 for faster, 1 for slower)
};

/** Settings for rain and snow intensities **/
const intensitySettings = {
  rain: {
    light: { maxParticles: 400, density: 0.7, speed: 20, wind: -1, dropSize: 10, dropWidth: 2 },
    moderate: { maxParticles: 700, density: 0.7, speed: 35, wind: 2, dropSize: 15, dropWidth: 2 },
    heavy: { maxParticles: 1200, density: 1, speed: 50, wind: -4, dropSize: 15, dropWidth: 2 },
  },
  snow: {
    light: { maxParticles: 500, density: 0.3, speed: 20, wind: -1, snowSize: 4 },
    moderate: { maxParticles: 700, density: 0.7, speed: 35, wind: -3, snowSize: 4 },
    heavy: { maxParticles: 1000, density: 1.4, speed: 50, wind: 6, snowSize: 5 },
  },
};

/** Global vars **/
const oCanvas = document.getElementById("canvas");
const oCanvasCtx = oCanvas.getContext("2d");

let oSize = {
  h: window.innerHeight,
  w: window.innerWidth,
};

const resizeCanvas = () => {
  oSize.w = oCanvas.width = window.innerWidth;
  oSize.h = oCanvas.height = window.innerHeight;

  // Adjust particle positions on resize
  if (oPrecipitation) {
    oPrecipitation.particles.forEach((particle) => {
      particle.x = Math.random() * oSize.w;
      particle.y = Math.random() * oSize.h;
    });
  }
};

let resizeTimeout;

class Precipitation {
  constructor() {
    this.particles = [];
  }

  rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  addParticle() {
    const settings = intensitySettings[options.precipitation][options.intensity];
    const newParticles = Math.ceil(settings.density * 5);

    for (let i = 0; i < newParticles; i++) {
      if (this.particles.length < settings.maxParticles && Math.random() < settings.density) {
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
    this.particles = this.particles.filter((particle) => {
      const targetX = particle.x + particle.speedx + Math.sin(particle.y / 20); // Sinusoidal motion
      const targetY = particle.y + particle.speedy;

      particle.x += (targetX - particle.x) * options.easing;
      particle.y += (targetY - particle.y) * options.easing;

      // Remove particles when they go out of bounds
      return (
        particle.y <= oSize.h &&
        particle.x >= -100 &&
        particle.x <= oSize.w + 100
      );
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, oSize.w, oSize.h);
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

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 150);
});
resizeCanvas();

/** Animation **/
function render() {
  oPrecipitation.addParticle();
  oPrecipitation.updateParticles();
  oPrecipitation.draw(oCanvasCtx);
  requestAnimFrame(render);
}

render();

/** Change Options Dynamically **/
function setPrecipitation(type, intensity) {
  if (["rain", "snow"].includes(type) && ["light", "moderate", "heavy"].includes(intensity)) {
    options.precipitation = type;
    options.intensity = intensity;
  }
}
