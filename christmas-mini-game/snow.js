document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("snowCanvas");
    var ctx = canvas.getContext("2d");

    // Set canvas size and resize handler
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
                sway: (Math.random() * 0.5) - 0.25, // Sway movement
                opacity: Math.random() * 0.5 + 0.5  // Random opacity for softness
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
        ctx.globalAlpha = 1;  // Reset alpha
    }

    // Function to draw an individual snowflake with sharp edges
    function drawSnowflake(x, y, radius) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();

        // Loop through each branch of the snowflake (6 branches for a typical snowflake)
        for (let i = 0; i < 6; i++) {
            ctx.moveTo(0, 0);

            // Draw the main branch
            ctx.lineTo(0, -radius);

            // Draw smaller branches on each side
            ctx.moveTo(0, -radius / 2);
            ctx.lineTo(radius / 4, -radius * 0.75);
            ctx.moveTo(0, -radius / 2);
            ctx.lineTo(-radius / 4, -radius * 0.75);

            ctx.moveTo(0, -radius);
            ctx.lineTo(radius / 5, -radius * 1.25);
            ctx.moveTo(0, -radius);
            ctx.lineTo(-radius / 5, -radius * 1.25);

            // Rotate to create the next branch
            ctx.rotate(Math.PI / 3);
        }

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5;  // Reduced width for a more delicate appearance
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