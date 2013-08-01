game.spellBook = {
	'Magic Missile':{

		level: 			1,
		cost: 			10,
		element: 		"force",
		school:			"invocation", 
		cooldown: 		false,
		// icon: 		"id" su cui cercare nell'immagine che contiene tutte le icone, che sara' simile al file "base"
			
		travel : {
			duration: 		800,
			path: 			null,
			interpolator: 	null,
			rotation: 		false, 
			image: {
				name: 		'mmissile', 
				sprite: 	null,
				frame: 		{ h: 2, w: 3 }
			},
			animation: {
				frames: 	[0, 1, 2],
				duration: 	100
			}
		},
		splash: {
			duration: 		300,
			animation: {
				frames: 	[3, 4, 5],
				duration: 	100
			}
		},
		
		initEffect : function(  ){
			return [
				null,
				function( target ){
					target && target.damage( roll( 1, 6, 1, 2 ), 'force' );
					return true;
				}
			];
		},

		initPath: function ( x, y ) {
			return [ 
				new CAAT.PathUtil.Path( ).
					beginPath( game.player.x, game.player.y ).
					addCubicTo( 
						Math.random() * director.width, 
						Math.random() * director.height, 
						Math.random() * director.width * 1.5, 
						( Math.random() * director.height * 1.3 ) - director.height * 0.5, 
						x, y ).
					endPath(),
				null
			]
		}
	},
	
	'Fireball': {
		level: 			3,
		cost: 			30, 
		element: 		"fire",
		school: 		"invocation",
		cooldown: 		5,
		
		travel : {
			duration: 		1200,
			interpolator : new CAAT.Behavior.Interpolator( ).createExponentialInInterpolator( 3, false ),
			image: 	{
				name: 		'fireball'
			}
		},
		
		splash : {
			duration:		600,
			rotation:		false,
			image : {
				name : "fb-splash",
				frame: { w: 3, h: 2 }
			},
			animation: {
				frames: [0,1,2,3,4,5], duration: 100
			}
		},
		
		initEffect : function(  ){
			var fx = function( target ){
				target && target.damage( roll( 5, 6 ), 'fire' );
				return true;
			};
			return [ null, fx ];
		},
		
		initBehaviour: function ( ) {
			return [ 
				[	
					new CAAT.Behavior.RotateBehavior().
						setValues( 0, 2*Math.PI ).
						setFrameTime( gameScene.time, this.travel.duration )
				], [ ]
			];
		}
	},
	'Lightning': {
		level: 			4,
		cost: 			10, 
		cooldown: 		0,
		element: 		"nature",
		school: 		"invocation", 
		
		travel: {
			rotation: 		false,
			duration: 		10,
			image: 	{
				name: 		'empty'
			}
		},
		
		splash : {
			duration: 		250,
			image : {
				name : "lightning",
				frame: {
					h: 1, w: 4
				}
			},
			animation: {
				frames: 	[0, 2, 2, 1, 3],
				duration: 	50
			},
			anchor: {
				x: 0.5, y: 1
			},
			AOE: function( t ){
				return { y:t.y, h:20 };
			}
		},
		
		initEffect : function(  ){
			return [ 
				null, 
				function( target ){
					target && target.damage( roll( 5, 6 ), 'nature' );
					return true;
				}
			];
		}
	},
	'Wilting': {
		level: 			5,
		cost: 			35,
		cooldown: 		10,
		element: 		"unholy",
		school: 		"necromancy", 
		
		travel: {
			duration: 		10,
			image: 	{ name: 'empty' }
		},
		splash : {
			duration: 		5000,
			image : {
				name : "base",
				frame: { h: 2, w: 10 }
			},
			animation: {
				frames: 	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				duration: 	200
			}
		},
		
		initEffect : function(  ){
			return [ 
				null, 
				function( target ){
					target && target.damage( roll( 5, 6 ), 'nature' );
					return true;
				}
			];
		}
	},
	
	"Acid Arrow": {
		cooldown: 3,
		cost: 1,
		travel : {
			duration: 		800,
			path: 			null,
			interpolator: 	new CAAT.Behavior.Interpolator( ).createExponentialOutInterpolator( 2, false ),
			rotation: 		false, 
			image: {
				name: 		'aarrow', 
				frame: 		{ h: 3, w: 1 }
			},
			animation: {
				frames: 	[0, 1, 2],
				duration: 	100
			}
		},
		splash: {
			duration: 		1000,
			rotation: 		1, 
			image: {
				name: 		'mmissile',
				frame: 		{ h: 2, w: 3 }
			},
			animation: {
				frames: 	[3, 4, 5],
				duration: 	200
			}
		},
		initEffect : function(  ){
			return [
				null,
				function( target ){
					target && target.damage( roll( 2, 6, 1, 2 ), 'acid' );
					var dot = new game.Buff();
					dot.init( 7, function( t ){
						if ( this.getDurationLeft() % 2 === 1 ) {
							t && t.damage( roll( 1, 6 ), 'nature' );
						}
					} );
					target.addBuff( dot )
					return true;
				}
			];
		}
	}
};
game.spellList = [ 'Magic Missile', 'Acid Arrow', 'Fireball', 'Lightning', 'Wilting' ];

//NOTA gia' meglio ma non mi garantisce l'ordine
// game.spellList = Object.keys( game.spellBook );