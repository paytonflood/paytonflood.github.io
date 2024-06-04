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
    let enemySpeed = 3;
    let enemyDirection = 1;

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
        /* context.fillStyle = 'red';
        enemies.forEach((enemy) => {
            context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }); */
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

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            createBullet(ship.x + ship.width / 2 - bulletWidth / 2, ship.y);
        }
    });

    function update() {
        moveShip();
        moveEnemies();
        checkCollisions();
        clear();
        drawShip();
        drawBullets();
        drawEnemies();
        requestAnimationFrame(update);
    }

    createEnemies();
    update();
});
