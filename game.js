window.onload = function() {

	var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'FlappyBird');

	var bird;

	var birdGravity = 800;

	var birdSpeed = 125;

	var birdFlapPower = 300;

	var pipeInterval = 2000;

	var pipeHole = 120;

	var pipeGroup;

  var play = function(game){};

  play.prototype = {
		preload:function(){

			/* Rellenar */

		},
		create:function(){
			pipeGroup = game.add.group();

			game.stage.backgroundColor = "#87CEEB";
			game.stage.disableVisibilityChange = true;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			/* Rellenar */

		},
		update:function(){
			/* Rellenar */
		},
		render:function(){
			game.debug.bodyInfo(bird,32,32);
		}
	};

   game.state.add("Play",play);
   game.state.start("Play");

	function flap(){
		bird.body.velocity.y = -birdFlapPower;
	}

	function addPipe(){
		var pipeHolePosition = game.rnd.between(50,430-pipeHole);

		var upperPipe = new Pipe(game,320,pipeHolePosition-480,-birdSpeed);
		game.add.existing(upperPipe);
		pipeGroup.add(upperPipe);
		var lowerPipe = new Pipe(game,320,pipeHolePosition+pipeHole,-birdSpeed);
		game.add.existing(lowerPipe);
		pipeGroup.add(lowerPipe);
	}

	function die(){
		game.state.start("Play");
	}


	Pipe = function (game, x, y, speed) {
		Phaser.Sprite.call(this, game, x, y, "pipe");
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.x = speed;
	};

	Pipe.prototype = Object.create(Phaser.Sprite.prototype);
	Pipe.prototype.constructor = Pipe;

	Pipe.prototype.update = function() {
		if(this.x < -this.width){
			this.destroy();
		}
	};
};
