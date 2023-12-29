var hero = {
    x: 374,
    y: 800,
    score: 100
};

var enemies = [];
var enemies2 = [];
var bullets = [];
var bullets2 = [];

function initializeEnemies() {
    enemies = [
        { x: 50, y: 30, health: 2 },
        { x: 250, y: 50, health: 2 },
        { x: 450, y: 50, health: 2 },
        { x: 460, y: 30, health: 2 },
        { x: 470, y: 20, health: 2 },
        { x: 480, y: 50, health: 2 },
        { x: 490, y: 30, health: 2 },
    ];

    enemies2 = [
        { x: 50, y: 30, health: 4 },
        { x: 250, y: 50, health: 4 },
        { x: 260, y: 20, health: 4 }
    ];
}

initializeEnemies();

function displayHero() {
        // Check left boundary
        if (hero.x < 0) {
            hero.x = 0;
        }
    
        // Check right boundary
        if (hero.x > 630) {
            hero.x = 630;
        }
    
        // Check top boundary
        if (hero.y < 0) {
            hero.y = 0;
        }
    
        // Check bottom boundary
        if (hero.y > 760) {
            hero.y = 760;
        }
    document.getElementById("hero").style["top"] = hero.y + "px";
    document.getElementById("hero").style["left"] = hero.x + "px";

      if (isHeroInvincible) {
        document.getElementById("hero").style["opacity"] = 0.5;
    } else {
        document.getElementById("hero").style["opacity"] = 1;
    }
}

function displayEnemies() {
    var output = "";
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].health <= 0) {
            output += "<div class='enemy1' style='top:" + enemies[i].y + "px; left:" +
                enemies[i].x + "px;'><div class='enemy-health'>Kill</div></div>";
        } else {
            output += "<div class='enemy1' style='top:" + enemies[i].y + "px; left:" +
                enemies[i].x + "px;'><div class='enemy-health'>" + enemies[i].health + "</div></div>";
        }
    }
    document.getElementById("enemies").innerHTML = output;
}

function displayEnemies2() {
    var output = "";
    for (var i = 0; i < enemies2.length; i++) {
        if (enemies2[i].health <= 0) {
            output += "<div class='enemy2' style='top:" + enemies2[i].y + "px; left:" +
                enemies2[i].x + "px;'><div class='enemy-health'>Kill</div></div>";
        } else {
            output += "<div class='enemy2' style='top:" + enemies2[i].y + "px; left:" +
                enemies2[i].x + "px;'><div class='enemy-health'>" + enemies2[i].health + "</div></div>";
        }
    }
    document.getElementById("enemies2").innerHTML = output;
}

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].y += 2;

        // Check bottom boundary and respawn
        if (enemies[i].y > 800) { // Adjusted the value to 800 based on your container height
            respawnEnemy(enemies, i);
        }
    }
}

function moveEnemies2() {
    for (var i = 0; i < enemies2.length; i++) {
        enemies2[i].y += 4;

        // Check bottom boundary and respawn
        if (enemies2[i].y > 800) { // Adjusted the value to 800 based on your container height
            respawnEnemy(enemies2, i);
        }
    }
}
function respawnEnemy(enemyArray, i) {
    var collision = false;
    var newX = Math.random() * 500;
    var newY = 0;
    var initialHealth = 2; // Set the initial health value here, you can adjust it as needed

    for (var j = 0; j < enemyArray.length; j++) {
        if (
            newX < enemyArray[j].x + 120 &&
            newX + 120 > enemyArray[j].x &&
            newY < enemyArray[j].y + 130 &&
            newY + 130 > enemyArray[j].y
        ) {
            collision = true;
            break;
        }
    }

    if (collision) {
        respawnEnemy(enemyArray, i);
    } else {
        enemyArray[i] = { x: newX, y: newY, health: initialHealth };
    }
}

function respawnEnemy2(enemyArray, i) {
    var collision = false;
    var newX = Math.random() * 500;
    var newY = 0;
    var initialHealth = 4; // Set the initial health value here, you can adjust it as needed

    for (var j = 0; j < enemyArray.length; j++) {
        if (
            newX < enemyArray[j].x + 120 &&
            newX + 120 > enemyArray[j].x &&
            newY < enemyArray[j].y + 130 &&
            newY + 130 > enemyArray[j].y
        ) {
            collision = true;
            break;
        }
    }

    if (collision) {
        respawnEnemy(enemyArray, i);
    } else {
        enemyArray[i] = { x: newX, y: newY, health: initialHealth };
    }
}


function displayBullets() {
    var output = "";
    for (var i = 0; i < bullets.length; i++) {
        output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" +
            bullets[i].x + "px;'></div>";
    }
    document.getElementById("bullets").innerHTML = output;
}

function displayBullets2() {
    var output = "";
    for (var i = 0; i < bullets2.length; i++) {
        output += "<div class='bullet2' style='top:" + bullets2[i].y + "px; left:" +
            bullets2[i].x + "px;'></div>";
    }
    document.getElementById("bullet2").innerHTML = output;
}

function moveBullets() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5;

        if (bullets[i].y < 0) {
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
            
        }
    }
}

function moveBullets2() {
    for (var i = 0; i < bullets2.length; i++) {
        bullets2[i].y -= 5;

        if (bullets2[i].y < 0) {
            bullets2[i] = bullets2[bullets2.length - 1];
            bullets2.pop();
        }
    }
}

var isHeroInvincible = false;

function checkCollisions() {
    if (isHeroInvincible) {
        return; // If hero is invincible, don't process collisions
    }
     // Check collisions with enemies
     for (var i = 0; i < enemies.length; i++) {
        if (
            hero.x < enemies[i].x + 100 &&
            hero.x + 170 > enemies[i].x &&
            hero.y < enemies[i].y + 130 &&
            hero.y + 170 > enemies[i].y
        ) {
            if (!isHeroInvincible) {
                hero.score -= 5;
                updateScore();

                // Apply cooldown and initiate opacity change
                isHeroInvincible = true;
                applyOpacityChange();
                setTimeout(function () {
                    isHeroInvincible = false;
                }, 1000);
            }
        }
    }
    for (var i = 0; i < enemies.length; i++) {
        if (
            hero.x < enemies[i].x + 100 &&
            hero.x + 170 > enemies[i].x &&
            hero.y < enemies[i].y + 130 &&
            hero.y + 170 > enemies[i].y
        ) {
            hero.score -= 5;
            updateScore();
        }

        for (var j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x < enemies[i].x + 100 &&
                bullets[j].x + 35 > enemies[i].x &&
                bullets[j].y < enemies[i].y + 130 &&
                bullets[j].y + 35 > enemies[i].y
            ) {
                enemies[i].health -= 1;
                if (enemies[i].health <= 0) {
                    playExplosionAnimation(enemies[i].x, enemies[i].y);
                    respawnEnemy(enemies, i);
                    hero.score += 10;
                }
                
                bullets[j] = bullets[bullets.length - 1];
                bullets.pop();
                updateScore();
                 // Play bullet sound
                 var bulletSound = document.getElementById("explosionSound");
                 bulletSound.currentTime = 0; // Reset audio to the beginning
                 bulletSound.play();
            }
        }
    }
    for (var i = 0; i < enemies.length; i++) {
        if (
            hero.x < enemies[i].x + 100 &&
            hero.x + 170 > enemies[i].x &&
            hero.y < enemies[i].y + 130 &&
            hero.y + 170 > enemies[i].y
        ) {
            hero.score -= 5;
            updateScore();
        }

        for (var j = 0; j < bullets2.length; j++) {
            if (
                bullets2[j].x < enemies[i].x + 100 &&
                bullets2[j].x + 35 > enemies[i].x &&
                bullets2[j].y < enemies[i].y + 130 &&
                bullets2[j].y + 35 > enemies[i].y
            ) {
                enemies[i].health -= 1;
                if (enemies[i].health <= 0) {
                    playExplosionAnimation(enemies[i].x, enemies[i].y);
                    respawnEnemy(enemies, i);
                    hero.score += 10;
                }
                bullets2[j] = bullets2[bullets2.length - 1];
                bullets2.pop();
                updateScore();
                 // Play bullet sound
                 var bulletSound = document.getElementById("explosionSound");
                 bulletSound.currentTime = 0; // Reset audio to the beginning
                 bulletSound.play();     
            }
        }
    }
    for (var i = 0; i < enemies2.length; i++) {
        if (
            hero.x < enemies2[i].x + 120 &&
            hero.x + 170 > enemies2[i].x &&
            hero.y < enemies2[i].y + 130 &&
            hero.y + 170 > enemies2[i].y
        ) {
            hero.score -= 10;
            updateScore();
        }

        for (var j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x < enemies2[i].x + 120 &&
                bullets[j].x + 35 > enemies2[i].x &&
                bullets[j].y < enemies2[i].y + 130 &&
                bullets[j].y + 35 > enemies2[i].y
            ) {
                enemies2[i].health -= 1;
                if (enemies2[i].health <= 0) {
                    playExplosionAnimation(enemies2[i].x, enemies2[i].y);
                    respawnEnemy2(enemies2, i);
                    hero.score += 30;
                }
                bullets[j] = bullets[bullets.length - 1];
                bullets.pop();
                updateScore();

                var bulletSound = document.getElementById("explosionSound2");
                 bulletSound.currentTime = 0; // Reset audio to the beginning
                 bulletSound.play();     
            }
        }
    }
    for (var i = 0; i < enemies2.length; i++) {
        if (
            hero.x < enemies2[i].x + 120 &&
            hero.x + 170 > enemies2[i].x &&
            hero.y < enemies2[i].y + 130 &&
            hero.y + 170 > enemies2[i].y
        ) {
            hero.score -= 10;
            updateScore();
        }

        for (var j = 0; j < bullets2.length; j++) {
            if (
                bullets2[j].x < enemies2[i].x + 120 &&
                bullets2[j].x + 35 > enemies2[i].x &&
                bullets2[j].y < enemies2[i].y + 130 &&
                bullets2[j].y + 35 > enemies2[i].y
            ) {
                enemies2[i].health -= 1;
                if (enemies2[i].health <= 0) {
                    playExplosionAnimation(enemies2[i].x, enemies2[i].y);
                    respawnEnemy2(enemies2, i);
                    hero.score += 30;
                }
                bullets2[j] = bullets2[bullets2.length - 1];
                bullets2.pop();
                updateScore();

                var bulletSound = document.getElementById("explosionSound2");
                 bulletSound.currentTime = 0; // Reset audio to the beginning
                 bulletSound.play();     
            }
        }
    }
}
function applyOpacityChange() {
    var heroElement = document.getElementById("hero");
    var opacity = 1;
    var interval = setInterval(function () {
        heroElement.style.opacity = opacity;
        opacity = opacity === 1 ? 0.5 : 1; // Toggle opacity between 0.5 and 1
    }, 100);

    setTimeout(function () {
        clearInterval(interval);
        heroElement.style.opacity = 1; // Reset opacity to 1 after 1 second
    }, 1000);
}
function playExplosionAnimation(x, y) {
    var explosion = document.createElement("div");
    explosion.className = "hit";
    explosion.style.top = y + "px";
    explosion.style.left = x + "px";
    document.getElementById("container").appendChild(explosion);

    var explosionSound = document.getElementById("explosionSound");
    explosionSound.currentTime = 0; // Reset audio to the beginning
    explosionSound.play();

    setTimeout(function () {
        explosion.remove();
    }, 3000);
}





function updateScore() {
    document.getElementById('score').innerText = hero.score;
}

function gameLoop() {
    displayHero();
    displayEnemies();
    moveEnemies();
    displayEnemies2();
    moveEnemies2();
    displayBullets();
    moveBullets();
    displayBullets2();
    moveBullets2();
    checkCollisions();
}

setInterval(gameLoop, 20);

document.onkeydown = function (e) {
    if (e.keyCode == 38) {
        hero.y -= 10; // up
    } else if (e.keyCode == 40) {
        hero.y += 10; // down
    } else if (e.keyCode == 39) {
        hero.x += 10; // right
    } else if (e.keyCode == 37) {
        hero.x -= 10; // left
    } else if (e.keyCode == 32) { // shoot space bar
        bullets.push({ x: hero.x + 5, y: hero.y + 25 });
        displayBullets();
        bullets2.push({ x: hero.x + 120, y: hero.y + 25 });
        displayBullets2();
           // Play bullet sound
           var bulletSound = document.getElementById("bulletSound");
           bulletSound.currentTime = 0; // Reset audio to the beginning
           bulletSound.play();
        
    }
    displayHero();
};
