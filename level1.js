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

    var ground = platformsRec.create(0, game.world.height - 33, "platformRec");
    ground.scale.setTo(6, 0.5);
    ground.body.immovable = true;

    arlo = game.add.sprite(32, 32, "arlo");
    arlo.scale.setTo(0.08, 0.08);
    game.physics.arcade.enable(arlo);

    arlo.body.bounce.y = 0.2;
    arlo.body.gravity.y = 300;
    arlo.body.collideWorldBounds = true;

    // arlo.animations.add("moveRight", [0, 1, 2, 3, 4], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    var hitPlatform = game.physics.arcade.collide(arlo, platformsRec);

    arlo.body.velocity.x = 0;

    if (cursors.left.isDown) {
        arlo.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        arlo.body.velocity.x = 150;
        // arlo.animations.play("moveRight");
    } else {
        arlo.animations.stop();
    }

    if (cursors.up.isDown && arlo.body.touching.down && hitPlatform) {
        arlo.body.velocity.y = -200;
    }
}
