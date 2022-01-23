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


let win= null;

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

        event.target.innerHTML=player;
        event.target.classList.add("not-allowed");
        clickedCells.push(parseInt(event.target.value));
    
        cells[event.target.dataset.x][event.target.dataset.y]=event.target.innerHTML;

        checkWinner();

        if(win==null){
            let randomX=0;
            do{
                randomX=parseInt(getRandomArbitrary(1, 9));
            }while(clickedCells.includes(randomX) && clickedCells.length<8);
            if(!clickedCells.includes(randomX)){
                document.querySelector("button[value='"+randomX+"']").innerHTML=ai;
                clickedCells.push(parseInt(randomX));
        
                cells[document.querySelector("button[value='"+randomX+"']").dataset.x][document.querySelector("button[value='"+randomX+"']").dataset.y]=ai;
                document.querySelector("button[value='"+randomX+"']").classList.add("not-allowed");
            }

        }


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
