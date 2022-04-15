//const { text } = require("body-parser");

  var i = 0;
  var battleRound;
  var playerinfo;
  var playerdeck;
  var cur_round;
  let canvasx
  let canvasy
  let chessbuttons = {}
  let playerif = {mana: 0 , mana_total:0, health:20}
  
 

function setup() {
    canvasx = windowWidth -25
    canvasy = windowHeight -25
   let canvas = createCanvas(canvasx  , canvasy);
    canvas.parent('game');
    gamestart();
    background(233, 225, 206);
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
     draw_hud();
     //rect(100,100,100,100);
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
    //let roundinfo = cur_round + ' - ' + 'p1 attacking'
    // round number
    rect(canvasx*0.3 ,canvasy*0.05,canvasx*0.4,canvasy*0.07)
    textSize(45)
    fill(0, 0, 0)
    text(cur_round,(canvasx/2)-(textWidth(cur_round)/2) ,canvasy*0.07 + (canvasy*0.07/2))

    // player information 
    fill(255,255,255)
    rect((canvasx*0.8) ,(canvasy*0.79),(canvasx*0.18),(canvasy*0.18))
    textSize(30)
    fill(0, 153, 15)
    text('HEALTH : ' + playerif.health + ' /20',(canvasx*0.8) +10 ,(canvasy*0.79) +50)
    fill(0, 175, 235)
    text('MANA : ' + playerif.mana + '/' + playerif.mana_total,(canvasx*0.8) +10 ,(canvasy*0.79) +100)
    fill(228, 164, 7)
    text('ENERGY : ' + playerif.mana +' /3',(canvasx*0.8) +10 ,(canvasy*0.79) +150)

    //text(playerinfo[0].player_mana,(canvasx*0.8) +10 ,(canvasy*0.8) +30) 
    
    //buttons
    fill(255, 255, 255)
    circle(canvasx*0.2,canvasy*0.8,canvasx*0.08)
    circle(canvasx*0.08,canvasy*0.7,canvasx*0.08)
    fill(0, 0, 0)
    text('Get'+'\n'+'  a'+'\n'+'Card',canvasx*0.2-((canvasx*0.08)/4),canvasy*0.8)
    text('Basic'+'\n'+'Attack',canvasx*0.08-((canvasx*0.08)/4),canvasy*0.7)
    fill(255, 255, 255)

}


function CheckClick(x,y,x1,y1,w1,h1){
    if((x >= x1) && (x <=  x1 + w1)){
        if((y >= y1) && (y <= y1 + h1)){
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
        let playerid = 1;
        const response = await fetch(`/round_num/${playerid}`);
        if (response.status == 200) {
           var battleRound= await response.json();
           print('Round :' + (battleRound[0].room_round_number));
           print('State :' + (battleRound[0].state_name));
           cur_round = 'Round ' + (battleRound[0].room_round_number) + ' - '  + (battleRound[0].state_name); // Round [nº]
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
               mana_total:playerinfo[0].player_total_mana,
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