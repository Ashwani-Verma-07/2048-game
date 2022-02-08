document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay=document.querySelector('.grid')
    const scoreDisplay=document.getElementById('score') 
    const resultDisplay=document.getElementById('result')
const width=4
let squares=[]
let score=0


    //create a playing board
    function createBoard(){
        for(let i=0;i<width*width;i++){
            square=document.createElement('div')
            square.innerHTML=0;
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
createBoard()


///generate a number randomly
function generate(){
    randomNumber=Math.floor(Math.random()*squares.length)
    if(squares[randomNumber].innerHTML==0){
        if(squares[randomNumber]%2===0){
        squares[randomNumber].innerHTML=4
        }
        else{
            squares[randomNumber].innerHTML=2
        }
        
        checkforgameover()
    }
    else generate() 
}
//swipe right
function moveRight(){
    for(let i=0;i<16;i++){
        if(i%4===0){
            let totalOne=squares[i].innerHTML
            let totalTwo=squares[i+1].innerHTML
            let totalThree= squares[i+2].innerHTML
            let totalFour=squares[i+3].innerHTML
            let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
            let filterRow=row.filter(num=>num)
            let missing= 4 - filterRow.length
            let zeros=Array(missing).fill(0)
            let newRow=zeros.concat(filterRow);
            squares[i].innerHTML=newRow[0]
            squares[i+1].innerHTML=newRow[1]
            squares[i+2].innerHTML=newRow[2]
            squares[i+3].innerHTML=newRow[3]
        }
    }
}
//swipe left
function moveleft(){
    for(let i=0;i<16;i++){
        if(i%4===0){
            let totalOne=squares[i].innerHTML
            let totalTwo=squares[i+1].innerHTML
            let totalThree= squares[i+2].innerHTML
            let totalFour=squares[i+3].innerHTML
            let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
    
            let filterRow=row.filter(num=>num)
           
            let missing= 4 - filterRow.length
            let zeros=Array(missing).fill(0)
           
            let newRow=filterRow.concat(zeros);

            squares[i].innerHTML=newRow[0]
            squares[i+1].innerHTML=newRow[1]
            squares[i+2].innerHTML=newRow[2]
            squares[i+3].innerHTML=newRow[3]

        }

    }
}
//swipe up
function moveUp(){
    for(let i=0;i<4;i++){
        let totalOne=squares[i].innerHTML
        let totalTwo=squares[i+width].innerHTML
        let totalThree=squares[i+(width*2)].innerHTML
        let totalFour=squares[i+(width*3)].innerHTML
        let column =[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
        let filterColumn=column.filter(num=>num)
        let missing=4-filterColumn.length
        let zeros=Array(missing).fill(0)
        let newColumn=filterColumn.concat(zeros)

        squares[i].innerHTML=newColumn[0]
        squares[i+width].innerHTML=newColumn[1]
        squares[i+(width*2)].innerHTML=newColumn[2]
        squares[i+(width*3)].innerHTML=newColumn[3]

    }
}
//swipe down
function moveDown(){
    for(let i=0; i < 4; i++){
        let totalOne=squares[i].innerHTML
        let totalTwo=squares[i+width].innerHTML
        let totalThree=squares[i+(width*2)].innerHTML
        let totalFour=squares[i+(width*3)].innerHTML
        let column =[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
        let filterColumn=column.filter(num => num)
        let missing=4-filterColumn.length
        let zeros=Array(missing).fill(0)
        let newColumn=zeros.concat(filterColumn)
        squares[i].innerHTML=newColumn[0]
        squares[i+width].innerHTML=newColumn[1]
        squares[i+(width*2)].innerHTML=newColumn[2]
        squares[i+(width*3)].innerHTML=newColumn[3]
    }
}

function combineRow(){
    for(let i=0;i<15;i++){
        if(squares[i].innerHTML===squares[i+1].innerHTML){
            let combinedTotal=parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
            squares[i].innerHTML=combinedTotal
            squares[i+1].innerHTML=0
            score+=combinedTotal
            scoreDisplay.innerHTML=score
        }
    }
    checkforwin()
}
function combineColumn(){
    for(let i=0;i<12;i++){
        if(squares[i].innerHTML===squares[i+width].innerHTML){
            let combinedTotal=parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
            squares[i].innerHTML=combinedTotal
            squares[i+width].innerHTML=0
            score+=combinedTotal
            scoreDisplay.innerHTML=score
        }
    }
}
//assign keycodes
document.addEventListener('keyup',control)
function control(e) {
    if(e.keyCode === 37) {
      keyleft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }

function keyRight(){
    moveRight()
    combineRow()
    moveRight()
    generate()

}
function keyleft(){
    moveleft()
    combineRow()
    moveleft()
    generate()
}
function keyUp(){
    moveUp()
    combineColumn()
    moveUp()
    generate()
}
function keyDown(){
    moveDown()
    combineColumn()
    moveDown()
    generate()
}
//check for the number 2048 in squares to win
function checkforwin(){
    for(let i=0;i<squares.length;i++){
        if(squares[i].innerHTML==2048){
            resultDisplay.innerHTML='YOU WIN'
            document.removeEventListener('keyup',control)

        }
    }
}
//checkif there are no xeros on board to lloose
function checkforgameover(){
    let zeros=0
    for(let i=0;i<squares.length;i++){
        if(squares[i].innerHTML==0){
            zeros++
        }
    }
    if(zeros===0){
        resultDisplay.innerHTML='YOU LOSE!'
        document.removeEventListener('keyup',control)
    }
}
 
    
})