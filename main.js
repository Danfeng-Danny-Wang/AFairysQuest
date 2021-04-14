var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add("menu", levels.menu);
game.state.add("level0", levels.level0);
game.state.add("level1", levels.level1);
game.state.add("level2", levels.level2);
game.state.add("level3", levels.level3);
game.state.add("level4", levels.level4);
game.state.add("result", levels.result);

game.playerStats = {
    movementSpeed: 100,
    jumpStrength: -200,
    life: 3,
    lifebar: "❤❤❤",
    startingPosX: 32,
    startingPosY: 15,
};

game.state.start("menu");
