let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    scene: [gameScene],
    backgroundColour: '#ffff',
    pixelArt: true,
    physics: {
        default : 'arcade',
        arcade: {
            debug: true
        }
    }
};

let game = new Phaser.Game(config);