levels.result = function () {};
levels.result.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = "#5ac18e";

        var result = game.add.text(300, 230, "Win!\nPress Z to restart", {
            fontSize: "32px",
            fill: "#dde587",
        });

        game.input.keyboard
            .addKey(Phaser.Keyboard.Z)
            .onDown.add(fn1, null, null, null);
    },
    update: function () {},
};

function fn1(i, args) {
    game.playerStats.life = 3;
    game.playerStats.lifebar = "❤❤❤";
    game.state.start("level1");
}
