var levels = {};

levels.story = function () {};
levels.story.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = "#3333FF";

        var resultText = "A Fairy's Quest";
        var result = game.add.text(
            300,
            230,
            `${resultText}\nPress Z to start`,
            {
                fontSize: "32px",
                fill: "#dde587",
            }
        );

        game.input.keyboard
            .addKey(Phaser.Keyboard.Z)
            .onDown.add(goToStory2, null, null, null);
    },
    update: function () {},
};

function goToStory2(i, args) {
    game.state.start("story2");
}
