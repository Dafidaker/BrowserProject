//const { text } = require("body-parser");

//const { text } = require("body-parser");

  var i = 1;
  var battleRound;
  var playerinfo;
  var playerdeck;
  var cur_round = 'aaaa';
  let canvasx
  let canvasy
  let chessbuttons = {}
  let playerif = {mana: 0 , mana_total:0, health:20, energy:3}
  let scalen  
  let selected_tile_id = 100 
  
let playersposition 
let player_tile = 2
let enemy_tile = 2
let users_num = 1
let moving = false 

//States
var GameState = 1
var BasicState = 0
var MyRoundState = 1
    var MovingState = 1.1
    var PlayingCardState = 1.2
var EnemyState = 2

function setup() {
    //Create canvas
    canvasx = windowWidth 
    canvasy = windowHeight 
    var biggerside = Math.max(canvasx,canvasy)
    print('biggerside:'  + biggerside)
    if (biggerside = canvasx ){
        ((biggerside /2)> canvasy) ? canvasy = canvasy : canvasy = biggerside /2
    }else {
        ((biggerside /2)> canvasx) ? canvasx = canvasx : canvasx = biggerside /2
    }
    scalen = (biggerside/1920)
    let canvas = createCanvas(canvasx -25  , canvasy -25);
    canvas.parent('game');

    //Get information from database 
    gamestart();

    //creates the squares for the board
    create_all_rect()

    //Define color of backround
    background(233, 225, 206);
  }

  function gamestart() {
    getBattleRound() //Gets the round number and state as a nice string
    getplayerinformation() // gets all the information from one player , 
    getplayerdeck() // gets the deck from one player 
    getplayersposition() // gets position from both players 
    }

  function updateME(){
    //CheckClick(mouseX,mouseY,100,100,100,100);
    if(GameState == BasicState){



    }else if(GameState == MyRoundState){

        (selected_tile_id == player_tile) ? GameState = MovingState : null

    }else if(GameState == MovingState){

        
        //movement(selected_tile_id , player_tile , 1 , 4)

    }else if(GameState == PlayingCardState){


    }else if(GameState == EnemyState){


    }else{



    }
    //CheckMousePosition()
  }

  function draw() {
    //scales the drawin//
    scale(scalen)

    //Always
        //drawing the board
        //create_all_rect() ;
        draw_all_rect(); 

        ///drawing the hud
        draw_hud();

        if(GameState == BasicState){



        }else if(GameState == MyRoundState){

            (selected_tile_id == player_tile) ? GameState = MovingState : null

        }else if(GameState == MovingState){
            
            movement(selected_tile_id , player_tile , 1 , 4)

        }else if(GameState == PlayingCardState){


        }else if(GameState == EnemyState){


        }else{

        }
///////////////////////////////////////////////////
    //Update function//
        updateME();
  } 
  
  

function create_all_rect(){ 
    let position = 350  
    let x_reposition = ((9*60)/2)+60 // number of columns * width / half of the whole square 
    if(i < 82){
        for (var r = 1 ; r < 10 ; r= r + 1){
            for (var c = 1 ; c < 10 ; c = c + 1){

                chessbuttons[i] ={
                    x:(canvasx/2) - x_reposition + (c*60),
                    y:(canvasy/2) - position + (r*60),
                    width: 60,
                    height:60,
                    letter:r,
                    number:c+1
                }

                i = i + 1 ;

            }
        }  
    }
} 

function draw_all_rect(){ 
    let chessbuttons_length = Object.keys(chessbuttons).length
    for(let index = 1; index < chessbuttons_length +1 ; index++){
    textSize(15)
        if (index % 2 == 0){
            fill(0,0,0)
            rect(chessbuttons[index].x , chessbuttons[index].y, chessbuttons[index].width, chessbuttons[index].height)
            fill(127, 101, 57)
            text(index, chessbuttons[index].x +30 , chessbuttons[index].y + 30 ); 

        } else {
            fill(0,0,0)
            text(index, chessbuttons[index].x +30 , chessbuttons[index].y + 30 );
            fill(127, 101, 57)
            rect(chessbuttons[index].x , chessbuttons[index].y, chessbuttons[index].width, chessbuttons[index].height)
    
        }
    }         
} 

function draw_hud(){ 
    //Drawing the round num and round state
    fill(255, 255, 255)
    rect(canvasx * 0.3 ,canvasy * 0.05,canvasx * 0.4,canvasy * 0.07)
    textSize(45)
    fill(0, 0, 0)
    text(cur_round,(canvasx/2)-(textWidth(cur_round)/2) ,canvasy * 0.07 + (canvasy * 0.07/2))

    // player information 
    fill(255,255,255)
    rect((canvasx * 0.8) ,(canvasy * 0.79),(canvasx * 0.18),(canvasy * 0.18))
    textSize(30)
    fill(0, 153, 15)
    text('HEALTH : ' + playerif.health + ' /20',(canvasx * 0.8) +10 ,(canvasy * 0.84) )
    fill(0, 175, 235)
    text('MANA : ' + playerif.mana + '/' + playerif.mana_total,(canvasx * 0.8) +10 ,(canvasy * 0.89) )
    fill(228, 164, 7)
    text('ENERGY : ' + playerif.energy +' /3',(canvasx * 0.8) +10 ,(canvasy * 0.94) )
    
    //buttons(Basic attack)(Get a card)
    fill(255, 255, 255)
    circle(canvasx *0.2,canvasy*0.8,canvasx*0.08)
    circle(canvasx*0.08,canvasy*0.7,canvasx*0.08)
    fill(0, 0, 0)
    //text('Get'+'\n'+'  a'+'\n'+'Card',canvasx*0.2-((canvasx*0.08)/4),canvasy*0.8)
    text('Basic'+'\n'+'Attack',canvasx*0.08-((canvasx*0.08)/4),canvasy*0.7)
    fill(255, 255, 255)

    //player token
    fill(239, 87, 87)
    if(GameState == MovingState){fill(200, 20, 20)}
    circle(chessbuttons[player_tile].x + 30 ,chessbuttons[player_tile].y + 30,60)
    
    //enemy token 
    fill(87, 135, 239)
    circle(chessbuttons[enemy_tile].x + 30 ,chessbuttons[enemy_tile].y + 30,60)

    //GameState
    fill(0,0,0)
    textSize(30)
    text(GameState,canvasx*0.8,canvasy*0.5)
}


function CheckClick(x,y,x1,y1,w1,h1){
    if((x >= x1 * scalen) && (x <=  (x1 + w1) * scalen)){
        if((y >= y1 * scalen) && (y <= (y1 + h1) * scalen)){
        return true  
        }
    } 
}

  function mousePressed(){
    //print(chessbuttons)
    //ChangePlayerInfo(1,2,2,2,2)
    //print('player tile: '+ player_tile)
    //print('selected tile: '+ selected_tile_id)
    movement(selected_tile_id , player_tile , 1 , 4)
    for (a=1 ; a <= 81; a++){
        if(CheckClick(mouseX,mouseY,chessbuttons[a].x,chessbuttons[a].y,chessbuttons[a].width,chessbuttons[a].height)){
            selected_tile_id = a 
            print('index ' + selected_tile_id)  
            break
        }
    } 
    
}  

function movement(selected , cur_place , range , type){
    if(type = 4){
        //print('movement called')
        /* print(chessbuttons[selected].letter)
        print(chessbuttons[cur_place].letter)  */
        if(selected<82 && selected>0 && GameState == 1.1){
            for (range = range +1; range > 0 ; range--){
                /* print('selected: ' + chessbuttons[selected].letter + 
                '\n' + 'above : ' + (chessbuttons[cur_place].letter + range) + 
                '\n' + 'below : ' + (chessbuttons[cur_place].letter - range) + 
                '\n' + 'right: ' + (chessbuttons[cur_place].number + range) + 
                '\n' + 'left: ' + (chessbuttons[cur_place].number - range) + '\n'   ) */
                print('being called')
                if (((chessbuttons[selected].letter == chessbuttons[cur_place].letter + range) || 
                (chessbuttons[selected].letter == chessbuttons[cur_place].letter - range)) &&
                (chessbuttons[selected].number == chessbuttons[cur_place].number) ){
                        player_tile = selected
                        break 
                }else if (((chessbuttons[selected].number == chessbuttons[cur_place].number + range) ||  
                (chessbuttons[selected].number == chessbuttons[cur_place].number - range)) &&
                (chessbuttons[selected].letter == chessbuttons[cur_place].letter) ){
                        player_tile = selected
                        break
                }else {
                    GameState = MyRoundState
                    //print('isnt moving') 
                }
            }
        }else{}
    } 

} 


async function getBattleRound() {
    try {
        let playerid = 1;
        const response = await fetch(`/round_num/${playerid}`);
        if (response.status == 200) {
           var battleRound= await response.json();
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
               health:playerinfo[0].player_health,
               energy:playerinfo[0].player_energy

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

async function ChangePlayerInfo(id,health,total_mana,mana,energy) {
    try {
        
        const response = await fetch('/player_information_change',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ ply_id: id, ply_health: health, ply_total_mana: total_mana, ply_mana: mana,ply_energy: energy }) 
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

async function getplayersposition() {
    try {
        let playerid = 1;
        const response = await fetch(`/player_tile/${playerid}`);
        if (response.status == 200) {
           playersposition = await response.json();
           if (users_num = 1) {
            player_tile = playersposition[0].player_tile_id
            enemy_tile = playersposition[1].player_tile_id

           }else {
            player_tile = playersposition[1].player_tile_id
            enemy_tile = playersposition[0].player_tile_id
           }
           print('players position '+ playersposition[0].player_tile_id);
           print('players position '+ playersposition[1].player_tile_id);
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
} 

async function ChangePlayerPosition(id,position) {
    try {
        
        const response = await fetch('/player_location_change',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ply_id: id, player_tile: position}) 
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