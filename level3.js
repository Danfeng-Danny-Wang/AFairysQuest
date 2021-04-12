var BGMusic, bulletSound, hitSound;
var platformsRec, platformsSquare, stars, hearts;
var arlo, portal;

// TODO: add enemy
var enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7;

var bullets;
var bulletTime = 0;
var fireButton;
var facingRight = true;
var cursors;
// var feather;
var lifebar;

levels.level3 = function () {};
levels.level3.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image("forestBG", "assets/sprites/forestBG.png");
    game.load.image("arlo", "assets/sprites/arlo.png");
    game.load.spritesheet(
        "arloSheet",
        "assets/sprites/arloSheet-2.png",
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
    game.load.audio("hit", ["assets/sounds/hit.mp3", "assets/sounds/hit.ogg"]);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.playerStats.startingPosX = 40;
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

    createRecPlatforms(40, 70, 0.5, 0.3);
    createSquarePlatforms(170, 260);
    createSquarePlatforms(330, 220);
    createSquarePlatforms(60, 350);
    createSquarePlatforms(170, 420);
    createSquarePlatforms(280, 490);
    createSquarePlatforms(400, 520);
    createSquarePlatforms(460, 170);
    createSquarePlatforms(600, 120);

    portal = game.add.sprite(730, 20, "portal");
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

    arlo.animations.add("left", [5, 6, 7, 8, 9]);
    arlo.animations.add("right", [0, 1, 2, 3, 4]);

    // TODO: create enemies'
    enemy1 = addEnemy(30, 500);
    enemy2 = addEnemy(30, 400);
    enemy3 = addEnemy(30, 300);
    enemy4 = addEnemy(30, 300);
    enemy5 = addEnemy(200, 500);
    enemy6 = addEnemy(450, 500);
    enemy7 = addEnemy(450, 300);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}

function update() {
    var hitPlatformsRec = game.physics.arcade.collide(arlo, platformsRec);
    var hitPlatformsSquare = game.physics.arcade.collide(arlo, platformsSquare);

    //TODO: enemy physics
    game.physics.arcade.collide(enemy1, platformsRec);
    updateEnemy(enemy1, 30, 700);
    game.physics.arcade.collide(enemy2, platformsRec);
    updateEnemy(enemy2, 30, 700);
    game.physics.arcade.collide(enemy3, platformsRec);
    updateEnemy(enemy3, 30, 700);
    game.physics.arcade.collide(enemy4, platformsRec);
    updateEnemy(enemy4, 30, 350);
    game.physics.arcade.collide(enemy5, platformsRec);
    updateEnemy(enemy5, 200, 700);
    game.physics.arcade.collide(enemy6, platformsRec);
    updateEnemy(enemy6, 450, 700);
    game.physics.arcade.collide(enemy7, platformsRec);
    updateEnemy(enemy7, 450, 700);

    game.physics.arcade.overlap(arlo, hearts, collectHeart, null, this);

    arlo.body.velocity.x = 0;

    if (cursors.left.isDown) {
        arlo.scale.setTo(0.025, 0.025);
        arlo.body.velocity.x = -1 * game.playerStats.movementSpeed;
        facingRight = false;
        arlo.animations.play("left", 14, true);
    } else if (cursors.right.isDown) {
        arlo.scale.setTo(0.025, 0.025);
        arlo.body.velocity.x = game.playerStats.movementSpeed;
        facingRight = true;
        arlo.animations.play("right", 14, true);
    } else {
        arlo.animations.stop();
        if (facingRight == false)
        {
            arlo.frame = 5;
        }
        else
        {
            arlo.frame = 0;
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

    game.physics.arcade.overlap(arlo, portal, goToResult, null, this);
}

function goToResult() {
    game.state.start("result");
}
