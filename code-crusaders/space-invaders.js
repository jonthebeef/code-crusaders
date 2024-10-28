// File: public/space-invaders.js

(function(window) {
    const SpaceInvaders = {
      init: function(canvas) {
        if (!canvas) {
          return;
        }
  
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }
  
        const player = {
          x: canvas.width / 2 - 25,
          y: canvas.height - 30,
          width: 50,
          height: 20,
          speed: 5
        };
  
        let bullets = [];
        let enemies = [];
        let particles = [];
        let score = 0;
        let gameOver = false;
        let level = 1;
  
        function createEnemies() {
          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
              enemies.push({
                x: i * 80 + 80,
                y: j * 50 + 50,
                width: 40,
                height: 40,
                speed: 1,
                health: 2
              });
            }
          }
        }
  
        createEnemies();
  
        function createParticle(x, y) {
          return {
            x: x,
            y: y,
            radius: Math.random() * 3 + 1,
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            speed: {
              x: (Math.random() - 0.5) * 3,
              y: (Math.random() - 0.5) * 3
            },
            lifetime: 60
          };
        }
  
        function gameLoop() {
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          if (!gameOver) {
            ctx.fillStyle = 'white';
            ctx.fillRect(player.x, player.y, player.width, player.height);
  
            bullets.forEach((bullet, bulletIndex) => {
              bullet.y -= 10;
              ctx.fillStyle = 'yellow';
              ctx.fillRect(bullet.x, bullet.y, 3, 10);
  
              enemies.forEach((enemy, enemyIndex) => {
                if (
                  bullet.x < enemy.x + enemy.width &&
                  bullet.x + 3 > enemy.x &&
                  bullet.y < enemy.y + enemy.height &&
                  bullet.y + 10 > enemy.y
                ) {
                  enemy.health--;
                  if (enemy.health <= 0) {
                    for (let i = 0; i < 10; i++) {
                      particles.push(createParticle(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                    }
                    enemies.splice(enemyIndex, 1);
                    score += 10;
                  }
                  bullets.splice(bulletIndex, 1);
                }
              });
  
              if (bullet.y < 0) bullets.splice(bulletIndex, 1);
            });
  
            enemies.forEach(enemy => {
              enemy.x += enemy.speed;
              if (enemy.x + enemy.width > canvas.width || enemy.x < 0) {
                enemy.speed = -enemy.speed;
                enemy.y += 20;
              }
              ctx.fillStyle = 'red';
              ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            });
  
            particles.forEach((particle, index) => {
              particle.x += particle.speed.x;
              particle.y += particle.speed.y;
              particle.lifetime--;
  
              if (particle.lifetime <= 0) {
                particles.splice(index, 1);
              } else {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
              }
            });
  
            if (enemies.some(enemy => enemy.y + enemy.height > player.y)) {
              gameOver = true;
            }
  
            if (enemies.length === 0) {
              level++;
              createEnemies();
            }
          } else {
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
            ctx.fillText(`Score: ${score}`, canvas.width / 2 - 50, canvas.height / 2 + 40);
          }
  
          ctx.fillStyle = 'white';
          ctx.font = '20px Arial';
          ctx.fillText(`Score: ${score}`, 10, 30);
          ctx.fillText(`Level: ${level}`, canvas.width - 100, 30);
  
          requestAnimationFrame(gameLoop);
        }
  
        gameLoop();
  
        document.addEventListener('keydown', e => {
          if (e.key === 'ArrowLeft' && player.x > 0) {
            player.x -= player.speed;
          }
          if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
            player.x += player.speed;
          }
          if (e.key === ' ' && !gameOver) {
            bullets.push({ x: player.x + player.width / 2 - 1.5, y: player.y });
          }
          if (e.key === 'r' && gameOver) {
            gameOver = false;
            score = 0;
            level = 1;
            enemies = [];
            bullets = [];
            particles = [];
            createEnemies();
          }
        });
      }
    };
  
    window.SpaceInvaders = SpaceInvaders;
  })(window);