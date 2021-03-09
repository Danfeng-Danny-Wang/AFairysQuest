var BGMusic, bulletSound, hitSound;
var platformsRec, platformsSquare, stars, diamonds;
var arlo, portal;
var enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8;
var bullets;
var bulletTime = 0;
var fireButton;
var facingRight = true;
var cursors;
var strongPotion;

levels.level2 = function () {};

levels.level2.prototype = {
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
    game.load.image("strongPotion", "assets/sprites/strong.png");

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

    var background = game.add.sprite(-400, 0, "forestBG");
    background.scale.setTo(0.2, 0.2);

    game.input.touch.preventDefault = false;
    BGMusic = game.add.audio("music");
    BGMusic.play();

    bulletSound = game.add.audio("bullet");
    hitSound = game.add.audio("hit");

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
    createRecPlatforms(0, game.world.height - 30, 6, 0.6);

    createRecPlatforms(0, 500, 1, 0.3);
    createRecPlatforms(250, 430, 1, 0.3);
    createRecPlatforms(0, 370, 1, 0.3);
    createRecPlatforms(250, 290, 1, 0.3);
    createRecPlatforms(0, 230, 1, 0.3);
    createRecPlatforms(250, 150, 1, 0.3);

    createRecPlatforms(380, 100, 0.1, 9);

    strongPotion = game.add.sprite(320, 520, "strongPotion");
    strongPotion.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(strongPotion);

    arlo = game.add.sprite(20, 500, "arloSheet");
    arlo.scale.setTo(0.025, 0.025);
    game.physics.arcade.enable(arlo);

    arlo.body.bounce.y = 0.2;
    arlo.body.gravity.y = 300;
    arlo.body.collideWorldBounds = true;

    arlo.animations.add("walk", [0, 1, 2, 3, 4]);

    enemy1 = addEnemy(400, 300);

    enemy2 = addEnemy(0, 430);
    enemy3 = addEnemy(250, 330);
    enemy4 = addEnemy(0, 300);
    enemy5 = addEnemy(250, 190);
    enemy6 = addEnemy(0, 160);
    enemy7 = addEnemy(250, 50);

    enemy8 = addEnemy(400, 520);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}

function update() {
    var hitPlatformsRec = game.physics.arcade.collide(arlo, platformsRec);
    var hitPlatformsSquare = game.physics.arcade.collide(arlo, platformsSquare);

    game.physics.arcade.collide(enemy1, platformsRec);
    updateEnemy(enemy1, 400, 720);
    game.physics.arcade.collide(enemy2, platformsRec);
    updateEnemy(enemy2, 0, 100);
    game.physics.arcade.collide(enemy3, platformsRec);
    updateEnemy(enemy3, 250, 310);
    game.physics.arcade.collide(enemy4, platformsRec);
    updateEnemy(enemy4, 0, 100);
    game.physics.arcade.collide(enemy5, platformsRec);
    updateEnemy(enemy5, 250, 310);
    game.physics.arcade.collide(enemy6, platformsRec);
    updateEnemy(enemy6, 0, 100);
    game.physics.arcade.collide(enemy7, platformsRec);
    updateEnemy(enemy7, 250, 310);
    game.physics.arcade.collide(enemy8, platformsRec);
    updateEnemy(enemy8, 400, 720);

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

    game.physics.arcade.overlap(arlo, strongPotion, jumpHigher, null, this);
}

function jumpHigher() {
    strongPotion.kill();
    game.playerStats.jumpStrength -= 40;
}

function addEnemy(x, y) {
    var enemy = game.add.sprite(x, y, "enemy");
    enemy.scale.setTo(0.12, 0.12);
    game.physics.arcade.enable(enemy);
    enemy.body.bounce.y = 0.2;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = true;
    return enemy;
}

function updateEnemy(enemy, start, end) {
    if (enemy.x <= start && enemy.body.touching.down) {
        enemy.body.velocity.x = 150;
    } else if (enemy.x >= end) {
        enemy.body.velocity.x = -150;
    }

    game.physics.arcade.overlap(bullets, enemy, killEnemy, null, this);
}
