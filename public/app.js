const gameContainer = document.getElementById("game");

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.appendChild(newDiv);
    }
}

let prevCard; clickedCard = 0; matches = 0; moves = 0;

//Game Logic 
function handleCardClick(event) {
    if (clickedCard >= 2) {
        return 0
    }
    const currElement = event.target
    if (currElement.id == 'open') {
        return 0
    }
    currElement.setAttribute('style', `background-color:${currElement.className};
    background-image:unset;
    transition:all .4s linear`)
    if (prevCard) {
        if (prevCard.className == currElement.className && currElement.id != 'open') {
            currElement.setAttribute('id', 'open')
            prevCard = undefined
            matches++
            clickedCard = 0
            moves++
            document.getElementById('your-score').innerText = moves
            if (matches == 5) {
                let score = document.getElementById('your-score').innerText
                let name = document.getElementById('name').innerText
                updateBestScore(score, name)
                setTimeout(() => {
                    for (let card of document.querySelectorAll('#game div')) {
                        card.remove()
                    }
                    let gameOver = document.createElement('h2')
                    gameOver.innerText = 'Game Over'
                    let gameDiv = document.getElementById('game')
                    gameDiv.setAttribute('style', 'margin-top:200px;')
                    gameDiv.appendChild(gameOver)
                    matches = 0;
                }, 1000)
            }
        } else {
            moves++
            document.getElementById('your-score').innerText = moves
            clickedCard++
            setTimeout(() => {
                currElement.setAttribute('style', `background-color:unset;transition:all .4s linear`)
                prevCard.setAttribute('style', `background-color:unset;transition:all .4s linear`)
                prevCard.setAttribute('id', 'unset')
                prevCard = undefined
                clickedCard = 0
            }, 1000)
        }
    } else {
        prevCard = currElement
        currElement.setAttribute('id', 'open')
        clickedCard++
        moves++
        document.getElementById('your-score').innerText = moves
    }
}

// Function to start game.
function startGame() {
    let name = document.getElementById('your-name').value
    if(isValidName(name)==false){
        return document.getElementById('name-error').innerText = 'Please Enter Valid Name'
    }
    document.getElementById('name').innerText = name
    document.getElementById('start-game-div').remove()
    createDivsForColors(shuffledColors)
    document.getElementById('restart').setAttribute('style', 'display:block')
    document.getElementById('game').setAttribute('class', 'game')
    document.getElementById('score-board').setAttribute('style', 'display:flex')
    document.getElementById('your-score').innerText = moves
    console.log(name)
    fetch(`./api/user/${name}`)
        .then(data => data.json())
        .then(data => {
            if (data.score == null) {
                document.getElementById('best-score').innerText = "Not Played Yet"
            }
            else {
                document.getElementById('best-score').innerText = data.score
            }
        })
}

// Funtion to restart game.
function restart() {
    for (let card of document.querySelectorAll('#game div')) {
        card.remove()
    }
    if (document.querySelectorAll('#game h2')[0]) {
        document.querySelectorAll('#game h2')[0].remove()
        document.getElementById('game').setAttribute('style', 'margin-top:unset;')
    }
    matches = 0
    let shuffledColors = shuffle(COLORS)
    createDivsForColors(shuffledColors)
    document.getElementById('restart-modal').setAttribute('style', 'display:none')
    moves = 0
    document.getElementById('your-score').innerText = moves
}

// Functions to open and close restart modal.
function openModal() {
    document.getElementById('restart-modal').setAttribute('style', 'display:block')
}
function closeModal() {
    document.getElementById('restart-modal').setAttribute('style', 'display:none')
}

// Update Best Score

function updateBestScore(score, name) {
    let bestScore = document.getElementById('best-score').innerText
    console.log('here', bestScore, score, name)

    if (bestScore > score || bestScore == 'Not Played Yet') {
        console.log('updating')
        document.getElementById('best-score').innerText = score
        fetch(`./api/update?name=${name}&score=${score}`).then(console.log)
    }
}

// Validate name
function isValidName(name) {
    let nameRegex = /^[a-zA-Z ]{2,30}$/
    return nameRegex.test(name)
}