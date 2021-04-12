var levels = {};
var text;
var arlo;
var facingRight = true;
var cursors;
var BGMusic;

levels.startTitle = function () {};
levels.startTitle.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image('background','assets/sprites/2070.png');
    game.load.image("playButton", "assets/sprites/startbutton.png");
    game.load.image("arlo",'assets/sprites/arlo.png');

    game.load.audio("music", [
        "assets/sounds/bgMusic.mp3",
        "assets/sounds/bgMusic.ogg",
    ]);
}

function create() {
    var background = game.add.image(0, 0, "background");
    background.scale.setTo(0.2, 0.2);

    // Music and Sound
    game.input.touch.preventDefault = false;

    BGMusic = game.add.audio("music");
    BGMusic.play();

    var style = {fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    text = game.add.text(250, 155, "A Fairy's Quest", style);

    let arloLogo = game.add.sprite(100,100,'arlo')
    arloLogo.setScale(2);

    let playButton = game.add.image(0, 0, "playButton");
    playButton.scale.setTo(0.1, 0.1);

    playButton.setInteractive();

}
