game.spellBook = {
	'magic missile':{

		level: 			1,
		cost: 			10,
		element: 		"force",
		school:			"invocation", 
		cooldown: 		1,
			
		travel : {
			duration: 		800,
			path: 			null,
			interpolator: 	null,
			rotation: 		false, 
			image: 	{
				name: 		'mmissile', 
				sprite: 	null,
				frame: {
					h:		2,
					w:		3
				}
			},
			animation: {
				frames: 	[0, 1, 2],
				duration: 	100
			}
		},
		splash: {
			duration: 		1000,
			animation: {
				frames: 	[3, 4, 5],
				duration: 	100
			}
		},
		
		initEffect : function(  ){
			return [
				null,
				function( target ){
					target && target.damage( roll( 1, 6, 1 ), 'force' );
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
	
	'fireball': {
		level: 			3,
		cost: 			30, 
		element: 		"fire",
		school: 		"invocation", 
		
		travel : {
			duration: 		1500,
			image: 	{
				name: 		'fireball'
			}
		},
		
		splash : {
			image : {
				name : 		"boom"
			},
			rotation: 		0
		},
		
		interpolator : new CAAT.Behavior.Interpolator( ).createExponentialOutInterpolator( 5, false ),
		
		initEffect : function(  ){
			var fx = function( target ){
				target && target.damage( roll( 5, 6 ), 'fire' );
				return true;
			};
			return [ null, fx ];
		},
		
		initBehaviour: function ( ) {
			return [ 
				[	new CAAT.Behavior.RotateBehavior().
						setValues( 0, 3*Math.PI ).
						setFrameTime( gameScene.time, this.travel.duration )
				], 
				[ ]
			];
		}
	},
	//TODO risistemare
	'lightning': {
		level: 			3,
		cost: 			10, 
		element: 		"nature",
		school: 		"invocation", 
		
		travel: {
			duration: 		500,
			image : {
				name : "lightning",
				frame: {
					h: 4, w: 1
				}
			},
			animation: {
				frames: 	[0, 1, 2, 2, 0, 3],
				duration: 	100
			},
			anchor: {
				x: 1, y: 1
			}
		},
		
		splash : {
			duration: 		10,
			image: 	{
				name: 		'empty'
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
	
	"unknown": {
		level: 0
	}
};
game.spellList = [ 'magic missile', 'fireball', 'lightning' ];

//NOTA gia' meglio ma non mi garantisce l'ordine
// game.spellList = Object.keys( game.spellBook );