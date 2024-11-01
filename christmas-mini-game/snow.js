document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("snowCanvas");
    var ctx = canvas.getContext("2d");
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate snowflakes
    var snowflakes = [];
    function initSnowflakes() {
        snowflakes = [];
        for (var i = 0; i < 100; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: (Math.random() * 2) + 3,  // Adjusted for a more subtle effect
                speed: (Math.random() * 1.5) + 2,
                sway: (Math.random() * 0.5) - 1, // Sway movement
                opacity: Math.random() * 0.5 + 0.5  
            });
        }
    }
    initSnowflakes();

    // Draw snowflakes
    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(function(snowflake) {
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

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5; 
        ctx.stroke();
        ctx.restore();
    }

    // Move snowflakes
    function moveSnowflakes() {
        for (var i = 0; i < snowflakes.length; i++) {
            var snowflake = snowflakes[i];
            snowflake.y += snowflake.speed;
            snowflake.x += snowflake.sway;  // Add sway effect
            if (snowflake.y > canvas.height) {
                snowflake.y = 0;
                snowflake.x = Math.random() * canvas.width;
            }
        }
    }

    // Animate snowflakes
    function animate() {
        drawSnowflakes();
        moveSnowflakes();
        requestAnimationFrame(animate);
    }

    animate();
});
