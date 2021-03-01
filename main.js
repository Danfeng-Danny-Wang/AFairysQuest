var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add("level1", levels.level1);
game.state.add("result", levels.result);

game.playerStats = {
    movementSpeed: 100,
    life: 3,
    lifebar: "❤❤❤",
    // lifeInTheBeginningOfThisLevel: 3,
    // lifebarInTheBeginningOfThisLevel: "❤❤❤",
};

game.state.start("level1");
