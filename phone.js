var piece;
var image = "S";
var emptyX = "150px";
var emptyY = "150px";
var done = false;
var selections;
function isFinished() {
    "use strict";
    var i;
    for (i = 0; i < piece.length; i += 1) {
        if (piece[i].style.top !== parseInt(i / 4) * 50 +'px' || piece[i].style.left !== parseInt(i%4) * 50 + 'px'){
            return false;
        }
    }
    return true;
}
function endGame(){
    for (var i = 0; i < piece.length; i++){
        piece[i].innerHTML = "";
        piece[i].style.border = "2px solid black";
        piece[i].style.color = "#000000";
    }
    $("puzzlearea").innerHTML += '<div class = "puzzlepiece" id = "lastDiv"></div>'
    var lastDiv = $("lastDiv")
    lastDiv.style.top = "150px";
    lastDiv.style.left = "150px";
    lastDiv.style.backgroundImage = piece[0].style.backgroundImage;
    lastDiv.style.backgroundPosition = "-150px -150px";
    console.log($("puzzlearea"));
    done = true;
    //alert("DSA Puzzle Solved");
    $("puzzlearea").innerHTML = "<a href='phone.html'><img src='won.gif'></a>";
}
function swap(pos){
    var temp = piece[pos].style.top;
    piece[pos].style.top = emptyY;
    emptyY = temp;
    
    temp = piece[pos].style.left;
    piece[pos].style.left = emptyX;
    emptyX = temp;
    
}

function rightSpace(x , y , pos){
    if(x > 0){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) + 50 === x && parseInt(piece[i].style.top) === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function leftSpace(x , y , pos){
    if(x < 150){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) - 50 === x && parseInt(piece[i].style.top) === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function upSpace(x , y , pos){
    if(y < 150 ){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) === x && parseInt(piece[i].style.top) - 50 === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function downSpace(x , y , pos){
    if(y > 0 ){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) === x && parseInt(piece[i].style.top) + 50 === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function canMove(position){
    return rightSpace(parseInt(emptyX) , parseInt(emptyY) , position) || leftSpace(parseInt(emptyX) , parseInt(emptyY) , position) || upSpace(parseInt(emptyX) , parseInt(emptyY) , position) || downSpace(parseInt(emptyX) , parseInt(emptyY) , position);
}

window.onload = function () {
    $("controls").innerHTML += '<button class = "changePic">DSA Logo</button>';
    $("controls").innerHTML += '<button class = "changePic">Cat</button>';

    piece = $$("div#puzzlearea div");
    
    selections = $$(".changePic");
    console.log(selections.length);
    
    for (var i=0; i<piece.length; i++){
        piece[i].className = "puzzlepiece";
        piece[i].style.left = (i%4*50) + 'px';
        piece[i].style.top = (parseInt(i/4) * 50) + 'px';
        piece[i].style.backgroundPosition = '-' + piece[i].style.left + ' ' + '-' + piece[i].style.top;
        piece[i].onmouseover = function(){
            if(canMove(parseInt(this.innerHTML))){
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
     
        piece[i].onmouseout = function(){
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };
        
        piece[i].onclick = function(){
            if(canMove(parseInt(this.innerHTML))){
                swap(parseInt(this.innerHTML) - 1);
                if(isFinished()){
                    endGame();
                }
            }
        };
    
    }
   $("shufflebutton").onclick = function(){
        if(done){
            done = false;
            $("lastDiv").remove();
            piece = $$("div#puzzlearea div");
            console.log(piece.length);
            for(var i= 1; i <= 15; i++){
                piece[i-1].innerHTML = i;
                piece[i-1].onclick = function(){
                    if(canMove(parseInt(this.innerHTML))){
                        swap(parseInt(this.innerHTML) - 1);
                        if(isFinished()){
                            endGame();
                        }
                    }   
                };
                
                piece[i-1].onmouseover = function(){
                    if(canMove(parseInt(this.innerHTML))){
                        this.style.border = "2px solid red";
                        this.style.color = "#006600";
                    }
                };
     
                piece[i-1].onmouseout = function(){
                    this.style.border = "2px solid black";
                    this.style.color = "#000000";
                };
            }
           
           
        }
       
        for (var i=0; i<500; i++)
		{
			var rand = Math.floor(Math.random() * 15) + 1;
            if(canMove(parseInt(piece[rand - 1].innerHTML))){   
                swap(parseInt(piece[rand-1].innerHTML) - 1);
            }
        }
	};
    for(var i = 0; i < selections.length; i++){
        selections[i].onclick = function(){
            if(this.innerHTML === "DSA Logo"){
               for(var j = 0; j <piece.length; j++){
                    piece[j].style.backgroundImage = 'url("background.jpg")';
                   image = "S";
                }
            }
            else if(this.innerHTML === "Cat"){
                for(var j = 0; j <piece.length; j++){
                    piece[j].style.backgroundImage = 'url("background2.png")';
                    image = "G";
                }
            }
        }
    }
};
        
 
    