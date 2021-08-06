let gameScene = new Phaser.Scene('Game');

var player;
var coin;
var coin_count = 0;
var text;

gameScene.preload = function () {
    this.load.image('single_coin', './Assets/Single_coin.png');
    this.load.spritesheet('player', './Assets/Player1_sprite_sheet.png', { frameWidth: 32, frameHeight: 32 });
};

gameScene.create = function () {
       
    // coin = this.physics.add.staticGroup();
    // coin.create(450, 400, 'single_coin').setScale(2);
    
    player = this.physics.add.sprite(400, 400, 'player').setScale(2);
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
    
    coin = this.physics.add.group({
        key: 'single_coin',
        repeat: 10,
        setXY: { x: 12, y: 550  , stepX: 70 }
    });
    //coin.setScale(2)

    cursors = this.input.keyboard.createCursorKeys();
    player.anims.play('Down/Idle', true);

    text = this.add.text(50, 50, '0', { fontSize: '16px', fill: "#ffffff"  });
    text.setText(coin_count);

    this.physics.add.overlap(player, coin, collectCoin, null, this);
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
    };

    // var collider = this.physics.collide(coin, player);
    // if (collider) {
    //     coin_count += 1
    //     //coin.destroy();
    //     this.physics.world.removeCollider(collider);
    // }
    // text.setText(coin_count);
}

function collectCoin(player, coins) {
    coins.disableBody(true, true);

    coin_count += 10;
    text.setText('Coins: ' + coin_count);

    if (coin.countActive(true) === 0)
    {

        coin.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        // var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        // coin = this.physics.add.group({
        //     key: 'single_coin',
        //     repeat: 10,
        //     setXY: { x: 12, y: 550  , stepX: 70 }
        // });
    }
}

