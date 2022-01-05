//select all gamebox and loop through each of them//
const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_ARRAY =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const gameboxElements = document.querySelectorAll('[box-cell]')
const game = document.getElementById('game')
const messagepageElement = document.getElementById('message-page')
const messagepageTextElement = document.querySelector('[box-message-text]')
const restartBtn = document.getElementById('restartBtn')
let oTurn
startGame()

restartBtn.addEventListener('click', startGame)

//create a function to start game//

function startGame() {
    oTurn = false
    gameboxElements.forEach(gamebox => {
        gamebox.classList.remove(X_CLASS)
        gamebox.classList.remove(O_CLASS)
        gamebox.removeEventListener('click', handleClick)
        gamebox.addEventListener('click', handleClick, { once: true })
    })
    gameBoardHover()
    messagepageElement.classList.remove('show')

}

//create a function to select each box//

function handleClick(e) {
    const gamebox = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(gamebox, currentClass)
    if (checkWin(currentClass)) {
endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn()
    gameBoardHover()
    }
}

//create a function to show if the game is a draw//
function isDraw() {
    return [...gameboxElements].every(gamebox  => {
        return gamebox.classList.contains(X_CLASS) || 
        gamebox.classList.contains(O_CLASS)
    })
}

//create a function to show winning message//
function endGame(draw) {
if (draw) {
messagepageTextElement.innerText = 'Draw!!'
} else {
    messagepageTextElement.innerText = `${oTurn ? "O" : "X"} Wins!!`
}
messagepageElement.classList.add('show')
}

function placeMark(gamebox, currentClass) {
    gamebox.classList.add(currentClass)
} 

//create a function to switch turn//

function switchTurn() {
    oTurn = !oTurn
}

//Set the hover state after you switch turn//

function gameBoardHover() {
    game.classList.remove(O_CLASS)
    game.classList.remove(X_CLASS) 
    if (oTurn) {
        game.classList.add(O_CLASS)
    } else {
        game.classList.add(X_CLASS)
    }
}

// create a function to check win//

function checkWin(currentClass) {
    return WINNING_ARRAY.some(array => {
        return array.every(index => {
            return gameboxElements[index].classList.contains(currentClass)
        })
    })
}