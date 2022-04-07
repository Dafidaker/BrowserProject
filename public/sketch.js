function setup() {
    createCanvas(1920, 1080);
  }
  
  var i = 100

  function draw() {
    /* draw_all_rect() */
    do {
        console.log(a)
        rect(350 + i , 220, 100, 100);
        i=i + 100;
      }
      while (i < 1000); 
  }

/* function draw_rect(i){
    rect(350 + i , 220, 100, 100);
}

function draw_all_rect(){ 
    for (var i = 100 ; i < 1000 ; i = i +100){
        draw_rect(i)
          }  
} */