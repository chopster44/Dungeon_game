let gameScene = new Phaser.Scene('Game');

var player;
var coin;
var coin_count = 0;
var text;

gameScene.preload = function () {
    // load coin and player images
    this.load.image('single_coin', './Assets/Single_coin.png');
    this.load.spritesheet('player', './Assets/Player1_sprite_sheet.png', { frameWidth: 32, frameHeight: 32 });
};

gameScene.create = function () {
    
    //spawn player sprite
    player = this.physics.add.sprite(400, 400, 'player').setScale(2);
    player.setCollideWorldBounds(true);

    //create the animations
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
    
    //spawns the first set of coins
    coin = this.physics.add.group({
        key: 'single_coin',
        repeat: 10,
        setXY: { x: 12, y: 550  , stepX: 70 }
    });

    //creates arrowkey controls
    cursors = this.input.keyboard.createCursorKeys();
    //starts Idle animation
    player.anims.play('Down/Idle', true);

    //loads text and sets it to coin count
    text = this.add.text(50, 50, '0', { fontSize: '16px', fill: "#ffffff"  });
    text.setText('Coin: ' + coin_count);

    //runs collectCoin if player touches coin
    this.physics.add.overlap(player, coin, collectCoin, null, this);
};

gameScene.update = function () {
    
    //runs animation when buttons are pressed
    if (cursors.left.isDown){
        //movement
        player.setVelocityX(-160);
        player.setVelocityY(0);
        //animation
        player.anims.play('Left', true);
    }
    
    else if (cursors.right.isDown){
        //movement
        player.setVelocityX(160);
        player.setVelocityY(0);
        //animation
        player.anims.play('Right', true);
    }

    else if (cursors.up.isDown){
        //movement
        player.setVelocityY(-160);
        player.setVelocityX(0);
        //animation
        player.anims.play('Up', true);
    }

    else if (cursors.down.isDown){
        //movement
        player.setVelocityY(160);
        player.setVelocityX(0);
        //animation
        player.anims.play('Down/Idle', true);
    }

    else {
        //stop movement
        player.setVelocityX(0);
        player.setVelocityY(0);
    };
}

function collectCoin(player, coins) {
    //removes the coin touched
    coins.disableBody(true, true);

    //adds 1 coin to coin count
    coin_count += 1;
    text.setText('Coins: ' + coin_count);

    //spawns new coins
    if (coin.countActive(true) === 0)
    {
        //creates more coins

        coin.children.iterate(function (child) {
            //The first comment spawns them on the top row
            //child.enableBody(true, child.x, 0, true, true);
            
            //The second spawns 1 coin in the corect place 
            //child.enableBody(true, 12, 550, true, true);

            child.enableBody(true, child.x, 550, true, true);
        });
    };
};

