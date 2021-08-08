let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
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