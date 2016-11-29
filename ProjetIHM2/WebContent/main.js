var maxWidth = document.body.clientWidth - 50;
var maxHeight = document.body.clientHeight - 50;

var game = new Phaser.Game(maxWidth, maxHeight, Phaser.CANVAS,
		'phaser-example', {
			preload : preload,
			create : create,
			update : update,
			render : render
		});

var ballons = [];
var puzzlePieces = [];
var gameDuration = 70;
var timeRemaining = gameDuration * 1000;
var textTimeRemaing;
var textRatioScore;
var freq = 25;
var shootedBallons = 0;
var createdBallons = 0;
var piecesAttrapees = 0;
function preload() {

	game.load.image('balloon1', './images/balloon_blue.png');
	game.load.image('balloon3', './images/balloon_green.png');
	game.load.image('balloon4', './images/balloon_black.png');
	game.load.image('target', './images/target.png');
	game.load.image('puzzle1', './images/puzzle1.png');
	game.load.image('puzzle2', './images/puzzle2.png');
	game.load.image('panier', './images/box.png');
}

var target;

function create() {

	this.stage.disableVisibilityChange = true;

	textTimeRemaing = game.add.text(32, 32, "Time Remaining", {
		font : "24px Arial",
		fill : "green"
	});
	textRatioScore = game.add.text(32, 64, "Ratio", {
		font : "24px Arial",
		fill : "green"
	});

	// balloon = game.add.sprite(game.world.centerX, game.world.centerY,
	// 'balloon');
	game.input.addMoveCallback(p, this);
	game.canvas.style.cursor = "none";
	// target.input.pixelPerfectOver = true;
	game.input.mouse.mouseDownCallBack = shoot;
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = -25;
	// game.physics.arcade.enable(balloon);
	// balloon.body.collideWorldBounds = false;

	game.canvas.addEventListener("mousedown", shoot);

	/*
	 * for (var x = 0; x < 75; x++) { var b =
	 * game.add.sprite(Math.floor((Math.random() * (maxWidth-100)) + 1), 50 +
	 * Math.floor((Math.random() * 4000) + 600), 'balloon1');
	 * game.physics.arcade.enable(b); b.body.collideWorldBounds = false;
	 * b.body.gravity.y = Math.floor((Math.random() * -50) + 10);
	 * b.scale.set(0.3); ballons.push(b); }
	 */

	/*
	 * aliens = game.add.group(); aliens.enableBody = true;
	 * //aliens.physicsBodyType = Phaser.Physics.ARCADE;
	 * 
	 * //game.physics.p2.enable(aliens); createBalloons();
	 * game.physics.p2.enable(aliens);
	 */

	createBallonsPeriodicaly();
	game.time.events.add(Phaser.Timer.SECOND * gameDuration, endGame, this);

	panier = game.add.sprite(game.world.centerX, game.world.centerY, 'panier');
	game.physics.enable(panier, Phaser.Physics.ARCADE);
	panier.scale.set(0.1);
}

function endGame() {

	for (var i = 0; i < ballons.length; i++) {
		if (ballons[i].body != null)
			game.add.tween(ballons[i]).to({
				alpha : 0
			}, 1000, Phaser.Easing.Linear.None, true);
	}
	game.time.events.add(Phaser.Timer.SECOND * 3, function() {
		for (var i = 0; i < ballons.length; i++)
			ballons[i].destroy()
	}, this);

	console.log(piecesAttrapees);

}

function pointRectangleIntersection(p, r) {
	return p.x > r.x1 && p.x < r.x2 && p.y > r.y1 && p.y < r.y2;
}

function shoot(mouseEvent) {

	var point = {
		x : mouseEvent.clientX,
		y : mouseEvent.clientY
	};
	var mis = 0;
	for (var i = 0; i < ballons.length; i++) {
		var b = ballons[i];
		if (b.body != null) {
			var rectangle = {
				x1 : b.body.position.x,
				x2 : b.body.position.x + b.body.width,
				y1 : b.body.position.y,
				y2 : b.body.position.y + b.body.height
			};
			if (pointRectangleIntersection(point, rectangle)) {
				var p = game.add.sprite(b.body.position.x, b.body.position.y,
						'puzzle' + Math.floor(Math.random() * 2 + 1));
				game.physics.arcade.enable(p);
				p.body.collideWorldBounds = false;
				p.body.gravity.y = 300;
				p.scale.set(0.1);
				puzzlePieces.push(p);
				b.destroy();
				shootedBallons++;
			}
		}
	}

}

/*
 * A quoi sert cette fonction ???
 */
function createBalloons() {

	for (var x = 0; x < 10; x++) {
		var alien = aliens.create(100, 50 + Math
				.floor((Math.random() * 100) + 1), 'balloon');
		// alien.anchor.setTo(0.5, 0.5);
		// game.physics.p2.enable(alien);
		alien.body.collideWorldBounds = false;
	}

	aliens.x = 10;
	aliens.y = 50;
	// game.physics.p2.enable(aliens);

}

function p(pointer) {

	// console.log(pointer.);
	// console.log(game.input.activePointer.x);
	target.x = game.input.activePointer.x;
	target.y = game.input.activePointer.y;
	target.z = 1;

}

function rectanglesIntersection(r, r1) {
	return pointRectangleIntersection(r1.p1, r)
			|| pointRectangleIntersection(r1.p2, r)
			|| pointRectangleIntersection(r1.p3, r)
			|| pointRectangleIntersection(r1.p4, r);
}

function attraperPiece() {

	var recPanier = {
		x1 : panier.x,
		x2 : panier.x + panier.body.width,
		y1 : panier.y,
		y2 : panier.y + panier.body.height
	};

	for (var i = 0; i < puzzlePieces.length; i++) {
		var p = puzzlePieces[i];
		if (p.body != null) {
			var rectangle = {
					
					p1 : {
						x : p.body.position.x,
						y : p.body.position.y
					},
					p2 : {
						x : p.body.position.x + p.body.width,
						y : p.body.position.y
					},
					p3 : {
						x : p.body.position.x,
						y : p.body.position.y + p.body.height
					},
					p4 : {
						x : p.body.position.x + p.body.width,
						y : p.body.position.y + p.body.height
					}
			};
			if (rectanglesIntersection(recPanier, rectangle)) {
				piecesAttrapees++;
				p.destroy();
			}
			if(p.body != null && p.body.position.y > maxHeight + 200){
				p.destroy();
			}
		}
	}

}

function update() {

	timeRemaining -= game.time.elapsed;
	if (timeRemaining <= 0)
		timeRemaining = 0;
	textTimeRemaing.text = "Temps restant : "
			+ Math.floor(timeRemaining / 1000);
	textRatioScore.text = "Ratio : " + shootedBallons + "/" + createdBallons;

	panier.body.position.y = maxHeight - panier.body.height - 10;

	$.ajax({

		url : 'ServletPanier',
		type : 'GET', // On désire recevoir du HTML
		data : "action=GET",
		success : function(data, statut) { // code_html contient le HTML
			panier.x = data.posX;
		}
	});
	attraperPiece();
	// panier.body.position.x = game.input.x;

}

function createBallonsPeriodicaly() {

	if (timeRemaining > freq) {

		for (var x = 0; x < 75; x++) {
			var b = game.add.sprite(Math
					.floor((Math.random() * (maxWidth - 100)) + 1), 50 + Math
					.floor((Math.random() * 4000) + 600), 'balloon1');
			game.physics.arcade.enable(b);
			b.body.collideWorldBounds = false;
			b.body.gravity.y = Math.floor((Math.random() * -50) + 10);
			b.scale.set(0.3);
			ballons.push(b);
			createdBallons++;
		}
		game.time.events.add(Phaser.Timer.SECOND * freq,
				createBallonsPeriodicaly, this);
	}
	if(target != undefined)
		target.destroy();
	
	target = game.add.sprite(game.world.centerX, game.world.centerY, 'target');
	target.anchor.set(0.5);
	target.inputEnabled = true;
	target.scale.set(0.3);

}

function render() {

	/*
	 * game.debug.text("Over: " + target.input.pointerOver(), 32, 32);
	 * game.debug.text(game.input.mouse.locked, 320, 32);
	 */

}
