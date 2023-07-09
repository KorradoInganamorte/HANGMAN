import "../css/style.css"
import { switchDarkMode } from "./utils"
import { startGame } from "./game"

switchDarkMode()

const buttonStartGame = document.querySelector("#startGame")
buttonStartGame.addEventListener("click", () => startGame())