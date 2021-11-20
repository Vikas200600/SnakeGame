let gameGrid = document.getElementById('gameGrid')
let cells = [];
let width = 20;
let direction = 1;
let snake = [2, 1, 0];
let score = 0;
let interval = 800;
let isPause = false;

let restartBtn = document.getElementById('restart-btn');
let stopBtn = document.getElementById('stop-btn');
let scoreDis = document.getElementById('score');
scoreDis.textContent = score;

(() => {
    for (let i = 0; i < width * width; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        gameGrid.appendChild(cell)
        cells.push(cell)
    }
})()

snake.forEach(index => cells[index].classList.add('snake'))

let generateApple = () => {
    let appleIndex;
    do {
        appleIndex = Math.floor(Math.random() * cells.length)
    } while (cells[appleIndex].classList.contains('snake'))
    cells[appleIndex].classList.add('apple')
}

let restart = () => {
    snake.forEach(index => cells[index].classList.remove('snake'))
    snake = [2, 1, 0];
    score = 0;
    interval = 800;
    direction = 1;
    snake.forEach(index => cells[index].classList.add('snake'))
    timer = setInterval(move, interval)
}

let move = () => {
    if (
        (snake[0] + width >= width * width && direction === width) ||
        (snake[0] % width === width - 1 && direction === 1) ||
        (snake[0] % width === 0 && direction === -1) ||
        (snake[0] - width < 0 && direction === -width) ||
        cells[snake[0] + direction].classList.contains('snake')
    ) {
        alert('Game Over');
        return clearInterval(timer)
    }
    let tail = snake.pop()
    cells[tail].classList.remove('snake')
    snake.unshift(snake[0] + direction)
    cells[snake[0]].classList.add('snake')

    if (cells[snake[0]].classList.contains('apple')) {
        score++;
        scoreDis.textContent = score;
        interval = interval > 200 ? interval - 200 : interval
        cells[snake[0]].classList.remove('apple')
        cells[tail].classList.add('snake')
        snake.push(tail)
        clearInterval(timer)
        timer = setInterval(move, interval)
        generateApple()
    }
}

restartBtn.addEventListener('click', () => {
    restart()
});

stopBtn.addEventListener('click', () => {
    if (!isPause) {
        clearInterval(timer)
        isPause = true
    } else {
        setInterval(move, interval)
        isPause = false
    }
})

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp': {
            direction = -width
            break
        }
        case 'ArrowLeft': {
            direction = -1
            break
        }
        case 'ArrowRight': {
            direction = 1
            break
        }
        case 'ArrowDown': {
            direction = +width
            break
        }
    }
})

generateApple()
let timer = setInterval(move, interval);