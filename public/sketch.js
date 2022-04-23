//const { text } = require("body-parser");

var player_id = 1   
var playerdk = {}
let playerif = {mana: 0 , mana_total:0, health:20, energy:3 , num : 1}
var playerinfo;
let playersposition 
let selected_tile_id = 100 
let player_tile = 2
let enemy_tile = 2
let users_num = 1

var CardSelect_index

var i = 1;

var battleRound;

var playerdeck;
var cur_round = '[Waiting for information ...]';

let chessbuttons = {}

let scalen  


let canvasx
let canvasy
var BackgroundColor = [224, 221, 214];
console.log(BackgroundColor)
var grid

var clickingboard = false 
var clickingcards = false

//States
var GameState = 1
var BasicState = 0
var MyRoundState = 1
    var MovingState = 1.1
    var PlayingCardState = 1.2
var EnemyState = 2

//////////////////////////////////////SETUP///////////////////////////////////////////
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

    //Updates the database ( with the state we want)
    SetInicialState()

    //Get information from database 
    InicialInformation();

    //creates the squares for the board
    create_all_rect()

}

function SetInicialState() {
    ChangePlayerInfo(1,18,4,3,3) //(id,health,total_mana,mana,energy)
    ChangePlayerPosition(1,59) // (id,position)
    ChangeCardState(1,1,1)  // (id,card,newstate)
    ChangeCardState(1,3,1)  // (id,card,newstate)

    ChangePlayerInfo(2,20,3,3,3) //(id,health,total_mana,mana,energy)
    ChangePlayerPosition(2,40) // (id,position)
    ChangeCardState(2,2,1)  // (id,card,newstate)
    ChangeCardState(2,20,1)  // (id,card,newstate)
}

function InicialInformation() {
    getBattleRound() //Gets the round number and state as a nice string
    getplayerinformation() // gets all the information from one player , 
    getplayerdeck() // gets the deck from one player 
    getplayersposition() // gets position from both players 
}

function create_all_rect(){ 
    let YOffSet = 400 
    let XOffSet = ((9*60)/2)+60 // number of columns * width / half of the whole square 
    if(i < 82){
        for (var r = 1 ; r < 10 ; r= r + 1){
            for (var c = 1 ; c < 10 ; c = c + 1){

                chessbuttons[i] ={
                    x:(canvasx/2) - XOffSet + (c*60),
                    y:(canvasy/2) - YOffSet + (r*60),
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

///////////////////////////////////DRAW//////////////////////////////////////////
function DrawGrid(){
    if(grid == true){
        for(r = 0.0 ; r < 1 ; r += 0.1){
            line(0, canvasy*r , canvasx , canvasy*r)
        }
        for(c = 0.0 ; c < 1 ; c += 0.1){
            line(canvasx*c, 0 , canvasx*c , canvasy)
        }
    }
}

function draw() {
    //Define color of backround
    background(BackgroundColor);
    //scales the drawin//
    fill(0,0,0)
    textSize(25)
    text(mouseX,10,50)
    text(mouseY,10,100)
    text('Board: ' + clickingboard,10,150)
    text('Cards: ' + clickingcards,10,200)
    

    scale(scalen)

    //Always
        DrawGrid();
        //drawing the board
        draw_all_rect(); 

        ///drawing the hud
        draw_hud();

        /// draw ur cards
        DrawAllCards();
        

        if(GameState == BasicState){

            BackgroundColor = [224, 221, 214]    // grey    

        }else if(GameState == MyRoundState){
            BackgroundColor = [233, 225, 206]; //beige

            //(selected_tile_id == player_tile) ? GameState = MovingState : null

        }else if(GameState == MovingState){
            BackgroundColor = [206, 219, 233] //blue
           // movement(selected_tile_id , player_tile , 1 , 4)

        
        }else if(GameState == PlayingCardState){
            BackgroundColor = [233, 206, 207] //red
            

        }else if(GameState == EnemyState){
            BackgroundColor = [179, 152, 86] //dark beige

        }else{

        }
///////////////////////////////////////////////////
    //Update function//
        updateME();
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
            fill(127, 101, 57)
            rect(chessbuttons[index].x , chessbuttons[index].y, chessbuttons[index].width, chessbuttons[index].height)
            fill(0,0,0)
            text(index, chessbuttons[index].x +30 , chessbuttons[index].y + 30 );
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

function DrawAllCards(){
    let MaxCardsOnHand = 2
    let SpaceBetweenCards = 40 
    let HandSpace = canvasx*0.7 - canvas*0.2
    let HandSpaceAvaliable = HandSpace -( SpaceBetweenCards *(MaxCardsOnHand-1))

    let width = 120
    let height = 170
    for(i= 0 ; i < (Object.keys(playerdk).length - 1) ; i++){
        if(playerdk[i].card_state_id == 1 ){
            fill(0,0,0)
            
            let NegativeX = canvasx*0.5  - (width*i) - (height/2) - (SpaceBetweenCards/2)
            playerdk[i].x = NegativeX
            playerdk[i].y = canvasy*0.8
            playerdk[i].width = 120
            playerdk[i].height = 170
            rect(playerdk[i].x,playerdk[i].y,width,height)
            

            let PositiveX = canvasx*0.5  + (width*i) + (height/2) + (SpaceBetweenCards/2)
            playerdk[i+1].x = PositiveX
            playerdk[i+1].y = canvasy*0.8
            playerdk[i+1].width = 120
            playerdk[i+1].height = 170
            rect(playerdk[i+1].x,playerdk[i+1].y,width,height)
            
            textSize(15)
            fill(255,255,255)
            text(playerdk[i].card_name,playerdk[i].x ,playerdk[i].y+(height/2) )
            text(playerdk[i+1].card_name,playerdk[i+1].x,playerdk[i+1].y +(height/2) )

        }
    }
}



///////////////////////////////////UPDATE///////////////////////////////////////////
function updateME(){
    //CheckClick(mouseX,mouseY,100,100,100,100);
    if(GameState == BasicState){



    }else if(GameState == MyRoundState){

        //(selected_tile_id == player_tile) ? GameState = MovingState : null

    }else if(GameState == MovingState){

        
        //movement(selected_tile_id , player_tile , 1 , 4)

    }else if(GameState == PlayingCardState){


    }else if(GameState == EnemyState){


    }else{



    }
    //CheckMousePosition()
}


//////////////////////////////////MOUSE///////////////////////////////////////////////////
function CheckClick(x,y,x1,y1,w1,h1){
    if((x >= x1 * scalen) && (x <=  (x1 + w1) * scalen)){
        if((y >= y1 * scalen) && (y <= (y1 + h1) * scalen)){
        return true  
        }
    } 
}

function mousePressed(){
   
    //Movement
    for (a=1 ; a <= 81; a++){
        if(CheckClick(mouseX,mouseY,chessbuttons[a].x,chessbuttons[a].y,chessbuttons[a].width,chessbuttons[a].height)){
            selected_tile_id = a 
            print('index ' + selected_tile_id) ;
            (selected_tile_id == player_tile)? GameState = MovingState : null ;
            clickingboard = true
            break
        }else{
            clickingboard = false
        }
    }
    
    movement(selected_tile_id , player_tile , 1 , 4) 
    
    // playing card 
    for(i = 0 ; i <  Object.keys(playerdk).length  ; i++){
        print('TIME')
        if(CheckClick(mouseX,mouseY,playerdk[i].x,playerdk[i].y,playerdk[i].width,playerdk[i].height)){
            CardSelect_index = i
            print('card select ' + CardSelect_index)  
            GameState = PlayingCardState
            clickingcards = true
            break
        }else{
            clickingcards = false
        }
    }
    
    //if not cliking on board or cards goes back to roundstate
    if (clickingcards == false && clickingboard == false){
        GameState = MyRoundState
    }
   
}  

function movement(selected , cur_place , range , type){
    if(type == 4 && GameState == 1.1){
        if(selected<82 && selected>0 && playerif.energy>0 && selected != enemy_tile  ){
            for (range = range ; range > 0 ; range--){
                if (((chessbuttons[selected].letter == chessbuttons[cur_place].letter + range) || 
                (chessbuttons[selected].letter == chessbuttons[cur_place].letter - range)) &&
                (chessbuttons[selected].number == chessbuttons[cur_place].number) ){
                        player_tile = selected
                        playerif.energy -=1
                        break 
                }else if (((chessbuttons[selected].number == chessbuttons[cur_place].number + range) ||  
                (chessbuttons[selected].number == chessbuttons[cur_place].number - range)) &&
                (chessbuttons[selected].letter == chessbuttons[cur_place].letter) ){
                        player_tile = selected
                        playerif.energy -=1
                        break
                }
            }
        };

        if(player_tile != selected){
            GameState = 1
            ChangePlayerPosition(player_id,player_tile)
            ChangePlayerInfo(player_id,
                playerif.health,
                playerif.mana_total,
                playerif.mana,
                playerif.energy)
        };
    } 
} 


function keyPressed() {
    print('0')
    if (keyCode === LEFT_ARROW ) {
        (grid == true)? grid = false : grid = true ;
    }
}


////////////////////////////////ENDPOINTS/////////////////////////////////////////////
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
           playerif = {
               mana:playerinfo[0].player_mana,
               mana_total:playerinfo[0].player_total_mana,
               health:playerinfo[0].player_health,
               energy:playerinfo[0].player_energy,
               num:playerinfo[0].player_num

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
            body: JSON.stringify({ plyId: player_id}) 
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
           var playerdeck = await response.json();
           //print(playerdeck);
           //print(playerdeck.length)
           for(i = 0; i < playerdeck.length; i++){
                playerdk[i] = {
                    card_id: playerdeck[i].deck_card_id,
                    card_name : playerdeck[i].card_name,
                    card_state_id: playerdeck[i].deck_card_state_id
                    
                }
           }
           print(playerdk)
           //print('num of cards per deck' + Object.keys(playerdk).length)
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

async function ChangeCardState(id,card,newstate) {
    try {
        
        const response = await fetch('/deck_card_state_change',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ply_id: id, card_id:card, card_state_id:newstate}) 
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