var text;

levels.result = function () {};
levels.result.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = "#5ac18e";

        var resultText = game.playerStats.life > 0 ? "Win!" : "Game Over!";
        

        //fix bc it still shows it when the player loses
        if (game.playerStats.life > 0) {
            var style = {
                fill: "#dde587",
                boundsAlignH: "center",
                boundsAlignV: "middle",
            };
            text = game.add.text(100, 155,
                "Defeating the final boss has lifted the \ncurse that took Arlo's powers away.\nShe is now back to being the happy fairy \nshe once was!\n\n", style);
            }

        var result = game.add.text(
            270,
            330,
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


