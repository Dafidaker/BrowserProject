//const { text } = require("body-parser");

  var i = 0;
  var battleRound;
  var playerinfo;
  var playerdeck;
  var cur_round;
  let canvasx
  let canvasy
  let chessbuttons = {}
  let playerif = {mana: 0 , health:20}
  
 

function setup() {
    canvasx = windowWidth
    canvasy = windowHeight
   let canvas = createCanvas(canvasx, canvasy);
    canvas.parent('game');
    gamestart()
  }

  function gamestart() {
    getBattleRound()
    getplayerinformation()
    getplayerdeck()
}

  function updateME(){
    CheckClick(mouseX,mouseY,100,100,100,100);
  }

  function draw() {
     draw_all_rect() ;
     //draw_hud();
     rect(100,100,100,100);
     //print('update')
    /* text(mouseX,50,50)
    text(mouseY,50,70) */
    

     updateME();
     
  } 



function draw_all_rect(){ 
    let position = 350
    let x_reposition = (9*60)/2 // number of columns * width / half of the whole square 
    if(i < 81){
        for (var h = 1 ; h < 10 ; h= h + 1){
            for (var l = 0 ; l < 9 ; l = l + 1){
                rect((canvasx/2) - x_reposition + (l*60) , (canvasy/2)-position + (h*60), 60, 60)
                chessbuttons[i+1] ={
                            x:(canvasx/2) - x_reposition + (l*60),
                            y:(canvasy/2) - position + (h*60),
                            width: 60,
                            height:60
                }
                i = i + 1 ;
                text(i, (canvasx/2) - x_reposition + (l*60) +30 , (canvasy/2)-position + 60 + (h*60)-30 ); 
                /* if (i > 81 ){
                    i=0;
                    noLoop();} */
            }
        }  
    }     
} 

function draw_hud(){ 
    var width = 480
    var height = 70 
    // round number
    rect((canvasx/2) - (width/2) ,50,width,height)
    textSize(50)
    text(cur_round,(canvasx/2)-(textWidth(cur_round)/2) ,height + (height/2))
    // player information 
    rect((canvasx*0.8) ,(canvasy*0.8),(canvasx*0.2),(canvasy*0.2))
    textSize(20)
    text(playerif.health,(canvasx*0.8) +10 ,(canvasy*0.8) +40)
    text(playerif.mana,(canvasx*0.8) +10 ,(canvasy*0.8) +70)
    //text(playerinfo[0].player_mana,(canvasx*0.8) +10 ,(canvasy*0.8) +30) 
    
}


function CheckClick(x,y,x1,y1,w1,h1){
    if((x >= x1) && (x <=  x1 + w1)){
        if((y >= y1) && (y <= y1 + h1)){
           console.log('aaa')
        return true  
        }
    } 
}

 function mousePressed(){
    //print('MX' + mouseX ,'\n', 'MY'+ mouseY )
    //print(chessbuttons)
    for (a=1 ; a <= 81; a++){
        //print('uu')
        if(CheckClick(mouseX,mouseY,chessbuttons[a].x,chessbuttons[a].y,chessbuttons[a].width,chessbuttons[a].height)){
            k = a 
            print('index ' + k)
            break
        }
    }
    
} 

async function getBattleRound() {
    try {
        let battleId = 1;
        const response = await fetch(`/round_num/${battleId}`);
        if (response.status == 200) {
           var battleRound= await response.json();
           cur_round = 'Round ' + (battleRound[0].battle_round); // Round [nº]
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}   



async function getplayerinformation() {
    try {
        let playerid = 1;
        const response = await fetch(`/player_info/${playerid}`);
        if (response.status == 200) {
           var playerinfo = await response.json();
           print('mana :' + (playerinfo[0].player_mana));
           print('health :' + (playerinfo[0].player_health));
           playerif = {
               mana:playerinfo[0].player_mana,
               health:playerinfo[0].player_health
           }
           return playerinfo
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
} 

async function MakeDeck() {
    try {
        const response = await fetch(`/deck`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ plyId: 1}) 
        });
        if (response.status == 200) {
           var  result= await response.json();
           print(result);
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getplayerdeck() {
    try {
        let playerid = 1;
        const response = await fetch(`/get_deck/${playerid}`);
        if (response.status == 200) {
           var playerdeck= await response.json();
           print(playerdeck);
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
} 