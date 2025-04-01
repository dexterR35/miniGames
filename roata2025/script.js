$(document).ready(function () {
  const wheel = $(".roata");
  let isSpinning = false;

  const blurStyle = `
      .roata {
          transition: filter 0.8s ease-in-out;
          filter: blur(0px);
      }
      .blur-start {
          filter: blur(1px);
          transition: filter 1.2s ease-in;
      }
      .blur-peak {
          filter: blur(2px);
          transition: filter 1s ease-in-out;
      }
      .blur-ending {
          filter: blur(0px);
          transition: filter 1.5s ease-out;
      }
    `;
  $("<style>").text(blurStyle).appendTo("head");

  const TIMINGS = {
    WHEEL_SPIN: 3500,
    CONFETTI_DURATION: 3000,
    RESET_DELAY: 500,
  };

  function showConfetti() {
    console.log("🎊 Starting fireworks animation");
    return new Promise((resolve) => {
      if (typeof confetti !== "function") {
        console.error("⚠️ Confetti library not loaded!");
        resolve();
        return;
      }

      const duration = TIMINGS.CONFETTI_DURATION;
      const animationEnd = Date.now() + duration;

      const defaults = {
        spread: 300,
        ticks: 100,
        gravity: 1,
        decay: 0.96,
        startVelocity: 20,
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
        origin: { x: 0.5, y: 0.5 },
        zIndex: 1,
        scalar: 1.4,
        shapes: ["star"],
      };

      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.3,
          shapes: ["circle"],
        });
        confetti({
          ...defaults,
          particleCount: 30,
          scalar: 1.7,
          shapes: ["circle"],
        });
      }

      const interval = setInterval(() => {
        if (Date.now() >= animationEnd) {
          clearInterval(interval);
          console.log("🎊 Fireworks completed");
          resolve();
        } else {
          shoot();
        }
      }, 200);
    });
  }

  function startSpin() {
    console.log("🎡 Starting wheel spin");
    return new Promise((resolve) => {
      wheel.addClass("blur-start");

      setTimeout(() => {
        wheel.removeClass("blur-start").addClass("blur-peak");
      }, 400);

      wheel.css({
        transition: `transform ${TIMINGS.WHEEL_SPIN}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        transform: "rotate(1440deg)",
      });

      setTimeout(() => {
        wheel.removeClass("blur-peak").addClass("blur-ending");
      }, TIMINGS.WHEEL_SPIN - 550);

      setTimeout(() => {
        console.log("✨ Wheel spin completed");
        wheel.removeClass("blur-ending");
        resolve();
      }, TIMINGS.WHEEL_SPIN);
    });
  }

  function resetWheel() {
    console.log("🔄 Resetting wheel position");
    return new Promise((resolve) => {
      wheel.css({ transition: "none", transform: "rotate(0deg)" });
      setTimeout(() => {
        console.log("🔄 Wheel reset completed");
        resolve();
      }, 450);
    });
  }

  async function animationSequence() {
    if (isSpinning) {
      console.log("⚠️ Wheel is already spinning");
      return;
    }

    isSpinning = true;
    console.log("🎯 Starting animation sequence");

    try {
      await resetWheel();
      await startSpin();
      await showConfetti();

      console.log("🧹 Confetti animation ended");

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds after confetti

      console.log("✅ Animation sequence completed. Starting next spin.");
      isSpinning = false;
    } catch (error) {
      console.error("❌ Animation sequence error:", error);
      isSpinning = false;
    }

    // Start the animation loop again
    animationSequence();
  }

  // Start animation automatically after 2 seconds when page is fully loaded
  console.log("🚀 Page loaded, starting animation in 2 seconds...");

  setTimeout(() => {
    animationSequence();
  }, 2000); // Wait 2 seconds after page load before starting the animation
});
