var levels = {};
var cursors;
var lifebar;

levels.menu = function () {};
levels.menu.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = "#5ac18e";
        var startText = game.add.text(
            300,
            230,
            "Press Z to Start",
            {
                fontSize: "32px",
                fill: "#dde587",
            }
        );

        game.input.keyboard
            .addKey(Phaser.Keyboard.Z)
            .onDown.add(fn1, null, null, null);
    },
    update: function () {},
};

function fn1(i, args) {
    game.playerStats.life = 3;
    game.playerStats.lifebar = "❤❤❤";
    game.playerStats.movementSpeed = 100;
    game.playerStats.jumpStrength = -200;
    game.state.start("level0");
}
