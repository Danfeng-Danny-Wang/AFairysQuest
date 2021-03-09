var levels = {};

var arlo, enemy1, enemy2, portal;
var platformsRec, platformsSquare, stars, diamonds;
var bullets;
var bulletTime = 0;
var fireButton;
var facingRight = true;
var cursors;
var lifebar;
var BGMusic, bulletSound, hitSound;

levels.level1 = function () {};
levels.level1.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image("forestBG", "assets/sprites/2070.png");
    game.load.image("arlo", "assets/sprites/arlo.png");
    game.load.spritesheet(
        "arloSheet",
        "assets/sprites/arloSheet.png",
        1000,
        1687
    );
    game.load.image("platformRec", "assets/sprites/rect-platf.png");
    game.load.image("platformSquare", "assets/sprites/square-platf.png");
    game.load.image("star", "assets/sprites/star.png");
    game.load.image("diamond", "assets/sprites/diamond.png");
    game.load.image("portal", "assets/sprites/portal.png");
    game.load.image("enemy", "assets/sprites/enemy_gray.png");
    game.load.image("bullet", "assets/sprites/bullet.png");

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

    game.playerStats.startingPosX = 32;
    game.playerStats.startingPosY = 15;

    var background = game.add.sprite(0, 0, "forestBG");
    background.scale.setTo(0.2, 0.2);

    // Music and Sound
    game.input.touch.preventDefault = false;

    // var musicConfig = {
    //     mute: false,
    //     volume: 1,
    //     rate: 1,
    //     detune: 0,
    //     seek: 0,
    //     loop: false,
    //     delay: 0,
    // };
    BGMusic = game.add.audio("music");
    BGMusic.play();

    bulletSound = game.add.audio("bullet");
    hitSound = game.add.audio("hit");

    // Lifebar
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

    diamonds = game.add.group();
    diamonds.enableBody = true;

    // ground
    createRecPlatforms(0, game.world.height - 33, 6, 0.5);
    // left-most verticle wall
    createRecPlatforms(0, 200, 0.1, 7);
    // uppercorner
    createRecPlatforms(20, 100, 1, 0.3);
    // middle top
    createRecPlatforms(230, 80, 1, 0.3);
    createStar(285, 40);
    // middle right
    createRecPlatforms(420, 250, 1.4, 0.3);

    // mid box
    createSquarePlatforms(240, 250);
    createDiamond(245, 225);

    portal = game.add.sprite(730, 510, "portal");
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

    arlo.animations.add("walk", [0, 1, 2, 3, 4]);

    enemy1 = game.add.sprite(430, 100, "enemy");
    enemy1.scale.setTo(0.12, 0.12);
    game.physics.arcade.enable(enemy1);
    enemy1.body.bounce.y = 0.2;
    enemy1.body.gravity.y = 300;
    enemy1.body.collideWorldBounds = true;

    enemy2 = game.add.sprite(20, 300, "enemy");
    enemy2.scale.setTo(0.12, 0.12);
    game.physics.arcade.enable(enemy2);
    enemy2.body.bounce.y = 0.2;
    enemy2.body.gravity.y = 300;
    enemy2.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}

function update() {
    var hitPlatformsRec = game.physics.arcade.collide(arlo, platformsRec);
    var hitPlatformsSquare = game.physics.arcade.collide(arlo, platformsSquare);

    arlo.body.velocity.x = 0;

    if (cursors.left.isDown) {
        arlo.scale.setTo(-0.025, 0.025);
        arlo.body.velocity.x = -1 * game.playerStats.movementSpeed;
        facingRight = false;
        arlo.animations.play("walk", 14, true);
    } else if (cursors.right.isDown) {
        arlo.scale.setTo(0.025, 0.025);
        arlo.body.velocity.x = game.playerStats.movementSpeed;
        facingRight = true;
        arlo.animations.play("walk", 14, true);
    } else {
        arlo.animations.stop("walk");
        arlo.frame = 0;
    }

    if (
        cursors.up.isDown &&
        arlo.body.touching.down &&
        (hitPlatformsRec || hitPlatformsSquare)
    ) {
        arlo.body.velocity.y = game.playerStats.jumpStrength;
    }

    game.physics.arcade.overlap(arlo, stars, collectStar, null, this);
    game.physics.arcade.overlap(arlo, diamonds, collectDiamond, null, this);
    game.physics.arcade.overlap(arlo, portal, goTolevel2, null, this);

    game.physics.arcade.collide(enemy1, platformsRec);

    if (enemy1.x <= 430 && enemy1.body.touching.down) {
        enemy1.body.velocity.x = 150;
    } else if (enemy1.x >= 580) {
        enemy1.body.velocity.x = -150;
    }

    game.physics.arcade.collide(enemy2, platformsRec);

    if (enemy2.x <= 20 && enemy2.body.touching.down) {
        enemy2.body.velocity.x = 150;
    } else if (enemy2.x >= 600) {
        enemy2.body.velocity.x = -150;
    }

    // Firing?
    if (fireButton.isDown) {
        fireBullet();
    }

    game.physics.arcade.collide(arlo, enemy1, loseLife, null, this);
    game.physics.arcade.collide(arlo, enemy2, loseLife, null, this);

    game.physics.arcade.overlap(bullets, enemy1, killEnemy, null, this);
    game.physics.arcade.overlap(bullets, enemy2, killEnemy, null, this);

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
}

function createRecPlatforms(x, y, scaleX, scaleY) {
    var platform = platformsRec.create(x, y, "platformRec");
    platform.scale.setTo(scaleX, scaleY);
    platform.body.immovable = true;
}

function createSquarePlatforms(x, y) {
    var platform = platformsSquare.create(x, y, "platformSquare");
    platform.body.immovable = true;
}

function createStar(x, y) {
    var star = stars.create(x, y, "star");
    star.body.immovable = true;
}

function createDiamond(x, y) {
    var diamond = diamonds.create(x, y, "diamond");
    diamond.scale.setTo(0.8, 0.8);
    diamond.body.immovable = true;
}

function collectStar(arlo, star) {
    star.kill();
    game.playerStats.movementSpeed += 50;
}

function collectDiamond(arlo, diamond) {
    diamond.kill();
    changeLifebar();
}

function changeLifebar(add = true) {
    if (add) {
        game.playerStats.life++;
        generateLifebar();
        lifebar.text = game.playerStats.lifebar;
    } else {
        game.playerStats.life--;

        if (game.playerStats.life === 0) {
            game.state.start("result");
        }

        generateLifebar();
        lifebar.text = game.playerStats.lifebar;
    }
}

function goTolevel2() {
    game.state.start("level2");
}

function loseLife() {
    arlo.x = game.playerStats.startingPosX;
    arlo.y = game.playerStats.startingPosY;
    changeLifebar(false);
}

function generateLifebar() {
    game.playerStats.lifebar = "";
    for (var i = 0; i < game.playerStats.life; i++) {
        game.playerStats.lifebar += "❤";
    }
}

function fireBullet() {
    if (game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            bullet.reset(arlo.x + 26, arlo.y + 25);
            bullet.body.velocity.x = facingRight ? 400 : -400;
            bulletTime = game.time.now + 200;
            bulletSound.play();
        }
    }
}

function killEnemy(bullet, enemy) {
    bullet.kill();
    enemy.kill();
    hitSound.play();
}

function bulletsHitWall(bullet, wall) {
    bullet.kill();
}
