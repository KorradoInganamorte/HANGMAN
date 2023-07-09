import { WORDS } from "./consts"
import { KEYBOARD_LETTERS } from "./consts"

const gameDiv = document.querySelector("#game")
const logoH1 = document.querySelector("#logo")

let triesLeft
let winCount

function createPlaceholdersHTML() {
    const word = sessionStorage.getItem("word")

    const wordArray = Array.from(word)

    const placeHolderHTML = wordArray.reduce((acc, _, i) => acc + `<h1 id="letter_${i}" class="mx-2 text-2xl font-medium"> _ <h1/>`, "")
    return `<div id="placeholders" class="placeholders-wrapper flex flex-row">${placeHolderHTML}<div/>`
}

function createKeyboard() {
    const keyboardArray = Array.from(KEYBOARD_LETTERS)

    const keyboardHTMl = keyboardArray.reduce((acc, curr) => {
        return acc + `<button class="button-primary enabled:hover:bg-zinc-300 w-10 h-6 sm:w-12 sm:h-8 rounded-md sm:rounded-lg bg-zinc-200 border-black dark:bg-yellow-500 enabled:dark:hover:bg-yellow-600 disabled:opacity-20" id="${curr}">${curr}</button>`
    }, "")
    return `<div id="keyboard" class="max-w-2xl mt-8 gap-2 sm:gap-4 px-1 sm:px-2 flex justify-center flex-wrap dark:white">${keyboardHTMl}<div/>`
}

function createHungmanImg() {
    const image = document.createElement("img")
    image.classList.add("hangman-img")
    image.id = "hangman-img"
    image.src = "images/hg-0.png"
    image.alt = "hangman image"

    return image
    // return `<img id="hangman-img" class="w-32 h-32 sm:w-60 sm:h-60" src="images/hg-5.png" alt="hangman imgage">`
    // const hangmanImg = document.querySelector(#hangman-img)
}

function checkLetter(letter) {
    const word = sessionStorage.getItem("word")
    const inputLetter = letter.toLowerCase()

    if(!word.includes(inputLetter)) {
        const triesCounter = document.querySelector("#tries-left")
        triesLeft -=1
        triesCounter.innerText = triesLeft

        const hangmanImg = document.querySelector("#hangman-img")
        hangmanImg.src = `images/hg-${10-triesLeft}.png`

        if(triesLeft === 0) {
            stopGame("lose")
        }
    } else {
        const wordArray = Array.from(word)
        wordArray.forEach((currentLetter, i) => {
            if (currentLetter === inputLetter) {
                winCount +=1
                if(winCount === word.length) {
                    stopGame("win")
                    return
                }
                document.querySelector(`#letter_${i}`).innerText = inputLetter.toUpperCase() 
            }
        })
    }
}

const stopGame = (status) => {
    document.querySelector("#placeholders").remove()
    document.querySelector("#tries").remove()
    document.querySelector("#keyboard").remove()
    document.querySelector("#quit").remove()

    const word = sessionStorage.getItem("word")

    if(status === "win") {
        document.querySelector("#hangman-img").src ="images/hg-win.png"
        document.querySelector("#game").innerHTML += `<h2 class="result-header win">You won</h2>`
    } else if (status === "lose") {
        document.querySelector("#game").innerHTML += `<h2 class="result-header lose">You lost</h2>`
    } else if (status === "quit") {
        logoH1.classList.remove("logo-sm")
        document.querySelector("#hangman-img").remove()
    }

    document.querySelector("#game").innerHTML += `<p>The word was: <span class="result-word">${word}</span></p><button id="play-again" class="button-primary bg-slate-300 hover:bg-emerald-400 rounded-md font-medium px-10 py-2 dark:bg-yellow-500 dark:hover:bg-yellow-600 mt-5">Play again</button>`
    document.querySelector("#play-again").onclick = startGame
}

export const startGame = () => {
    triesLeft = 10
    winCount = 0

    logoH1.classList.add("logo-sm")
    const randomindex = Math.floor(Math.random() * WORDS.length)

    const wordToGuess = WORDS[randomindex]
    sessionStorage.setItem("word", wordToGuess)

    gameDiv.innerHTML = createPlaceholdersHTML()

    gameDiv.innerHTML += "<p id='tries' class='mt-2'>TRIES LEFT: <span id='tries-left' class='font-medium text-red-600 dark:text-yellow-500'>10<span/><p/>"

    gameDiv.innerHTML += createKeyboard()

    const hangmanImg = createHungmanImg()
    gameDiv.prepend(hangmanImg)

    const keyboard = document.querySelector("#keyboard")
    keyboard.addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON") {
            event.target.disabled = true
            checkLetter(event.target.id)
        }
    })

    gameDiv.insertAdjacentHTML("beforeend", '<button id="quit" class="button-secondary px-6 py-1 mt-4">Quit</button>')
    document.querySelector("#quit").onclick = () => {
        const isSure = confirm("Are you sure you want to quit and loseprogress?")
        if(isSure) {
            stopGame("quit")
        }
    }
}