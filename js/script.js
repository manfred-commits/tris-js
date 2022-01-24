function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}   

// selects the tris output message
let resultText= document.getElementById("tris_result");

// selects the tris grid
let containerTris=document.querySelector('.container_tris');

// initializes the pointer
let player="O";
let ai="X";
// stores the clicked cells
let clickedCells=[];

let cellsScope=8;

let cells =[
    ["","",""],
    ["","",""],
    ["","",""]
];
let numeriCells=[
    ["","",""],
    ["","",""],
    ["","",""]
];

let win= null;

let aiTurn=true;

// event listener on mouseover, to add the temporary tris pointer
containerTris.addEventListener('mouseover',mouseOver);

function mouseOver(event){
    if(event.target.innerHTML!="O" && event.target.innerHTML!="X"){

        event.target.innerHTML=player;
        
    }        
           
}

// event listener on mouseleave, to remove the temporary tris pointer
containerTris.addEventListener("mouseout", mouseLeave);

function mouseLeave(event){
    if(event.target.innerHTML==player && !clickedCells.includes(parseInt(event.target.value))){
        event.target.innerHTML = " ";
    }
}

// event listener on click, to add permanently the tris pointer
containerTris.addEventListener('click', mouseClick
    
);
function mouseClick(event){
    if(!clickedCells.includes(parseInt(event.target.value))){

        
        for(let i=0;i<cells.length;i++){
            for(let j=0; j<cells[i].length;j++){
                if(cells[i][j]!=''){ 
                    document.querySelector("button[data-x='"+i+"'][data-y='"+j+"']").innerHTML=cells[i][j];
                    document.querySelector("button[data-x='"+i+"'][data-y='"+j+"']").classList.add("not-allowed");
                }
            }
        }
        event.target.innerHTML=player;
        event.target.classList.add("not-allowed");
        clickedCells.push(parseInt(event.target.value));
    
        cells[event.target.dataset.x][event.target.dataset.y]=event.target.innerHTML;

        checkWinner();
        aiTurn=true;
        console.log(aiTurn);
        console.log(numeriCells);

        blockingWinningAiMove();
        console.log(aiTurn);
        console.log(numeriCells);
        for(let i=0;i<cells.length;i++){
            for(let j=0; j<cells[i].length;j++){
                if(cells[i][j]!=''){ 
                    document.querySelector("button[data-x='"+i+"'][data-y='"+j+"']").innerHTML=cells[i][j];
                    document.querySelector("button[data-x='"+i+"'][data-y='"+j+"']").classList.add("not-allowed");
                }
            }
        }

        console.log(cells);

        // random ai turn
        // if(win==null){
        //     let randomX=0;
        //     do{
        //         randomX=parseInt(getRandomArbitrary(1, 9));
        //     }while(clickedCells.includes(randomX) && clickedCells.length<8);
        //     if(!clickedCells.includes(randomX)){
        //         document.querySelector("button[value='"+randomX+"']").innerHTML=ai;
        //         clickedCells.push(parseInt(randomX));
        
        //         cells[document.querySelector("button[value='"+randomX+"']").dataset.x][document.querySelector("button[value='"+randomX+"']").dataset.y]=ai;
        //         document.querySelector("button[value='"+randomX+"']").classList.add("not-allowed");
        //     }

        // }


    }
    
    checkWinner();
       
    
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}   
function checkWinner(){
    for(let i=0; i<cells.length;i++){
        // check if it won orizonatally
        if(cells[i][0]==cells[i][1] && cells[i][1]==cells[i][2] && (cells[i][0]=='O'||cells[i][0]=='X')){
            removeEventTris(cells,i);
            win=true;
            resultText.innerHTML="Vince "+cells[i][0];
        }
        // check if it won vertically
        if(cells[0][i]==cells[1][i] && cells[1][i]==cells[2][i] && (cells[0][i]=='O'||cells[0][i]=='X')){
            removeEventTris(cells,i);
            win=true;
            resultText.innerHTML="Vince "+cells[0][i];
        }
        // check if it won diagonally
        if((cells[0][0]!=''&& cells[0][0]==cells[1][1] && cells[1][1]==cells[2][2]) ){
        
            removeEventTris(cells,i);
            win=true;
            resultText.innerHTML="Vince "+cells[0][0];
        }
        if((cells[0][2]!=''&& cells[2][0]==cells[1][1] && cells[1][1]==cells[0][2]) ){
            
            removeEventTris(cells,i);
            win=true;
            resultText.innerHTML="Vince "+cells[0][2];
        }
        if(win==null && clickedCells.length>8){
            resultText.innerHTML="Pareggio";
            containerTris.removeEventListener("click",mouseClick);
            containerTris.removeEventListener("mouseout",mouseLeave);
            containerTris.removeEventListener("mouseover",mouseOver);
        }
        
    }
}

function removeEventTris(cells,index){
    containerTris.removeEventListener("click",mouseClick);
    containerTris.removeEventListener("mouseout",mouseLeave);
    containerTris.removeEventListener("mouseover",mouseOver);
        
}


function blockingWinningAiMove() {

    for(let i=0;i<cells.length;i++){
        for(let j=0; j<cells[i].length;j++){
            if(cells[i][j]=='X'){ 
                numeriCells[i][j]=3;
            }else if(cells[i][j]=='O'){
                numeriCells[i][j]=5;
            }else if(cells[i][j]==''){
                numeriCells[i][j]=1;
            }
        }
    }
    for(let i=0;i<cells.length;i++){
        for(let j=0; j<cells[i].length;j++){


        // blocking move
        // check orizonatally
        if(numeriCells[i][0]*numeriCells[i][1] *numeriCells[i][2]==25 && aiTurn){
           if(numeriCells[i][0]==1) {
                numeriCells[i][0]=3;
                aiTurn=false;
           }else if(numeriCells[i][1]==1){
                numeriCells[i][1]=3;
                aiTurn=false;

           }else if(numeriCells[i][2]==1){
                numeriCells[i][2]=3;
                aiTurn=false;

           }
        }
        // check vertically
        if(numeriCells[0][i]*numeriCells[1][i]*numeriCells[2][i]==25 && aiTurn){
            if(numeriCells[0][i]==1) {
                numeriCells[0][i]=3;
                aiTurn=false;

           }else if(numeriCells[1][i]==1){
                numeriCells[1][i]=3;
                aiTurn=false;

           }else if(numeriCells[2][i]==1){
                numeriCells[2][i]=3;
                aiTurn=false;

           }
        }
        // check diagonally
        if((numeriCells[0][0]*numeriCells[1][1]*numeriCells[2][2]==25 && aiTurn) ){
            if(numeriCells[0][0]==1) {
                numeriCells[0][0]=3;
                aiTurn=false;

           }else if(numeriCells[1][1]==1){
                numeriCells[1][1]=3;
                aiTurn=false;

           }else if(numeriCells[2][2]==1){
                numeriCells[2][2]=3;
                aiTurn=false;

           }
            
        }
        if((numeriCells[2][0]*numeriCells[1][1]*numeriCells[0][2]==25 && aiTurn) ){
            if(numeriCells[2][0]==1) {
                numeriCells[2][0]=3;
                aiTurn=false;

           }else if(numeriCells[1][1]==1){
                numeriCells[1][1]=3;
                aiTurn=false;

           }else if(numeriCells[2][2]==1){
                numeriCells[0][2]=3;
                aiTurn=false;

           }
            
        }

        //winning move

        // check orizonatally
        if(numeriCells[i][0]*numeriCells[i][1] *numeriCells[i][2]==9){
            
        }
        // check vertically
        if(numeriCells[0][i]*numeriCells[1][i]*cells[2][i]==9){
            
        }
        // checkdiagonally
        if((numeriCells[0][0]*numeriCells[1][1]*numeriCells[2][2]==9) ){
        
            
        }
        if((numeriCells[2][0]*numeriCells[1][1]*numeriCells[0][2]==9) ){
            
            
        }
        
    }
    for(let i=0;i<cells.length;i++){
        for(let j=0; j<cells[i].length;j++){
            if(numeriCells[i][j]==3){ 
                cells[i][j]='X';
            }else if(numeriCells[i][j]==5){
                cells[i][j]='O';
            }else if(numeriCells[i][j]==1){
                cells[i][j]='';
            }
        }
    }

    }
    console.log(numeriCells);
}