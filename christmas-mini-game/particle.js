
$(function () {
  let circlesClicked = false;

  $(".circle").click(function () {
    if (circlesClicked) return;
    circlesClicked = true;

    // Capture the start time when the button is clicked
    const startTime = performance.now();

    // Get the clicked circle's position
    const circlePosition = $(this).offset();
    const circleWidth = $(this).outerWidth();
    const circleHeight = $(this).outerHeight();

    $(this).css("visibility", "hidden"); ///remove()

    $(".sparkley:first").sparkleh({
      startX: circlePosition.left + circleWidth / 2,
      startY: circlePosition.top + circleHeight / 2,
      startTime: startTime, // Pass the click start time to sparkleh
      onComplete: function () {
        // Reset circlesClicked to allow re-clicking after animation finishes
        circlesClicked = false;
      },
    });

    setTimeout(function () {
      $("#congratulations-modal").fadeIn();
    }, 800);
  });
});

$.fn.sparkleh = function (options) {
  return this.each(function (k, v) {
    var $this = $(v).css("position", "relative");
    var settings = $.extend(
      {
        width: window.innerWidth,
        height: window.innerHeight,
        color: "rainbow",
        count: 300,
        overlap: 0,
        speed: 5,
        startTime: null, // Store the start time from the click
        onComplete: null, // Callback function to reset circlesClicked
      },
      options
    );
    var sparkle = new Sparkle($this, settings);
  });
};

function Sparkle($parent, options) {
  this.options = options;
  this.init($parent);
}

Sparkle.prototype = {
  init: function ($parent) {
    var _this = this;
    this.$canvas = $("<canvas>")
      .addClass("sparkle-canvas")
      .css({
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        "pointer-events": "none",
        "z-index": 1000,
      })
      .appendTo($parent);

    this.canvas = this.$canvas[0];
    this.context = this.canvas.getContext("2d");

    this.sprite = new Image();
    this.sprites = [0, 20, 0, 20];

    this.sprite.onload = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.particles = this.createSparkles(
        this.canvas.width,
        this.canvas.height
      );
      this.anim = null;
      this.fadeStart = null;

      this.over();
    };

    this.sprite.src = "./image.png";
  },

  createSparkles: function (w, h) {
    var holder = [];
    for (var i = 0; i < this.options.count; i++) {
      var color = this.options.color;
      if (this.options.color == "rainbow") {
        color =
          "#" +
          (
            "000000" + Math.floor(Math.random() * 16777215).toString(16)
          ).slice(-6);
      } else if ($.type(this.options.color) === "array") {
        color =
          this.options.color[
            Math.floor(Math.random() * this.options.color.length)
          ];
      }

      holder[i] = {
        position: { x: this.options.startX, y: this.options.startY },
        style: this.sprites[Math.floor(Math.random() * 4)],
        delta: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
size: parseFloat((10 + Math.random() * 10).toFixed(1)),
        color: color,
        opacity: 1,
        lifespan: 5000,
      };
    }
    return holder;
  },

  draw: function (elapsedTime) {
    let ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.options.count; i++) {
      const derpicle = this.particles[i];
      const modulus = Math.floor(Math.random() * 7);
      if (Math.floor(elapsedTime) % modulus === 0) {
        derpicle.style = this.sprites[Math.floor(Math.random() * 4)];
      }
      ctx.save();
      ctx.globalAlpha = derpicle.opacity;
      ctx.drawImage(
        this.sprite,
        derpicle.style,
        0,
        7,
        7,
        derpicle.position.x,
        derpicle.position.y,
        12,
        12,
      );
      if (this.options.color) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = derpicle.color;
        ctx.fillRect(derpicle.position.x, derpicle.position.y, 7, 7);
      }
      ctx.restore();
    }
  },

  update: function (timestamp) {
    var _this = this;
        // Calculate the elapsed time since the click event
    const elapsedTime = timestamp - this.options.startTime;
    this.anim = window.requestAnimationFrame(function (time) {
      // Start fading after 4 seconds (4000 ms)
      if (elapsedTime >= 4000 && !_this.fadeStart) {
        _this.fadeStart = elapsedTime;
      }
      // If fading has started,  reduce opacity
      if (_this.fadeStart) {
        const fadeElapsed = elapsedTime - _this.fadeStart;
        const fadeDuration = 1000;
        // Stop animation and remove canvas after fading is complete
        if (fadeElapsed >= fadeDuration) {
          window.cancelAnimationFrame(_this.anim);
          _this.$canvas.remove();
          //callback to reset circlesClicked
          if (_this.options.onComplete) _this.options.onComplete();
          return;
        }
      } else {
        // Move particles if not fading
        for (var i = 0; i < _this.options.count; i++) {
          const u = _this.particles[i];
          //expanding point
          u.position.x += u.delta.x * _this.options.speed * 6;
          u.position.y += u.delta.y * _this.options.speed * 6;
        }
      }

      _this.draw(elapsedTime);
      _this.update(time);
    });
  },

  over: function () {
    if (!this.particles) {
      console.error("Particles array is undefined.");
      return;
    }
    console.log(this.particles.length,"test")
    this.update(performance.now());
  },
};
