// let interval = setInterval(countdown, 1000);

function countdown() {
    const deadline = new Date("Dec 24, 2024 01:59:00").getTime();
    const now = new Date().getTime();
    const t = deadline - now;
    let days = Math.floor(t / (1000 * 3600 * 24));
    $("#day").html(days);
    if (t < 0) {
    //   clearInterval(interval);
      $("#clock_time").html("TIME UP");
      $("#day").html("0");
    }
  }


function anim_globes() {
  $('#circle-container .circle').each(function(index) {
    setInterval(() => {
      setTimeout(() => {
          $(this).css({
              transform: "translateY(-20px) scale(1)"
          });
          setTimeout(() => {
              $(this).css("transform", "translateY(0) scale(1)");
          }, 600); 
      }, index * 200); 
  }, 1000);
});
}