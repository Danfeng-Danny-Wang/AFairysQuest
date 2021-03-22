levels.result = function () {};
levels.result.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = "#5ac18e";

        var resultText = game.playerStats.life > 0 ? "Win!" : "Game Over!";
        var result = game.add.text(
            300,
            230,
            `${resultText}\nPress Z to restart`,
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
