levels.story2 = function () {};
levels.story2.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = "#3333FF";

        var result = game.add.text(
            125 ,
            175,
            `    Welcome to the magical world of Fofaida.\n  A fantasy forest full of beautiful creatures,\nsome good, some bad, which way will it be?\n      A long journey awaits you to recover\n                   your long-lost powers.`,
            {
                fontSize: "16px",
                fill: "#dde587",
            }
        );

        var next = game.add.text(
            275,
            400,
            '(Press Z to Continue)',
            {
                fontSize: "16px",
                fill: "#dde587",
            }
        );

        game.input.keyboard
            .addKey(Phaser.Keyboard.Z)
            .onDown.add(goToLevel0, null, null, null);
    },
    update: function () {},
};

function goToLevel0(i, args) {
    game.state.start("level0");
}
