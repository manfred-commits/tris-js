function randomNumber(num1, num2){
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);;
}

// selects the tris output message
let resultText= document.getElementById("tris_result");

// selects the tris grid
let containerTris=document.querySelector('.container_tris');

// initializes the pointer
let trisPointer="O";

// stores the clicked cells
let clickedCells=[];

let cellsScope=8;

let cells =[
    ["","",""],
    ["","",""],
    ["","",""]
];

// for(let i=0;i<cells.length;i++){
//     for(let j=0;i<cells[i].length;j++){
        
//     }
// }


let win= null;

// event listener on mouseover, to add the temporary tris pointer
containerTris.addEventListener('mouseover',mouseOver);

function mouseOver(event){
    if(event.target.innerHTML!="O" && event.target.innerHTML!="X"){

        event.target.innerHTML=trisPointer;
        
    }        
           
}

// event listener on mouseleave, to remove the temporary tris pointer
containerTris.addEventListener("mouseout", mouseLeave);

function mouseLeave(event){
    if(event.target.innerHTML==trisPointer && !clickedCells.includes(parseInt(event.target.value))){
        event.target.innerHTML = " ";
    }
}

// event listener on click, to add permanently the tris pointer
containerTris.addEventListener('click', mouseClick
    
);
function mouseClick(event){
    if(event.target.innerHTML==trisPointer && !clickedCells.includes(parseInt(event.target.value))){
        
        event.target.innerHTML=trisPointer;
        console.log(event.target)
        event.target.classList.add("not-allowed");
        clickedCells.push(parseInt(event.target.value));

        cells[event.target.dataset.x][event.target.dataset.y]=event.target.innerHTML;

        if(trisPointer=="O"){

            trisPointer="X";

        }else if(trisPointer=="X"){

            trisPointer="O";
        }
    }else if(event.target.innerHTML=="" && trisPointer=="X"){

        event.target.innerHTML=trisPointer;
        trisPointer="O";

    }else if(event.target.innerHTML=="" && trisPointer=="O"){

        event.target.innerHTML=trisPointer;
        trisPointer="X";
    }
    
    for(let i=0; i<cells.length;i++){
        // check if it won orizonatally
        if(cells[i][0]==cells[i][1] && cells[i][1]==cells[i][2] && (cells[i][0]=='O'||cells[i][0]=='X')){
            removeEventTris(cells,i);
            win=true;
        }
        // check if it won vertically
        if(cells[0][i]==cells[1][i] && cells[1][i]==cells[2][i] && (cells[0][i]=='O'||cells[0][i]=='X')){
            removeEventTris(cells,i);
            win=true;
        }
        // check if it won diagonally
        if((cells[0][0]!=''&& cells[0][0]==cells[1][1] && cells[1][1]==cells[2][2]) ){
        
            removeEventTris(cells,i);
            win=true;
        }
        if((cells[0][2]!=''&& cells[2][0]==cells[1][1] && cells[1][1]==cells[0][2]) ){
            
            removeEventTris(cells,i);
            win=true;
        }
        if(win==null && clickedCells.length>8){
            resultText.innerHTML="Pareggio";
            containerTris.removeEventListener("click",mouseClick);
            containerTris.removeEventListener("mouseout",mouseLeave);
            containerTris.removeEventListener("mouseover",mouseOver);
        }
        
    }
    
    function removeEventTris(cells,index){
        containerTris.removeEventListener("click",mouseClick);
        containerTris.removeEventListener("mouseout",mouseLeave);
        containerTris.removeEventListener("mouseover",mouseOver);
        if(trisPointer=='X'){
            resultText.innerHTML="Vince O";
        }else{
            resultText.innerHTML="Vince X";
        }
            
    }
    
    
    
    
}
