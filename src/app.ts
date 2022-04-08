import "phaser";

type GameConfig = Phaser.Types.Core.GameConfig

const config: GameConfig = {
    title: "Dungeon Game!",
    height: 700,
    width: 500,
    parent: "game",
    scene: [],
    backgroundColor: "#ffffff",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        },
    },
};

export class DungeonGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
};

window.onload = () => {
    var game = new DungeonGame(config); 
}
