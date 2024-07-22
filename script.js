const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let player = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 30,
  height: 30,
  speed: 5,
  dx: 0
};

let bullets = [];
let enemies = [];

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    player.dx = player.speed;
  } else if (event.key === 'ArrowLeft') {
    player.dx = -player.speed;
  } else if (event.key === ' ') {
    shootBullet();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    player.dx = 0;
  }
});

function shootBullet() {
  const bullet = {
    x: player.x + player.width / 2,
    y: player.y,
    radius: 5,
    speed: 7
  };
  bullets.push(bullet);
}

function createEnemy() {
  const enemy = {
    x: Math.random() * (canvas.width - 30),
    y: 0,
    width: 30,
    height: 30,
    speed: 2
  };
  enemies.push(enemy);
}

function update() {
  player.x += player.dx;

  // Bullets update
  bullets.forEach((bullet, bulletIndex) => {
    bullet.y -= bullet.speed;
    if (bullet.y < 0) {
      bullets.splice(bulletIndex, 1);
    }

    // Check for collision with enemies
    enemies.forEach((enemy, enemyIndex) => {
      if (bullet.x > enemy.x && bullet.x < enemy.x + enemy.width &&
        bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
        // Remove bullet and enemy
        bullets.splice(bulletIndex, 1);
        enemies.splice(enemyIndex, 1);
      }
    });
  });

  // Enemies update
  enemies.forEach((enemy, index) => {
    enemy.y += enemy.speed;
    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
    }
  });

  if (Math.random() < 0.01) {
    createEnemy();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw bullets
  bullets.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  });

  // Draw enemies
  enemies.forEach(enemy => {
    ctx.fillStyle = 'green';
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
