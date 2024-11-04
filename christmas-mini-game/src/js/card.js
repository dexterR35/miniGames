function container_move(callback) {
    $("#shell").css("transform", function(index, value) {
        return value === "translateX(0%)" ? "translateX(-50%)" : "translateX(0%)";
    });
    setTimeout(callback, 500);
  }
  
  function open_card() {
    $("#container-box").css("transform", function(index, value) {
        return value === "rotateX(0deg)" ? "rotateX(70deg)" : "rotateX(0deg)";
    });
  
    $("#box1").css("transform", function(index, value) {
        return value === "rotate3d(0, 1, 0, -180deg)" ? "rotate3d(0, 1, 0, 0deg)" : "rotate3d(0, 1, 0, -180deg)";
    });
  
    $("#box1_back").css("transform", function(index, value) {
        return value === "rotate3d(0, 1, 0, -180deg)" ? "rotate3d(0, 1, 0, 0deg)" : "rotate3d(0, 1, 0, -180deg)";
    });
  
    // $("#tn").text(function(index, text) {
    //     return text === "text" ? "surprise" : "text";
    // });
  }