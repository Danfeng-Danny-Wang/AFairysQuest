var levels = {};
var arlo;
var platformsRec, platformsSquare;
var cursors;

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
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var background = game.add.sprite(0, 0, "forestBG");
    background.scale.setTo(0.6, 0.6);

    platformsRec = game.add.group();
    platformsRec.enableBody = true;

    platformsSquare = game.add.group();
    platformsSquare.enableBody = true;

    // ground
    createRecPlatforms(0, game.world.height - 33, 6, 0.5);
    // left-most verticle wall
    createRecPlatforms(0, 200, 0.1, 7);
    // uppercorner
    createRecPlatforms(20, 100, 1, 0.3);
    // middle top
    createRecPlatforms(260, 80, 1, 0.3);
    // middle bot
    createRecPlatforms(420, 250, 1.4, 0.3);

    // mid box
    createSquarePlatforms(240, 250);

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
        arlo.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        arlo.body.velocity.x = 150;
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
