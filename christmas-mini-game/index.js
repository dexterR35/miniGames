document.addEventListener("DOMContentLoaded", function () {
    
    let circlesClicked = false;

    $(".circle").click(function () {
      if (circlesClicked) return;
      circlesClicked = true;
      // Capture the start time when the button is clicked
      const startTime = performance.now();
      const circlePosition = $(this).offset();
      const circleWidth = $(this).outerWidth();
      const circleHeight = $(this).outerHeight();
  
      $(this).css("visibility", "hidden"); ///remove()
  
      $(".sparkley:first").sparkleh({
        startX: circlePosition.left + circleWidth / 2,
        startY: circlePosition.top + circleHeight / 2,
        startTime: startTime,
        onComplete: function () {
          circlesClicked = false;
        },
      });
  
      setTimeout(function () {
        $("#_modal").css("display", "flex").hide().fadeIn();
        setTimeout(function () {
          container_move(function () {
            open_card();
          }); 
        }, 1000);
      }, 800);
    });
    
    
    resizeCanvas();
    initSnowflakes();
    countdown();
    anim_globes();
    animate_all();
  });
  
