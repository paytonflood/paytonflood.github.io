document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.5 + 'px';
    });

    // Game logic
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');
    const gameoverText = document.getElementById('gameoverText');
    restartButton.style.display = 'none';
    gameoverText.style.display = 'none';

    const shipWidth = 70;
    const shipHeight = 70;
    const shipX = canvas.width / 2 - shipWidth / 2;
    let shipY = canvas.height - shipHeight - 10;

    const ship = {
        x: shipX,
        y: shipY,
        width: shipWidth,
        height: shipHeight,
        speed: 5,
        dx: 0
    };

    const keys = {
        left: false,
        right: false,
        space: false
    };

    const bullets = [];
    const enemies = [];
    const bulletWidth = 5;
    const bulletHeight = 10;
    const enemyWidth = 40;
    const enemyHeight = 40;
    let enemySpeed = 5;
    let enemyDirection = 1;
    let gameOver = false;

    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft') keys.left = true;
        if (e.code === 'ArrowRight') keys.right = true;
        if (e.code === 'Space') keys.space = true;
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowLeft') keys.left = false;
        if (e.code === 'ArrowRight') keys.right = false;
        if (e.code === 'Space') keys.space = false;
    });

    moveRight = document.getElementById('right');
    moveLeft = document.getElementById('left');
    shoot = document.getElementById('shoot');

    moveRight.addEventListener('mousedown', () => {
        keys.right = true;
    });
    moveRight.addEventListener('mouseup', () => {
        keys.right = false;
    });
    moveLeft.addEventListener('mousedown', () => {
        keys.left = true;
    });
    moveLeft.addEventListener('mouseup', () => {
        keys.left = false;
    });
    shoot.addEventListener('click', () => {
        createBullet(ship.x + ship.width / 2 - bulletWidth / 2, ship.y);
    });
    //for mobile
    moveRight.addEventListener('touchstart', () => {
        keys.right = true;
    });
    moveRight.addEventListener('touchend', () => {
        keys.right = false;
    });
    moveLeft.addEventListener('touchstart', () => {
        keys.left = true;
    });
    moveLeft.addEventListener('touchend', () => {
        keys.left = false;
    });

    function createBullet(x, y) {
        bullets.push({ x, y, width: bulletWidth, height: bulletHeight });
    }

    function drawBullets() {
        context.fillStyle = 'yellow';
        bullets.forEach((bullet, index) => {
            context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            bullet.y -= 7;
            if (bullet.y < 0) bullets.splice(index, 1);
        });
    }

    function createEnemies() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                enemies.push({
                    x: i * (enemyWidth + 10) + 55,
                    y: j * (enemyHeight + 10) + 30,
                    width: enemyWidth,
                    height: enemyHeight
                });
            }
        }
    }

    function moveEnemies() {
        let shouldChangeDirection = false;

        enemies.forEach((enemy) => {
            enemy.x += enemySpeed * enemyDirection;

            if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
                shouldChangeDirection = true;
            }
        });

        if (shouldChangeDirection) {
            enemyDirection *= -1;
            enemies.forEach((enemy) => {
                enemy.y += enemyHeight; // Move down slightly when changing direction
            });
        }
    }

    function drawEnemies() {
        var enemy_img = new Image();
        enemy_img.src = 'images/enemy.png';
        enemies.forEach((enemy) => {
            context.drawImage(enemy_img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }

    function checkCollisions() {
        bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemy, enemyIndex) => {
                if (bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y) {
                    enemies.splice(enemyIndex, 1);
                    bullets.splice(bulletIndex, 1);
                }
            });
        });
        //collisions for ship and enemies
        enemies.forEach((enemy) => {
            if (ship.x < enemy.x + enemy.width &&
                ship.x + ship.width > enemy.x &&
                ship.y < enemy.y + enemy.height &&
                ship.y + ship.height > enemy.y) {
                gameOver = true;
            }
        });
    }

    function drawShip() {
        var ship_img = new Image();
        ship_img.src = 'images/usership.png';
        context.drawImage(ship_img, ship.x, ship.y, ship.width, ship.height);
    }

    function moveShip() {
        if (keys.left) {
            ship.x -= ship.speed;
            if (ship.x < 0) ship.x = 0;
        }
        if (keys.right) {
            ship.x += ship.speed;
            if (ship.x + ship.width > canvas.width) ship.x = canvas.width - ship.width;
        }
    }

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawGameOver() {
        gameoverText.style.display = 'block';
        gameoverText.style.position = 'absolute';
        gameoverText.style.padding = '10px 20px';
        gameoverText.style.fontSize = '48px';
        gameoverText.style.color = 'red';
        gameoverText.style.marginBottom = '100px';

        restartButton.style.position = 'absolute';
        restartButton.style.top = '50%';
        restartButton.style.left = '50%';
        restartButton.style.transform = 'translate(-50%, -50%)';
        restartButton.style.padding = '10px 20px';
        restartButton.style.fontSize = '16px';
        restartButton.style.backgroundColor = 'black';
        restartButton.style.color = 'red';
        restartButton.style.border = 'red 2px solid';
        restartButton.style.borderRadius = '5px';
        restartButton.style.cursor = 'pointer';
        restartButton.style.marginTop = '30px';

        restartButton.style.display = 'block';
        restartButton.addEventListener('click', restartGame);
    }

    function restartGame() {
        // Reset game variables
        gameOver = false;
        ship.x = shipX;
        ship.y = shipY;
        bullets.length = 0;
        enemies.length = 0;
        restartButton.style.display = 'none';
        gameoverText.style.display = 'none';
        createEnemies();
        update();
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            createBullet(ship.x + ship.width / 2 - bulletWidth / 2, ship.y);
        }
    });

    function update() {
        if (!gameOver) {
            moveShip();
            moveEnemies();
            checkCollisions();
            clear();
            drawShip();
            drawBullets();
            drawEnemies();
            requestAnimationFrame(update);
        } else {
            clear();
            drawShip();
            drawBullets();
            drawEnemies();
            drawGameOver();
        }
    }

    createEnemies();
    update();
});

