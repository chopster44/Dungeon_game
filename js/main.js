let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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