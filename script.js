document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  const up=document.querySelector('.up-button')
  const down=document.querySelector('.down-button')
  const right=document.querySelector('.right-button')
  const left =document.querySelector('.left-button')
  const stop=document.querySelector('.stop-button')
  scoreDisplay.style.fontSize="40px"
  let squares = []
  let count=0
  const width = 4
  let score = 0
  left.addEventListener('click',()=> keyLeft())
  right.addEventListener('click',()=> keyRight())
  up.addEventListener('click',()=> keyUp())
  down.addEventListener('click',()=> keyDown())
  stop.addEventListener('click',()=> location.reload())
 

  //create the playing board
  function createBoard() {
    for (let i=0; i < width*width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()
  
  //generate a new number
  function generate() {
  
  if(count==15){
    count=0
    return;
  }
  randomNumber = Math.floor(Math.random() * squares.length)
  randomguide= Math.floor(Math.random() *6)
      
  if (squares[randomNumber].innerHTML == 0) {
    if(randomguide == 1){
      squares[randomNumber].innerHTML = 4
    }else{
      squares[randomNumber].innerHTML = 2
    }
      
      addColours()
    }
    else{
      count++
      generate()
    }
  }

  function moveRight() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }

  function moveLeft() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }


  function moveUp() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function moveDown() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function combineRow() {
    for (let i =1; i < 16; i++) {
      if(i%4==0){
        continue;
      }
      if (squares[i-1].innerHTML === squares[i].innerHTML) {
        let combinedTotal = parseInt(squares[i-1].innerHTML) + parseInt(squares[i].innerHTML)
        squares[i-1].innerHTML = combinedTotal
        squares[i].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    
    }
  // checkForGameOver_test()
    checkForWin()
    
  }

  function combineColumn() {
    for (let i =0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i +width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i +width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
      
    }

    //checkForGameOver_test()

    checkForWin()
   
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37 || e.keyCode === 100) {
      keyLeft()
    } else if (e.keyCode === 38 || e.keyCode === 104) {
      keyUp()
    } else if (e.keyCode === 39 || e.keyCode === 102) {
      keyRight()
    } else if (e.keyCode === 40 || e.keyCode === 98) {
      keyDown()
    }  
  }

  document.addEventListener('keyup', control)



  function keyRight() {
    for (let i =1; i <16; i++) {
      if (squares[i-1].innerHTML === squares[i].innerHTML && squares[i]!=0) {
        zeros=1
       break;
      }
    }
    moveRight()
    combineRow()
    moveRight()
    generate()
    checkForGameOver_test()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
    checkForGameOver_test()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
    checkForGameOver_test()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
    checkForGameOver_test()
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'You WIN'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  }
  //clear timer
  function clear() {
    clearInterval(myTimer)
  }
   function checkForGameOver_test(){
     let zeros=0
     for(let u=0;u<squares.length;u++){
       if(squares[u].innerHTML==0){
         zeros=1
         break;
       }
     }
       //rows
   for (let i =1; i <16; i++) {
    if(i%4==0){
      continue;
    }
    if (squares[i-1].innerHTML === squares[i].innerHTML) {
      zeros=1
     break;
    }
  }
     //columns
    for (let k =15; k >=4; k--) {
      if (squares[k].innerHTML === squares[k-4].innerHTML) {
     
      zeros=1
    break;
      }
   }
   
    
 for(let i=0;i<squares.length;i++){
   if (zeros == 0 && squares[i].innerHTML != 0) {
    resultDisplay.innerHTML = 'You LOSE'
    document.removeEventListener('keyup', control)
    setTimeout(() => clear(), 3000)
  }
  }

}

  //add colours
  function addColours() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#c4b7b7'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#f0d0a1' 
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#eb9042' 
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#fa8787' 
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#ff3030' 
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#cc0000' 
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#ffd952' 
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#b44de8' 
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff' 
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#e84d81' 
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#5048b5' 
    }
}


var myTimer = setInterval(addColours, 50)



})