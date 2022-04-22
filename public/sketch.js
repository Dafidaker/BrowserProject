//const { text } = require("body-parser");

  var i = 0;
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


function setup() {
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
    //scalen = 1
    let canvas = createCanvas(canvasx -25  , canvasy -25);
    canvas.parent('game');
    gamestart();
    background(233, 225, 206);
  }

  function gamestart() {
    getBattleRound()
    getplayerinformation()
    getplayerdeck()
    getplayersposition()
    
    }

  function updateME(){
    //CheckClick(mouseX,mouseY,100,100,100,100);
    (selected_tile_id == player_tile) ? moving = true : null; 
    (moving == true) ?  movement(selected_tile_id , player_tile , 1 , 4) : null
    //CheckMousePosition()
  }

  function draw() {
    scale(scalen)
    create_all_rect() ;
    
     draw_all_rect(); 
     draw_hud();
     //rect(100,100,100,100);
     //print('update')
    /* text(mouseX,50,50)
    text(mouseY,50,70) */
    

     updateME();
  } 
  
  function CheckMousePosition(){
    /* for (a=1 ; a <= 81; a++){
        if(CheckClick(mouseX,mouseY,chessbuttons[a].x,chessbuttons[a].y,chessbuttons[a].width,chessbuttons[a].height)){
            selected_tile_id = a 
            print('index ' + selected_tile_id)  
            print('changed selected')
            break
        }
     }*/  
    CheckClick(mouseX,mouseY,chessbuttons[a].x,chessbuttons[a].y,chessbuttons[a].width,chessbuttons[a].height)
    if(mousePressed){
        selected_tile_id = a 
    }
  }

function create_all_rect(){ 
    let position = 350
    let x_reposition = (9*60)/2 // number of columns * width / half of the whole square 
    if(i < 81){
        for (var h = 1 ; h < 10 ; h= h + 1){
            for (var l = 0 ; l < 9 ; l = l + 1){
                //rect((canvasx/2) - x_reposition + (l*60) , (canvasy/2)-position + (h*60), 60, 60)
                chessbuttons[i+1] ={
                            x:(canvasx/2) - x_reposition + (l*60),
                            y:(canvasy/2) - position + (h*60),
                            width: 60,
                            height:60,
                            letter:h,
                            number:l+1
                 }
                i = i + 1 ;
                /*  //rect(chessbuttons[i].x , chessbuttons[i].y, chessbuttons[i].width, chessbuttons[i].height)
                //text(i, chessbuttons[i].x +30 , chessbuttons[i].y + 30 ); 
                     if (i > 81 ){
                    i=0;
                    noLoop();} */ 
            }
        }  
    }
    /*let position = 350
    let x_reposition = (9*60)/2 // number of columns * width / half of the whole square
    if (i < 81){
        for (x = 0; x < 9; x ++){
            for (y = 0; y < 9; y ++){
                chessbuttons[i+1] ={
                    x:(canvasx/2) - x_reposition + (l*60),
                    y:(canvasy/2) - position + (h*60),
                    width: 60,
                    height: 60,
                    letter: h,
                    number: l + 1
                }
                i = i + 1;
            }
        }
    }
    */
} 

function draw_all_rect(){ 
    let chessbuttons_length = Object.keys(chessbuttons).length
    for(let index = 1; index < chessbuttons_length +1 ; index++){
    fill(255,255,255)
    rect(chessbuttons[index].x , chessbuttons[index].y, chessbuttons[index].width, chessbuttons[index].height)
    var isOffset = (chessbuttons[index].x % 2 == 0 && chessbuttons[index].y % 2 != 0) || (chessbuttons[index].x % 2 != 0 && chessbuttons[index].y % 2 == 0)
    if (isOffset = true){
        fill(0,0,0)
    } else {
        fill(255, 255, 255)
    }
    textSize(15)
    text(index, chessbuttons[index].x +30 , chessbuttons[index].y + 30 ); 
    }         
} 

function draw_hud(){ 
    //let roundinfo = cur_round + ' - ' + 'p1 attacking'

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
    
    //buttons
    fill(255, 255, 255)
    circle(canvasx *0.2,canvasy*0.8,canvasx*0.08)
    circle(canvasx*0.08,canvasy*0.7,canvasx*0.08)
    fill(0, 0, 0)
    //text('Get'+'\n'+'  a'+'\n'+'Card',canvasx*0.2-((canvasx*0.08)/4),canvasy*0.8)
    text('Basic'+'\n'+'Attack',canvasx*0.08-((canvasx*0.08)/4),canvasy*0.7)
    fill(255, 255, 255)

    //player token
    fill(239, 87, 87)
    circle(chessbuttons[player_tile].x + 30 ,chessbuttons[player_tile].y + 30,60,60)
    
    //enemy token 
    fill(87, 135, 239)
    circle(chessbuttons[enemy_tile].x + 30 ,chessbuttons[enemy_tile].y + 30,60,60)
}


function CheckClick(x,y,x1,y1,w1,h1){
    if((x >= x1 * scalen) && (x <=  (x1 + w1) * scalen)){
        if((y >= y1 * scalen) && (y <= (y1 + h1) * scalen)){
        return true  
        }
    } 
}

  function mousePressed(){
    print(chessbuttons)
    print('player tile: '+ player_tile)
    print('selected tile: '+ selected_tile_id)
    ChangePlayerInfo(1,2,2,2,2)
    for (a=1 ; a <= 81; a++){
        if(CheckClick(mouseX,mouseY,chessbuttons[a].x,chessbuttons[a].y,chessbuttons[a].width,chessbuttons[a].height)){
            selected_tile_id = a 
            print('index ' + selected_tile_id)  
            print('changed selected')
            break
        }
    }
    
}  

function movement(selected , cur_place , range , type){
    
    if(type = 4){
        print('movement called')
        for (range = range +1 ; range > 0 ; range--){
            if (((chessbuttons[selected].letter == chessbuttons[cur_place].letter + range) || 
             (chessbuttons[selected].letter == chessbuttons[cur_place].letter - range)) &&
             (chessbuttons[selected].number == chessbuttons[cur_place].number) ){
                    player_tile = selected
                    break 
            }else if (((chessbuttons[selected].number == chessbuttons[cur_place].number + range) ||  
            (chessbuttons[selected].number == chessbuttons[cur_place].number - range)) &&
            (chessbuttons[selected].letter == chessbuttons[cur_place].letter) ){
                    player_tile = selected
            }else {
                moving = false
                print('isnt moving  ') 
            }
        }

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