let snowflakes = [];

const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

function initSnowflakes() {
  snowflakes = [];
  for (let i = 0; i < 100; i++) {
    let x;
    if (Math.random() > 0) {
      // Place more snowflakes in the left or right quarter
      x =
        Math.random() > 0.5
          ? Math.random() * (canvas.width * 0.25)
          : canvas.width - Math.random() * (canvas.width * 0.25);
    } else {
      x = (Math.random() * 0.5 + 0.25) * canvas.width;
    }
    // Normal y position
    let y = Math.random() * canvas.height;
    snowflakes.push({
      x: x,
      y: y,
      radius: Math.random() * 2 + 5,
      speed: Math.random() * 2 + 3,
      sway: Math.random() * 0.5 - 0.4,
      opacity: Math.random() * 0.5 + 0.5,
    });
  }
}

// Draw snowflakes
function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach(function (snowflake) {
    ctx.globalAlpha = snowflake.opacity;
    drawSnowflake(snowflake.x, snowflake.y, snowflake.radius);
  });
  ctx.globalAlpha = 1;
}

// Function to draw an individual snowflake with sharp edges
function drawSnowflake(x, y, radius) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();

  for (let i = 0; i < 6; i++) {
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius);
    ctx.moveTo(0, -radius / 2);
    ctx.lineTo(radius / 4, -radius * 0.75);
    ctx.moveTo(0, -radius / 2);
    ctx.lineTo(-radius / 4, -radius * 0.75);
    ctx.moveTo(0, -radius);
    ctx.lineTo(radius / 5, -radius * 1.25);
    ctx.moveTo(0, -radius);
    ctx.lineTo(-radius / 5, -radius * 1.25);
    ctx.rotate(Math.PI / 3);
  }
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

// Move snowflakes
function moveSnowflakes() {
  for (let i = 0; i < snowflakes.length; i++) {
    const snowflake = snowflakes[i];
    snowflake.y += snowflake.speed;
    snowflake.x += snowflake.sway;
    if (snowflake.y > canvas.height) {
      snowflake.y = 0;
      if (Math.random() > 0) {
        // More density at left or right edges
        snowflake.x =
          Math.random() > 0.5
            ? Math.random() * (canvas.width * 0.12)
            : canvas.width - Math.random() * (canvas.width * 0.12);
      } else {
        snowflake.x = (Math.random() * 0.5 + 0.25) * canvas.width;
      }
    }
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);

function animate_all() {
  drawSnowflakes();
  moveSnowflakes();
  requestAnimationFrame(animate_all);
}
