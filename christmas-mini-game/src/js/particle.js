

$.fn.sparkleh = function (options) {
  return this.each(function (k, v) {
    const $this = $(v).css("position", "relative");
    const settings = $.extend(
      {
        width: window.innerWidth,
        height: window.innerHeight,
        color: "rainbow",
        count: 300,
        overlap: 0,
        speed: 5,
        startTime: null,
        onComplete: null,
      },
      options
    );
    let sparkle = new Sparkle($this, settings);
  });
};

function Sparkle($parent, options) {
  this.options = options;
  this.init($parent);
}

Sparkle.prototype = {
  init: function ($parent) {
    const _this = this;
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
    this.sprite.src = "./src/img/image.png";
  },

  createSparkles: function (w, h) {
    const particles = [];
    for (let i = 0; i < this.options.count; i++) {
      const color = this.options.color === "rainbow"
        ? `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
        : Array.isArray(this.options.color)
        ? this.options.color[Math.floor(Math.random() * this.options.color.length)]
        : this.options.color;

      particles.push({
        position: { x: this.options.startX, y: this.options.startY },
        style: this.sprites[Math.floor(Math.random() * this.sprites.length)],
        delta: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
        size: parseFloat((10 + Math.random() * 10).toFixed(1)),
        color,
        opacity: 1,
      });
    }
    return particles;
  },

  draw: function (elapsedTime) {
    let ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.options.count; i++) {
      const objParticles = this.particles[i];
      // const modulus = Math.floor(Math.random() * 1);
      // console.log(modulus,"modulus")
      if (Math.floor(elapsedTime)) {
        objParticles.style = this.sprites[Math.floor(Math.random() * 4)];
      }
      ctx.save();
      ctx.globalAlpha = objParticles.opacity;
      ctx.drawImage(
        this.sprite,
        objParticles.style,
        0,
        7,
        7,
        objParticles.position.x,
        objParticles.position.y,
        12,
        12
      );
      if (this.options.color) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = objParticles.color;
        ctx.fillRect(objParticles.position.x, objParticles.position.y, 7, 7);
      }
      ctx.restore();
    }
  },

  update: function (timestamp) {
    let _this = this;
    // Calculate the elapsed time since the click event
    const elapsedTime = timestamp - this.options.startTime;
    this.anim = window.requestAnimationFrame(function (time) {
      if (elapsedTime >= 4000 && !_this.fadeStart) {
        _this.fadeStart = elapsedTime;
      }
      // If fading has started, reduce opacity
      if (_this.fadeStart) {
        const fadeElapsed = elapsedTime - _this.fadeStart;
        const fadeDuration = 1000;
        // Stop animation and remove canvas after fading is complete
        if (fadeElapsed >= fadeDuration) {
          console.log(
            fadeElapsed >= fadeDuration,
            "fadeElapsed >= fadeDuration"
          );
          window.cancelAnimationFrame(_this.anim);
          _this.$canvas.remove();
          //callback to reset circlesClicked
          if (_this.options.onComplete) _this.options.onComplete();
          return;
        }
      } else {
        // Move particles if not fading
        for (let i = 0; i < _this.options.count; i++) {
          const u = _this.particles[i];
          //expanding from center
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
    console.log(this.particles.length, "test");
    this.update(performance.now());
  },
};




document.addEventListener("DOMContentLoaded", function() {

});


