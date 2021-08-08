let gameScene = new Phaser.Scene('Game');

var player;
var coin;
var coin_count = 0;
var text;
var wall_layer;
var floor_layer;

gameScene.preload = function () {
    //load tileset
    this.load.image('dungeon_tiles', './Assets/Tiles-SandstoneDungeons.png');
    // load coin and player images
    this.load.image('single_coin', './Assets/Single_coin.png');
    this.load.spritesheet('player', './Assets/Player1_sprite_sheet.png', { frameWidth: 32, frameHeight: 32 });
};

gameScene.create = function () {
    
    this.cameras.main.setBounds(0, 0, 3392, 1000);

    //ground layer
    const ground = [
        [  0,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   1,   1,   1,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1 ],
        [  0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1 ],
        [  0,   1,   1,   1,   0,   0,   0,   0,   0,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   1,   1,   1,   1,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   1,   1,   1,   1,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   1,   1,   1,   1,   1,   1,   1 ],
        [  0,   0,   0,   0,   0,   1,   1,   1,   1,   1,   1,   1 ]
    ];
    this.ground_map = this.make.tilemap({ data: ground, tileWidth: 64, tileHeight: 64 });
    const tiles1 = this.ground_map.addTilesetImage('tileset1', "dungeon_tiles");
    floor_layer = this.ground_map.createLayer(0, tiles1, 0, 0);
    
    //wall layer
    var walls = [
        [ 18,  19,  19,  19,  20,   0,   0,   0,   0,   0,   0,   0,  0 ],
        [ 18,   0,   0,   0,  19,  19,  19,  19,  19,  19,  19,  19, 20 ],
        [ 18,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 20 ],
        [ 18,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 20 ],
        [ 18,   0,   0,   0,  47,  55,  55,  55,  45,   0,   0,   0, 20 ],
        [ 54,  55,  55,  55,  56,   0,   0,   0,  18,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,  18,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,  18,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,  18,  19,  19,  19,  19,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,  18,   0,   0,   0,   0,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,  18,   0,   0,   0,   0,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,  18,   0,   0,   0,   0,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,  18,   0,   0,   0,   0,   0,   0,   0, 20 ],
        [  0,   0,   0,   0,  54,  55,  55,  55,  55,  55,  55,  55, 56 ]
    ];
    this.walls_map = this.make.tilemap({ data: walls, tileWidth: 64, tileHeight: 64 });
    var tiles2 = this.walls_map.addTilesetImage('tileset2', "dungeon_tiles");
    wall_layer = this.walls_map.createLayer(0, tiles2, 0, 0);
    
    //spawn player sprite
    player = this.physics.add.sprite(182, 160, 'player').setScale(2);
    // Stops player from colliding from world bounds
    player.setCollideWorldBounds(false);

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
        //spawns coin twice
        repeat: 1,
        // at these positions
        setXY: { x: 100, y: 160  , stepY: 450, stepX: 300 }
    });

    //creates arrowkey controls
    cursors = this.input.keyboard.createCursorKeys();

    //starts Idle animation
    player.anims.play('Down/Idle', true);

    //loads text and sets it to coin count
    text = this.add.text(650, 50, '0', { fontSize: '16px', fill: "#ffffff"  });
    text.setText('Coin: ' + coin_count);

    //runs collectCoin if player touches coin
    this.physics.add.overlap(player, coin, collectCoin, null, this);

    //collisions between player and walls
    wall_layer.setCollisionBetween(18, 59, true);
    this.physics.add.collider(player, wall_layer);
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
    //camera follows player
    this.cameras.main.startFollow(player);
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
        
        text.setText('All coins have been collected!');

        //creates more coins

        // coin.children.iterate(function (child) {
        //     //The first comment spawns them on the top row
        //     //child.enableBody(true, child.x, 0, true, true);
            
        //     //The second spawns 1 coin in the corect place 
        //     //child.enableBody(true, 12, 550, true, true);
            
        //     // Spawns new coins on Y axis
        //     child.enableBody(true, child.x - 10, child.y, true, true);
        // });
    };
};

