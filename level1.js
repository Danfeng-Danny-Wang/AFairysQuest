var levels = {};

levels.level1 = function () {};
levels.level1.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image("forestBG", "assets/forestBG.png");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var background = game.add.sprite(0, 0, "forestBG");
    background.scale.setTo(0.6, 0.6);
}

function update() {}
