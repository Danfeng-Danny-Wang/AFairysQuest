var BGMusic, bulletSound, hitSound;
var platformsRec, platformsSquare, stars, hearts;
var arlo, portal;

// TODO: add enemy
var enemy1,
    enemy2,
    enemy3,
    enemy4,
    enemy5,
    enemy6,
    enemy7,
    enemy8,
    enemy9,
    enemy10,
    enemy11,
    enemy12,
    enemy13,
    enemy14,
    enemy15,
    enemy16,
    enemy17;

var bullets;
var bulletTime = 0;
var fireButton;
var facingRight = true;
var cursors;
// var feather;
var lifebar;

levels.level4 = function () {};
levels.level4.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image("forestBG", "assets/sprites/forestBG.png");
    game.load.image("arlo", "assets/sprites/arlo.png");
    game.load.spritesheet(
        "arloSheet",
        "assets/sprites/arloSheet-3.png",
        1000,
        1687
    );
    game.load.image("platformRec", "assets/sprites/rect-platf.png");
    game.load.image("platformSquare", "assets/sprites/square-platf.png");
    game.load.image("star", "assets/sprites/star.png");
    game.load.image("heart", "assets/sprites/heart.png");
    game.load.image("portal", "assets/sprites/portal.png");
    game.load.image("enemy", "assets/sprites/enemy_gray.png");
    game.load.image("bullet", "assets/sprites/bullet.png");
    game.load.image("feather", "assets/sprites/jump.png");

    game.load.audio("music", [
        "assets/sounds/bgMusic.mp3",
        "assets/sounds/bgMusic.ogg",
    ]);
    game.load.audio("bullet", [
        "assets/sounds/bulletSound.mp3",
        "assets/sounds/bulletSound.ogg",
    ]);
    game.load.audio("hit", ["assets/sounds/whoosh.mp3", "assets/sounds/hit.ogg"]);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // TODO: Change starting position
    game.playerStats.startingPosX = 20;
    game.playerStats.startingPosY = 30;

    var background = game.add.sprite(0, 0, "forestBG");
    background.scale.setTo(0.6, 0.6);

    game.input.touch.preventDefault = false;
    BGMusic = game.add.audio("music");
    BGMusic.play();

    bulletSound = game.add.audio("bullet");
    hitSound = game.add.audio("hit");

    lifebar = game.add.text(16, 16, game.playerStats.lifebar, {
        fill: "#ff0000",
    });

    // bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, "bullet");
    bullets.setAll("anchor.x", 0.5);
    bullets.setAll("anchor.y", 0.5);
    bullets.setAll("outOfBoundsKill", true);
    bullets.setAll("checkWorldBounds", true);

    platformsRec = game.add.group();
    platformsRec.enableBody = true;

    platformsSquare = game.add.group();
    platformsSquare.enableBody = true;

    stars = game.add.group();
    stars.enableBody = true;

    hearts = game.add.group();
    hearts.enableBody = true;

    // TODO: create platforms
    createRecPlatforms(0, game.world.height - 12, 6, 0.25);

    createRecPlatforms(0, 80, 5.4, 0.25);
    createSquarePlatforms(60, 45, 0.5, 0.3);
    createSquarePlatforms(365, 45, 0.5, 0.3);
    createSquarePlatforms(710, 45, 0.5, 0.3);

    createRecPlatforms(55, 180, 5.4, 0.25);
    createSquarePlatforms(55, 145, 0.5, 0.3);
    createSquarePlatforms(560, 145, 0.5, 0.3);
    createSquarePlatforms(305, 145, 0.5, 0.3);

    createRecPlatforms(0, 280, 5.4, 0.25);
    createSquarePlatforms(200, 245, 0.5, 0.3);
    createSquarePlatforms(709, 245, 0.5, 0.3);
    createSquarePlatforms(450, 245, 0.5, 0.3);

    createRecPlatforms(55, 380, 5.4, 0.25);
    createSquarePlatforms(55, 345, 0.5, 0.3);
    createSquarePlatforms(620, 345, 0.5, 0.3);
    createSquarePlatforms(415, 345, 0.5, 0.3);
    createSquarePlatforms(230, 345, 0.5, 0.3);

    createRecPlatforms(55, 480, 5.4, 0.25);
    createSquarePlatforms(350, 445, 0.5, 0.3);
    createSquarePlatforms(700, 445, 0.5, 0.3);

    createSquarePlatforms(200, 552, 0.5, 0.3);
    createSquarePlatforms(600, 552, 0.5, 0.3);

    // TODO: create Hearts, etc.
    createHeart(750, 450);

    // TODO: portal position
    portal = game.add.sprite(740, 535, "portal");
    portal.scale.setTo(0.1, 0.1);
    game.physics.arcade.enable(portal);

    arlo = game.add.sprite(
        game.playerStats.startingPosX,
        game.playerStats.startingPosY,
        "arloSheet"
    );
    arlo.scale.setTo(0.025, 0.025);
    game.physics.arcade.enable(arlo);

    arlo.body.bounce.y = 0.2;
    arlo.body.gravity.y = 300;
    arlo.body.collideWorldBounds = true;

    arlo.animations.add("right", [5, 6, 7, 8, 9]);
    arlo.animations.add("left", [0, 1, 2, 3, 4]);

    // TODO: create enemies'
    enemy1 = addEnemy(100, 0);
    enemy2 = addEnemy(400, 0);
    enemy3 = addEnemy(100, 100);
    enemy4 = addEnemy(350, 100);
    enemy5 = addEnemy(600, 100);
    enemy6 = addEnemy(0, 200);
    enemy7 = addEnemy(245, 200);
    enemy8 = addEnemy(490, 200);
    enemy9 = addEnemy(100, 300);
    enemy10 = addEnemy(270, 300);
    enemy11 = addEnemy(450, 300);
    enemy12 = addEnemy(655, 300);
    enemy13 = addEnemy(60, 400);
    enemy14 = addEnemy(400, 400);
    enemy15 = addEnemy(0, 500);
    enemy16 = addEnemy(250, 500);
    enemy17 = addEnemy(640, 500);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}

function update() {
    var hitPlatformsRec = game.physics.arcade.collide(arlo, platformsRec);
    var hitPlatformsSquare = game.physics.arcade.collide(arlo, platformsSquare);

    //TODO: enemy physics
    game.physics.arcade.collide(enemy1, platformsRec);
    updateEnemy(enemy1, 100, 300);
    game.physics.arcade.collide(enemy2, platformsRec);
    updateEnemy(enemy2, 400, 650);
    game.physics.arcade.collide(enemy3, platformsRec);
    updateEnemy(enemy3, 100, 250);
    game.physics.arcade.collide(enemy4, platformsRec);
    updateEnemy(enemy4, 350, 500);
    game.physics.arcade.collide(enemy5, platformsRec);
    updateEnemy(enemy5, 600, 730);
    game.physics.arcade.collide(enemy6, platformsRec);
    updateEnemy(enemy6, 0, 145);
    game.physics.arcade.collide(enemy7, platformsRec);
    updateEnemy(enemy7, 245, 385);
    game.physics.arcade.collide(enemy8, platformsRec);
    updateEnemy(enemy8, 490, 650);
    game.physics.arcade.collide(enemy9, platformsRec);
    updateEnemy(enemy9, 100, 170);
    game.physics.arcade.collide(enemy10, platformsRec);
    updateEnemy(enemy10, 270, 360);
    game.physics.arcade.collide(enemy11, platformsRec);
    updateEnemy(enemy11, 450, 570);
    game.physics.arcade.collide(enemy12, platformsRec);
    updateEnemy(enemy12, 655, 730);
    game.physics.arcade.collide(enemy13, platformsRec);
    updateEnemy(enemy13, 60, 290);
    game.physics.arcade.collide(enemy14, platformsRec);
    updateEnemy(enemy14, 400, 630);
    game.physics.arcade.collide(enemy15, platformsRec);
    updateEnemy(enemy15, 0, 150);
    game.physics.arcade.collide(enemy16, platformsRec);
    updateEnemy(enemy16, 250, 530);
    game.physics.arcade.collide(enemy17, platformsRec);
    updateEnemy(enemy17, 640, 730);

    game.physics.arcade.overlap(arlo, hearts, collectHeart, null, this);

    arlo.body.velocity.x = 0;

    if (cursors.left.isDown) {
        arlo.scale.setTo(0.025, 0.025);
        arlo.body.setSize(495, 1687, 0, 0);

        arlo.body.velocity.x = -1 * game.playerStats.movementSpeed;
        facingRight = false;
        arlo.animations.play("left", 14, true);
    } else if (cursors.right.isDown) {
        arlo.scale.setTo(0.025, 0.025);
        arlo.body.setSize(495, 1687, 10, 0);

        arlo.body.velocity.x = game.playerStats.movementSpeed;
        facingRight = true;
        arlo.animations.play("right", 14, true);
    } else {
        arlo.animations.stop();
        if (facingRight == false)
        {
            arlo.frame = 0;
        }
        else
        {
            arlo.frame = 5;
        }
    }

    if (
        cursors.up.isDown &&
        arlo.body.touching.down &&
        (hitPlatformsRec || hitPlatformsSquare)
    ) {
        arlo.body.velocity.y = game.playerStats.jumpStrength;
    }

    // Firing?
    if (fireButton.isDown) {
        fireBullet();
    }

    game.physics.arcade.collide(
        bullets,
        platformsRec,
        bulletsHitWall,
        null,
        this
    );
    game.physics.arcade.collide(
        bullets,
        platformsSquare,
        bulletsHitWall,
        null,
        this
    );

    game.physics.arcade.overlap(arlo, portal, goToBoss, null, this);
}

function goToBoss() {
    game.state.start("bosslevel");
}
