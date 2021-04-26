//var levels = {};
var BGMusic, bulletSound, hitSound;
var platformsRec, platformsSquare, stars, hearts;
var arlo, portal;
var boss;
var bullets;
var bulletTime = 0;
var fireButton;
var facingRight = true;
var cursors;
var lifebar;

levels.bosslevel = function () {};
levels.bosslevel.prototype = {
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
    game.load.spritesheet("boss", "assets/sprites/frog.png", 270, 186);
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

    game.playerStats.startingPosX = 32;
    game.playerStats.startingPosY = 15;
 
    var background = game.add.sprite(0, 0, "forestBG");
    background.scale.setTo(0.6, 0.6);

    var style = {
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle",
    };
   

    // Music and Sound
    game.input.touch.preventDefault = false;

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

    hearts = game.add.group();
    hearts.enableBody = true;

    // ground
    createRecPlatforms(0, game.world.height - 33, 6, 0.5);

    createSquarePlatforms(355, 450);
    createStar(360, 425);

    // mid box
    /* createRecPlatforms(150, 500, 1, 0.3);
    createHeart(210, 473); */

    portal = game.add.sprite(730, 510, "portal");
    portal.scale.setTo(0.1, 0.1);
    game.physics.arcade.enable(portal); 

    // arlo
    arlo = game.add.sprite(
        game.playerStats.startingPosX,
        game.playerStats.startingPosY,
        "arloSheet"
    );
    arlo.scale.setTo(0.025, 0.025);
    game.physics.arcade.enable(arlo);

    arlo.body.bounce.y = 0.1;
    arlo.body.gravity.y = 300;
    arlo.body.collideWorldBounds = true;

    arlo.animations.add("right", [5, 6, 7, 8, 9]);
    arlo.animations.add("left", [0, 1, 2, 3, 4]);

    // boss
    boss = game.add.sprite(430, 0, "boss");
    boss.scale.setTo(0.8, 0.8);

    game.physics.arcade.enable(boss);
    boss.body.bounce.y = 0.2;
    boss.body.gravity.y = 300;
    boss.body.collideWorldBounds = true;

    boss.animations.add("fuming", [0, 1, 2, 3, 4, 5]);
    boss.animations.play("fuming", 14, true);


    // cursors 
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}

function update() {
    var hitPlatformsRec = game.physics.arcade.collide(arlo, platformsRec);
    var hitPlatformsSquare = game.physics.arcade.collide(arlo, platformsSquare);

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

    game.physics.arcade.overlap(arlo, stars, collectStar, null, this);
    game.physics.arcade.overlap(arlo, hearts, collectHeart, null, this);

    game.physics.arcade.collide(boss, platformsRec);
    game.physics.arcade.collide(boss, platformsSquare);


    /*if (boss.x <= 430 && boss.body.touching.down) {
        boss.body.velocity.x = 150;
    } else if (boss.x >= 685) {
        boss.body.velocity.x = -150;
    }*/

    // Firing?
    if (fireButton.isDown) {
        fireBullet();
    }

    game.physics.arcade.collide(arlo, boss, loseLife, null, this);

    game.physics.arcade.overlap(bullets, boss, killEnemy, null, this);

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