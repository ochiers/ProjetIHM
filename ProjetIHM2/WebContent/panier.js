//var maxWidth = 1300;
//var maxHeight = 400;

var maxWidth = document.body.clientWidth - 50;
var maxHeight = document.body.clientHeight - 50;

var game = new Phaser.Game(maxWidth, maxHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var panier;

handleOrientationEvent = function(e) {
 
        // Get the orientation of the device in 3 axes, known as alpha, beta, and gamma, 
        // represented in degrees from the initial orientation of the device on load
 
        var alpha = e.alpha,
            beta = e.beta,
            gamma = e.gamma;
 
        // Rotate the <img> element in 3 axes according to the device’s orientation
 
        alert("alpha : " + alpha + ", beta : " + beta + ", gamma");
    };
 
// Listen for changes to the device orientation using the gyroscope and fire the event 
// handler accordingly
 
window.addEventListener('deviceorientation', handleOrientationEvent, false);




function preload() {

	game.load.image('panier', './images/box.png');
}


function create() {

	panier = game.add.sprite(game.world.centerX, game.world.centerY, 'panier');
	game.physics.enable(panier, Phaser.Physics.ARCADE);
	panier.scale.set(0.3);
		console.log(panier);
}

function update(){


		panier.body.position.y = game.world.centerY-panier.body.height/2; //La position en y doit etre fixe
		panier.body.position.x = game.input.x-panier.body.width/2;
		
		
		
		/*
		*
		*
		*TODO : Module d'envoie des coordonées(en % de la taille du jeu, sinon ça va foirer) au serveur (en ajax ou en angular, a voir...).
		*
		*
		*/
		
		$.ajax({
			url : 'ServletPanier',
			type : 'GET', // On désire recevoir du HTML
			data : "action=POST&posX="+game.input.x/maxWidth,
			success : function(data, statut) { // code_html contient le HTML
			}
		});
}

function render(){

}
