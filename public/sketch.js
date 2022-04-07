

function setup() {
    createCanvas(windowWidth, windowHeight);

     const response = await fetch('/round_num');
    var  result= await response.json(); 
     console.log(result) 
  }
  
  var i = 100

  function draw() {
    /* console.log("abbbss") */
     draw_all_rect() 
     draw_hud()

  } 

 function draw_rect(i){
    rect(250 + i , 220, 60, 60);
}

function draw_all_rect(){ 
    for (var h = 1 ; h < 10 ; h= h + 1){
        for (var l = 0 ; l < 9 ; l = l + 1){
            rect((windowWidth/2) - 270 + (l*60) , (windowHeight/2)-270 + (h*60), 60, 60)
        }
    }
          
} 

function draw_hud(){ 
    var width = 480
    var height = 70 
    rect((windowWidth/2) - (width/2) ,50,width,height)
}


function CheckClick(x,y,x1,y1,w1,h1){
    if(x >= x1 && x <=  x1 + w1 && y >= y1 && y <= y + h1){
        return true
        console.log('aaa')
    } 
}