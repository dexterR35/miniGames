$(function() {
  // Set up the sparkley element but do not start the animation yet


  // Add a click event to the button to trigger the sparkle effect
  $("#start-sparkle").click(function() {
      $(".sparkley:first").sparkleh({
          width: window.innerWidth,
          height: window.innerHeight,
          count: 300, // Increase the count for a denser sparkle effect
          explosion: true,
          speed: 2 // Increase speed for a faster explosion
      });
  });
});

$.fn.sparkleh = function(options) {
  return this.each(function(k, v) {
      var $this = $(v).css("position", "relative");
      var settings = $.extend({
          width: 80,
          height: 80,
          color: "rainbow",
          count: 100,
          overlap: 10,
          speed: 1,
          explosion: false // Default to no explosion
      }, options);
      var sparkle = new Sparkle($this, settings);
      sparkle.over();
  });
}

function Sparkle($parent, options) {
  this.options = options;
  this.init($parent);
}

Sparkle.prototype = {
  "init": function($parent) {
      var _this = this;
      this.$canvas =
          $("<canvas>")
              .addClass("sparkle-canvas")
              .css({
                  position: "fixed",
                  top: "0",
                  left: "0",
                  width: "100%", // Full width
                  height: "100%", // Full height
                  "pointer-events": "none",
                  "z-index": 1000 // Ensure it stays above other elements
              })
              .appendTo($parent);

      this.canvas = this.$canvas[0];
      this.context = this.canvas.getContext("2d");

      this.sprite = new Image();
      this.sprites = [0, 6, 0, 20];
      
      this.sprite.onload = () => {
          this.canvas.width = window.innerWidth; // Set full-screen width
          this.canvas.height = window.innerHeight; // Set full-screen height
          this.particles = this.createSparkles(this.canvas.width, this.canvas.height);
          this.anim = null;
          this.fade = false;
          this.over();
      };

      this.sprite.src = "./image.png";
  },

  "createSparkles": function(w, h) {
      var holder = [];
      for (var i = 0; i < this.options.count; i++) {
          var color = this.options.color;
          if (this.options.color == "rainbow") {
              color = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
          } else if ($.type(this.options.color) === "array") {
              color = this.options.color[Math.floor(Math.random() * this.options.color.length)];
          }

          holder[i] = {
              position: { x: w / 2, y: h / 2 },
              style: this.sprites[Math.floor(Math.random() * 4)],
              delta: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
              size: parseFloat((Math.random() * 2).toFixed(2)),
              color: color,
              opacity: 1
          };
      }
      return holder;
  },

  "draw": function(time) {
      var ctx = this.context;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (var i = 0; i < this.options.count; i++) {
          var derpicle = this.particles[i];
          var modulus = Math.floor(Math.random() * 7);
          if (Math.floor(time) % modulus === 0) {
              derpicle.style = this.sprites[Math.floor(Math.random() * 4)];
          }
          ctx.save();
          ctx.globalAlpha = derpicle.opacity;
          ctx.drawImage(this.sprite, derpicle.style, 0, 7, 7, derpicle.position.x, derpicle.position.y, 7, 7);
          if (this.options.color) {
              ctx.globalCompositeOperation = "source-atop";
              ctx.globalAlpha = 0.5;
              ctx.fillStyle = derpicle.color;
              ctx.fillRect(derpicle.position.x, derpicle.position.y, 7, 7);
          }
          ctx.restore();
      }
  },

  "update": function() {
      var _this = this;
      this.anim = window.requestAnimationFrame(function(time) {
          for (var i = 0; i < _this.options.count; i++) {
              var u = _this.particles[i];
              u.position.x += u.delta.x * _this.options.speed * 2;
              u.position.y += u.delta.y * _this.options.speed * 2;

              if (_this.fade) { u.opacity -= 0.02; } else { u.opacity -= 0.005; }
              if (u.opacity <= 0) { u.opacity = (_this.fade) ? 0 : 1; }
          }
          _this.draw(time);
          _this.update();
      });
  },

  "over": function() {
      window.cancelAnimationFrame(this.anim);
      for (var i = 0; i < this.options.count; i++) { this.particles[i].opacity = Math.random(); }
      this.fade = false;
      this.update();
  }
};
