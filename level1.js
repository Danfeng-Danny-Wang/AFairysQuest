var levels = {};
var arlo;
var platformsRec, platformsSquare, stars, diamonds;
var cursors;
var lifebar;

levels.level1 = function () {};
levels.level1.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image("forestBG", "assets/forestBG.png");
    game.load.image("arlo", "assets/arlo.png");
    game.load.spritesheet("arloSheet", "assets/arloSheet.png");
    game.load.image("platformRec", "assets/rect-platf.png");
    game.load.image("platformSquare", "assets/square-platf.png");
    game.load.image("star", "assets/star.png");
    game.load.image("diamond", "assets/diamond.png");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var background = game.add.sprite(0, 0, "forestBG");
    background.scale.setTo(0.6, 0.6);

    lifebar = game.add.text(16, 16, game.playerStats.lifebar, {
        fill: "#ff0000",
    });

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
    // middle bot
    createRecPlatforms(420, 250, 1.4, 0.3);

    // mid box
    createSquarePlatforms(240, 250);
    createDiamond(245, 225);

    arlo = game.add.sprite(32, 15, "arlo");
    arlo.scale.setTo(0.08, 0.08);
    game.physics.arcade.enable(arlo);

    arlo.body.bounce.y = 0.2;
    arlo.body.gravity.y = 300;
    arlo.body.collideWorldBounds = true;

    // arlo.animations.add("moveRight", [0, 1, 2, 3, 4], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    var hitPlatformsRec = game.physics.arcade.collide(arlo, platformsRec);
    var hitPlatformsSquare = game.physics.arcade.collide(arlo, platformsSquare);

    arlo.body.velocity.x = 0;

    if (cursors.left.isDown) {
        arlo.body.velocity.x = -1 * game.playerStats.movementSpeed;
    } else if (cursors.right.isDown) {
        arlo.body.velocity.x = game.playerStats.movementSpeed;
        // arlo.animations.play("moveRight");
    } else {
        arlo.animations.stop();
    }

    if (
        cursors.up.isDown &&
        arlo.body.touching.down &&
        (hitPlatformsRec || hitPlatformsSquare)
    ) {
        arlo.body.velocity.y = -200;
    }

    game.physics.arcade.overlap(arlo, stars, collectStar, null, this);
    game.physics.arcade.overlap(arlo, diamonds, collectDiamond, null, this);
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
    game.playerStats.life++;
    game.playerStats.lifebar += "❤";
    lifebar.text = game.playerStats.lifebar;
}
