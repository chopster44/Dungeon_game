let gameScene = new Phaser.Scene('Game');

var player;

gameScene.preload = function () {
    this.load.spritesheet('player', './Assets/Player1_sprite_sheet.png', { frameWidth: 32, frameHeight: 32 });
};

gameScene.create = function () {
    
    player = this.physics.add.sprite(500, 400, 'player');
    player.setCollideWorldBounds(true);
    
    this.anims.create({
        key: 'Down/Idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'Right',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'Left',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'Up',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    player.anims.play('Down/Idle', true);
};

gameScene.update = function () {
    
    if (cursors.left.isDown){
        player.setVelocityX(-160);
        player.setVelocityY(0);
        player.anims.play('Left', true);
    }
    
    else if (cursors.right.isDown){
        player.setVelocityX(160);
        player.setVelocityY(0);
        player.anims.play('Right', true);
    }

    else if (cursors.up.isDown){
        player.setVelocityY(-160);
        player.setVelocityX(0);
        player.anims.play('Up', true);
    }

    else if (cursors.down.isDown){
        player.setVelocityY(160);
        player.setVelocityX(0);
        player.anims.play('Down/Idle', true);
    }

    else {
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
}
