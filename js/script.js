// selects the tris grid
let containerTris=document.querySelector('.container_tris');

// initializes the pointer
let trisPointer="O";

// stores the clicked cells
let clickedCells=[];

// event listener on mouseover, to add the temporary tris pointer
containerTris.addEventListener('mouseover', 
    function(event){
        if(event.target.innerHTML!="O" && event.target.innerHTML!="X"){

            event.target.innerHTML=trisPointer;
            
        }        
               
    }
);

// event listener on mouseleave, to remove the temporary tris pointer
containerTris.addEventListener("mouseout", function(event){
    if(event.target.innerHTML==trisPointer && !clickedCells.includes(event.target.value)){
        event.target.innerHTML = " ";
    }
});

// event listener on click, to add permanently the tris pointer
containerTris.addEventListener('click', 
    function(event){
        console.log("c");
        if(event.target.innerHTML==trisPointer && !clickedCells.includes(event.target.value)){
            event.target.innerHTML=trisPointer;
            clickedCells.push(event.target.value);
            console.log(clickedCells);
            if(trisPointer=="O"){
                trisPointer="X";
            }else if(trisPointer=="X"){
                trisPointer="O";
            }
            console.log("ciao");
            click=false;
        }else if(event.target.innerHTML=="" && trisPointer=="X"){
            event.target.innerHTML=trisPointer;
            trisPointer="O";
            click=true;
        }else if(event.target.innerHTML=="" && trisPointer=="O"){
            event.target.innerHTML=trisPointer;
            trisPointer="X";
            click=true;
        }

    }
);