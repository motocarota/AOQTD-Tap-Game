// ========================================================
// Spells
// ========================================================

game.spellBook = {
	"Magic Missile":{

		level: 			1,
		cost: 			8,
		element: 		"force",
		school:			"invocation", 
		cooldown: 		false,
			
		travel : {
			duration: 		800,
			path: 			null,
			interpolator: 	null,
			rotation: 		false, 
			image: {
				name: 		"mmissile", 
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
			},
			anchor: { x: 0.5, y: 0.5 },
			AOE: function( t ){
				return { x:t.x, y:t.y, h:1, w:1 };
			}
		},
		initEffect : function(  ){
			return [
				null,
				function( target ){
					var damage = roll( 1, 6, 1 );
					target && target.damage( damage, "force" );
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
	
	"Acid Arrow": {
		cooldown: 13,
		cost: 5,
		travel : {
			path: 			null,
			interpolator: 	new CAAT.Behavior.Interpolator( ).createExponentialOutInterpolator( 2, false ),
			rotation: 		false, 
			image: {
				name: 		"aarrow", 
				frame: 		{ h: 3, w: 2 }
			},
			animation: {
				frames: 	[0, 1, 2, 4, 5],
				duration: 	100
			}
		},
		splash: {
			duration: 		300,
			rotation: 		true, 
			image: {
				name: 		"aarrows",
				frame: 		{ h: 1, w: 3 }
			},
			animation: {
				frames: 	[0, 1, 2],
				duration: 	100
			}
		},
		initEffect : function(  ){
			return [
				null,
				function( target ){
					target && target.damage( roll( 2, 4 ), "acid" );
					target.addBuff( new game.Buff().initWithName( "acid_dot" ) );
					// target.addBuff( new game.Buff().initWithName( "slow" ) );
					return true;
				}
			];
		}
	},
	
	"Fireball": {
		level: 			3,
		cost: 			30, 
		element: 		"fire",
		school: 		"invocation",
		cooldown: 		5,
		
		travel : {
			interpolator : new CAAT.Behavior.Interpolator( ).createExponentialInInterpolator( 3, false ),
			image: 	{
				name: 		"fireball"
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
				target && target.damage( roll( 4, 6 ), "fire" );
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
	
	"Lightning": {
		level: 			4,
		cost: 			17, 
		cooldown: 		10,
		element: 		"nature",
		school: 		"invocation", 
		
		travel: {
			rotation: 		false,
			duration: 		10,
			image: 	{
				name: 		"empty"
			}
		},
		
		splash : {
			duration: 		280,
			image : {
				name : "lightning",
				frame: { h: 1, w: 3	}
			},
			animation: {
				frames: 	[0, 1, 2, 0],
				duration: 	70
			},
			anchor: { x: 0.5, y: 1 },
			AOE: function( t ){
				return { y:t.y, h:20 };
			}
		},
		
		initEffect : function(  ){
			return [ 
				null, 
				function( target ){
					target && target.damage( roll( 6, 6, 6 ), "nature" );
					return true;
				}
			];
		}
	},
	
	"Finger-of-Death": {
		level: 			5,
		cost: 			1,
		cooldown: 		30,
		element: 		"force",
		school: 		"necromancy", 
		
		travel: {
			duration: 		10,
			image: 	{ name: "empty" }
		},
		splash : {
			duration: 		1200,
			image : { 
				name : "void-sphere", 
				frame: { h: 2, w: 2 },
				animation: {
					frames: 	[ 0, 1, 3, 2 ],
					duration: 	100
				}
			}
		},
		
		initEffect : function(  ){
			return [ 
				null, 
				function( target ){
					if ( !target ) {
						return false
					}
					if ( target.boss ){
						target.damage( 50 );
					} else {
						target.die( false );
					}
					return true;
				}
			];
		}
	},
	"Explosion": {
		cooldown: 		false,
		element: 		"fire",
		
		travel: {
			duration: 		10,
			image: 	{ name: "empty" }
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
				target && target.damage( roll( 4, 6 ), "fire" );
				return true;
			};
			return [ null, fx ];
		}
	}
};
game.spellList = [ "Magic Missile", "Acid Arrow", "Fireball", "Lightning", "Finger-of-Death", "Explosion" ];