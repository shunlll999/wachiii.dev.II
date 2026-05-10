function init() {

		var moveX = 0;
		var scale = 0.5;
		var speed = 300;
    var isCollidor = false;
    var isJump = false;
    var dogIsJump = false;
    var isGameStart = false;
    var isFristRun = true;

    var score = 0;
    var runScore = 0;
    var scoreText;
    var runningText;

    var emitter;

    var star;
		var bg;
		var far;
		var ground;
		var face;
		var hero;
    var dog;
    var myInterval;
    var soundBT;
    var startButton;
    var screenBlack;
    var mouseIcon;

    var music;
    var game = new Phaser.Game(640, 320, Phaser.AUTO, 'gamewall', { preload: preload, create: create, update: update  });

        function preload () {

            game.load.image('mainbg', 'images/mainbg.png');
            game.load.image('farBg', 'images/bg2.png');
            game.load.image('ground', 'images/ground.png');
            game.load.image('face', 'images/face.png');
            game.load.image('star', 'images/star.png');
            game.load.image('soundBt', 'images/soundOn.png');
            game.load.image('mouse', 'images/mouse.png');

            game.load.spritesheet("pushBt","images/spritePush.png", 129,92);

            game.load.audio('bgm', 'audio/oedipus.mp3');
            game.load.audio('ping', 'audio/p-ping.mp3');
            game.load.audio('hSound', 'audio/menu_select.mp3')

            game.load.atlasJSONHash('run', 'atlas/heroAtlas.png', 'atlas/running.json');
            game.load.atlasJSONHash('hert', 'atlas/heroAtlas.png', 'atlas/hert.json');
            game.load.atlasJSONHash('jump', 'atlas/heroAtlas.png', 'atlas/jump.json');

            game.load.atlasJSONHash('dogJump', 'atlas/dogAtlas.png', 'atlas/dog_jump.json');
            game.load.atlasJSONHash('dogRun', 'atlas/dogAtlas.png', 'atlas/dog_run.json');
            

        }

        function create () {

            createStageGame();
            createHero();
            createParticles();
            crateItems();
            createScreen();

           game.input.onDown.add(commandHero, this);
        }

        function createStageGame(){

            // background
            bg = game.add.sprite(game.world.centerX, game.world.centerY-100, 'mainbg');
            bg.anchor.setTo(0.5, 0.5);

            //wood trees
            far = game.add.sprite(0, 0, 'farBg');

            //ground
            ground = game.add.sprite(0, game.world.centerY+50, 'ground');
            ground.scale.y = 0.6;
           
            //face 
            face = game.add.sprite(game.world.width, game.world.centerY+40, 'face');
            face.scale.x = face.scale.y = 0.8;
            face.name = "face";
            face.body.setSize(20, 20, 70, 0);

            //dog
            dog = game.add.sprite(game.world.width+100, 180, 'dogRun');
            dog.anchor.setTo(0.5, 0);
            dog.animations.add('dog_run');
            dog.oldY = dog.y;

            //sound control button
            soundBT = game.add.button(game.world.width-60, 16, 'soundBt', commandSound, this, 1, 2, 0);
            mouseIcon = game.add.sprite(0, 0, 'mouse');

            mouseIcon.x = game.world.width-(mouseIcon.width+40);
            mouseIcon.y = game.world.height;

            //display Game
            var style = { font: "20px Arial", fill: "#ff6600" };
            var iconStar = game.add.sprite(16 , 16, 'star');
            scoreText = game.add.text(iconStar.x+iconStar.width+5, 20, ': 0', style);
            runningText = game.add.text(16, scoreText.x, 'score : 0',style);

        }

        function createHero(){

          hero = game.add.sprite(-100, 150, 'run');
          hero.animations.add('run');
          
          hero.name = "hero";
          hero.oldY = hero.y;
          hero.oldX = 100;
          hero.scale.x = hero.scale.y = scale;

        }

        function createParticles(){

          emitter = game.add.emitter(game.world.centerX, 200, 200);
          emitter.makeParticles('star');
          emitter.gravity = 10;

        }

        function createScreen(){
          screenBlack = game.add.graphics(0, 0);
          screenBlack.beginFill(0x000000,0.7);
          screenBlack.drawRect(0, 0, game.world.width, game.world.height);
          screenBlack.endFill();
          startButton = game.add.button(game.world.centerX - 64, 120, 'pushBt', actionOnClick, this, 2, 1, 0);
        }

        function hideScreen(){
          screenBlack.visible = false;
          startButton.visible = false;
        }

        function showScreen(){
          screenBlack.visible = true;
          startButton.visible = true;
        }

        function actionOnClick(){

          hideScreen();

          if( isFristRun ){

            isFristRun = false;
            game.add.tween(hero).to({x: hero.oldX}, 3000, Phaser.Easing.Cubic.Out, true, 1000, false).onCompleteCallback(startFaceEnemy);
            game.add.tween(mouseIcon).to({y:game.world.height-(mouseIcon.height+10)}, 1000, Phaser.Easing.Cubic.Out, true, 500, false);
            startGame();

          }else{

            resumeSound();
            reborn();
          }
         

        }

        function startAnimate(){
          far.body.velocity.x = -50;
          ground.body.velocity.x = -speed;
          hero.animations.play('run', 60, true);
          dog.animations.play('dog_run', 30, true);
          star.body.velocity.x =  -speed;
          dog.body.velocity.x =  -10;
        }

        function startFaceEnemy(){
           face.body.velocity.x = -speed;
        }

        function stopAnimate(){
          far.body.velocity.x = ground.body.velocity.x = ace.body.velocity.x = star.body.velocity.x =  0;
          hero.animations.stop();
        }

        function startSound(){
          music = game.add.audio('bgm',1,true);
          music.play('',0,1,true);
          music.volume = 0.5;
        }

        function pauseSound(){
          music.volume = 0;
        }

        function resumeSound(){

          if ( soundBT.alpha == 0.5 ) {
            music.volume = 0;
          }else {
            music.volume = 0.5;
          }
          
        }

        function startGame(){

          isGameStart = true;
          startSound();
          startAnimate();

        }

        function crateItems(){

          star = game.add.sprite(game.world.centerX, game.world.centerY-50, 'star');
          star.name = "star";
          
        }

        function commandSound(){

          if ( soundBT.alpha == 0.5 ) {
            soundBT.alpha = 1;
            music.volume = 0.5;
          }else{
            soundBT.alpha = 0.5;
            music.volume = 0;
          };

        }

        function hertAnim(){
        	hero.loadTexture('hert', 0);
          hero.animations.add('hert');
          hero.y = 200;
        }

        function runAnim(){
        	hero.loadTexture('run', 0);
          hero.animations.add('run');
          hero.animations.play('run', 60, true);
          isJump = false;
        }

        function jumpAnim(){
          hero.loadTexture('jump', 0);
          hero.animations.add('jump');
        }

        function dog_runAnim(){
          dog.loadTexture('dogRun', 0);
          dog.animations.add('dog_run');
          dog.animations.play('dog_run', 30, true);
        }

        function dog_jumpAnim(){
          dog.loadTexture('dogJump', 0);
          dog.animations.add('dog_jump');
        }

        function update(){

        	bg.body.velocity.x= 10 * Math.sin( moveX );
    			moveX += 0.02;
    			if( far.x < -900 ){
    				far.x = 0;
    			}
    			
    			if( ground.x < -640 ){
    				ground.x = 0;
    			}
    			
    			if( face.x < -100 ){
    				face.x = 640;
    			}

          if( star.x < -100 ){
            star.x = 640;
            star.visible = true;
          }

          if( dog.x < -100){
            dog.x = game.world.width;
          }

          if( dog.x > game.world.width+50){
            dog.x = game.world.width+50;
            dog.body.velocity.x =  0;
          }

          if( distance_obj( dog, face ) ){
            if( !dogIsJump ){

              dogIsJump = true;
              dogJump();
              console.log("dog is near face");

            }
           
          }

          if( isGameStart ){

            if( !isCollidor ){
              runScore += 0.2;
              runningText.content = 'score : ' + Math.floor(runScore);
            }
            
          }
          

    			game.physics.collide(hero, face, collisionHandler, null, this);
          game.physics.overlap(hero, star, collectStar, null, this);

        }

    function collisionHandler (obj1, obj2) {

		    //console.log(obj1.name + ' collided with ' + obj2.name);
        isCollidor = true;
		    hertAnim();
  			setTimeout( reStartGame ,3000);
  			//game.paused = true;
  			face.body.velocity.x = 0;
  			ground.body.velocity.x = 0;
  			hero.body.velocity.x = 0;
        far.body.velocity.x = 0;
        star.body.velocity.x =  0;
        dog.body.velocity.x =  300;

        emitter.minParticleSpeed.setTo(100, -300);
        emitter.maxParticleSpeed.setTo( 300, 300);

        emitter.x = hero.x+50;
        emitter.y = hero.y;
        emitter.start(true, 2000, 15,10);

        score = 0;
        scoreText.content = ': ' + score;
        runScore = runScore/3
        runningText.content = 'score : ' + Math.floor(runScore);
        game.sound.play('hSound');


		}

    function reStartGame(){
      showScreen();
      pauseSound();
    }

    function distance_obj( a, b ) {
      var dX = b.x - a.x;
      var dY = b.y - a.y;
      var dist = Math.sqrt( dX * dX - dY * dY );
      //console.log("log "+(a.width / 3 + b.width / 3));
      //return dist <= a.width / 3 + b.width / 3;
      return dist <= 20;
    }

    function collectStar(hero, star){
        //console.log("hit star");
        //star.visible = false;
        game.sound.play('ping');
        star.x = game.world.width;
        score += 10;
        scoreText.content = ': ' + score;
    }

		function reborn(){
			
			runAnim();
			ground.body.velocity.x =   star.body.velocity.x =  -speed;
      far.body.velocity.x = -50;
       dog.body.velocity.x =  -10;
			face.x = -100;
			setTimeout( function(){ face.body.velocity.x = -speed; } ,1000);
      hero.y = hero.oldY;
      hero.x = hero.oldX;
      isCollidor = false;
		}

    function commandHero(){

      if( isGameStart ){
       // console.log("click Stage "+isGameStart);
        if( !isCollidor ){
          if( !isJump ){
            isJump = true;
            jumpAnim();
            game.add.tween(hero).to({y: hero.oldY-100}, 500, Phaser.Easing.Cubic.Out, true, 0, false).onCompleteCallback(reRun);
          }
        }
      }

    }

    function dogJump(){
      game.add.tween(dog).to({y: dog.oldY-100}, 300, Phaser.Easing.Cubic.Out, true, 0, false).onCompleteCallback(dogRun);
    }

    function dogRun(){

      dogIsJump = false;
      dog_jumpAnim();
      game.add.tween(dog).to({y: dog.oldY}, 300, Phaser.Easing.Cubic.In, true, 0, false).onCompleteCallback(dog_runAnim);
    }

    function reRun(){

      if( !isCollidor ){

        game.add.tween(hero).to({y: hero.oldY}, 500, Phaser.Easing.Cubic.In, true, 0, false).onCompleteCallback(runAnim);

      }
    }

    };