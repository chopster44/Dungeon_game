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
            debug: false
        }
    }
};

let game = new Phaser.Game(config);