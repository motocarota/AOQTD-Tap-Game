var AI = {

	ranged: function( ) {
	
		if ( this.cooldown > 0 && !this.moving  ) {
			var dest = game.options.enemies.destinations.ranged;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
		} else {
			if ( this.moving ) {
				return;
			}
			if ( this.cooldown <= 0 ) {
				this.cooldown = this.attackSpeed;
				var p = new CAAT.Projectile( this.projectile );
				p.setup( this );
				p.add( );
				this.playAnimation( 'attack' );
			}
		}
	},
	
	melee: function( ) {
	
		if ( this.cooldown > 0 && !this.moving  ) {
			var dest = game.options.enemies.destinations.melee;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
		} else {
			if ( this.moving ) {
				this.halt( );
			}
			if ( this.cooldown <= 0 ) {
				this.cooldown = this.attackSpeed;
				var p = new CAAT.Projectile( this.projectile );
				p.setup( this );
				p.add( );
				this.playAnimation( 'attack' );
			}
		}
	},
	
	caster: function( ) {
	
		if ( this.cooldown > 0 && !this.moving  ) {
			var dest = game.options.enemies.destinations.ranged;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
		} else {
			if ( this.moving ) {
				return;
			}
			if ( this.cooldown <= 0 ) {
				var id = roll( this.spellsKnown );
				var chosenSpell = this.spellsKnown[ id ];
				if ( _DEBUG ) CAAT.log( '[Enemies] caster is casting '+chosenSpell.id, chosenSpell );
				chosenSpell.effect( this );
				this.cooldown = this.attackSpeed;
				this.playAnimation( 'attack' );
			}
		}
	},
	
	summoner: function( ) {
	
		if ( this.cooldown > 0 && !this.moving  ) {
			var dest = game.options.enemies.destinations.ranged;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
		} else {
			if ( this.moving ) {
				return;
			}
			if ( this.cooldown <= 0 ) {
				game.summon( 'skeleton' );
				this.say( 'summon' );
				this.cooldown = this.attackSpeed;
				this.playAnimation( 'attack' );
			}
		}
	},
	
	healer: function( ) {
	
		if ( this.cooldown > 0 && !this.moving  ) {
			var dest = game.options.enemies.destinations.healer;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
		} else {
			if ( this.moving ) {
				return;
			}
			if ( this.cooldown <= 0 ) {
				for (var i=0; i < game.enemies.length; i++) {
					var amount = ( game.enemies[i].wounds / 2 ).toFixed( 0 );
					if ( amount > 0 ) {
						this.target = game.enemies[i];
						this.target.say( "+"+amount, "green" );
						this.target.wounds = amount;
						this.cooldown = this.attackSpeed;
						this.playAnimation( 'attack' );
						return;
					}
				};
			}
		}
	}
};

game.enemiesList = [];

game.enemiesBook = {
	
	kobold: {
		level: 1,
		speed: 0.6,
		frameW: 3, 
		frameH: 3,
		dropTable: [
			{ chance: 100, id: 'smallXp', qty:1 },
			{ chance: 10, id: 'lifePotion', qty: 1 },
			{ chance: 15, id: 'manaPotion', qty: 1 }
		],
		animations: {
			walk: {
				frames: [2,2,3,4,4,3], duration: 200
			},
			stand: {
				frames: [0,1], duration: 200
			},
			attack: {
				frames: [5,6,7,8,6,5], duration: 150
			}
		}
	},
	
	troll: {
		level: 5,
		speed: 0.7,
		frameW: 3, 
		frameH: 3,
		dropTable: [
			{ chance: 100, id: 'xp', qty:3 },
			{ chance: 5, id: 'manaPotion', qty: 1 }
		],
		animations: {
			walk: {
				frames: [2,2,0,3,3,1], duration: 200
			},
			stand: {
				frames: [0,1], duration: 200
			},
			attack: {
				frames: [4, 5, 6], duration: 150
			}
		}
	},
	
	skeleton: {
		level:  3,
		speed: .8,
		frameH: 2,
		frameW: 3,
		dropTable: [
			{ chance: 100, id: 'smallXp', qty: 1 },
			{ chance: 5, id: 'lifePotion', qty: 1 },
			{ chance: 5, id: 'manaPotion', qty: 1 }
		],
		animations: {
			stand: {
				frames: [0,1], duration: 400
			},
			walk: {
				frames: [2,2,3,4,4,3], duration: 150
			},
			attack: {
				frames: [2,5,4,3], duration: 200
			}
		}
	},
	
	shadow: {
		level:  2,
		speed: .45,
		frameW: 3, frameH: 2,
		summons: [ 'elem_air', 'elem_fire', 'elem_earth', 'elem_water' ],
		animations: {
			walk: {
				frames: [0,1,2,1], duration: 400
			},
			attack: {
				frames: [3, 1, 4], duration: 150
			},
			stand: {
				frames: [0], duration: 200
			}
		},
		
		ai: function() {
			var t = ( this.time / 1000 ).toFixed( 0 );
			if ( t % 4 === 0 ) { //ogni 4 sec
				game.player.notifyAt( t, { x: 500, y:500 } )
				if ( this.moving ) {
					this.halt( );
				}
				if ( this.cooldown <= 0 ) {
					game.summon( this.summons, { qty:roll(), extra:true } );
				}
			} else {
				if ( !this.moving ) {
					this.move( roll( 1, 100, 400 ) , roll( 1, 500, 100 )  );
				}
				
			}   
		}
	},
	
	elem_fire: {
		level: 5,
		speed: .84,
		attackSpeed: 2,
		frameW: 2, frameH: 2,
		element: 'fire',
		getDamage: function(){ return roll( 1, 3 ) },
		dropTable: [
			{ chance: 50, id: 'xp', qty:1 },
			{ chance: 10, id: 'manaPotion', qty: 1 }
		],
		animations: {
			walk: {
				frames: [1,3,0,2], duration: 200
			},
			stand: {
				frames: [0, 1], duration: 200
			}
		},
		damageFilter: function( amount, source ) {
			if ( this.element === source ){
				amount = ( amount * 0.5 ).toFixed( 0 );
			}
			return amount;
		}
	},
	
	elem_earth: {
		level: 5,
		speed: .84,
		frameW: 3, frameH: 2,
		element: 'physical',
		dropTable: [
			{ chance: 50, id: 'xp', qty:1 },
			{ chance: 10, id: 'manaPotion', qty: 1 }
		],
		animations: {
			attack: {
				frames: [0,1,4,4,1], duration: 100
			},
			walk: {
				frames: [1,2,3,0], duration: 400
			},
			stand: {
				frames: [0], duration: 200
			}
		},
		damageFilter: function( amount, source ) {
			if ( this.element === source ){
				amount = ( amount * 0.5 ).toFixed( 0 );
			}
			return amount;
		}
	},
	
	elem_air: {
		level: 5,
		speed: .84,
		frameW: 3, frameH: 2,
		element: 'electricity',
		dropTable: [
			{ chance: 50, id: 'xp', qty:1 },
			{ chance: 10, id: 'manaPotion', qty: 1 }
		],
		animations: {
			attack: {
				frames: [3,4], duration: 200
			},
			walk: {
				frames: [0,1,2,1], duration: 200
			},
			stand: {
				frames: [0,1,2,1], duration: 200
			}
		},
		damageFilter: function( amount, source ) {
			if ( this.element === source ){
				amount = ( amount * 0.5 ).toFixed( 0 );
			}
			return amount;
		}
	},
	
	elem_water: {
		level: 5,
		speed: .84,
		frameW: 3, frameH: 2,
		element: 'water',
		dropTable: [
			{ chance: 50, id: 'xp', qty:1 },
			{ chance: 10, id: 'manaPotion', qty: 1 }
		],
		animations: {
			attack: {
				frames: [2,3,4,5], duration: 200
			},
			walk: {
				frames: [0,1], duration: 200
			},
			stand: {
				frames: [0,1], duration: 200
			}
		},
		damageFilter: function( amount, source ) {
			if ( this.element === source ){
				amount = ( amount * 0.5 ).toFixed( 0 );
			}
			return amount;
		}
	},
	
	orc: {
		level: 4,
		speed: .6,
		frameW: 3, frameH: 3,
		dropTable: [
			{ chance: 50, id: 'xp', qty:1 },
			{ chance: 10, id: 'lifePotion', qty: 1 },
			{ chance: 5, id: 'manaPotion', qty: 1 }
		],
		animations: {
			walk: {
				frames: [3, 4, 5, 4], duration: 300
			},
			attack: {
				frames: [6, 7, 8], duration: 150
			},
			stand: {
				frames: [0, 1, 2, 1], duration: 200
			}
		}
	},

	goblin: {
		level: 2,
		speed: .6,
		frameH: 2,
		frameW: 3,
		attackSpeed: 2,
		dropTable: [
			{ chance: 50, id: 'xp', qty:1 },
			{ chance: 10, id: 'lifePotion', qty: 1 },
			{ chance: 5, id: 'manaPotion', qty: 1 }
		],
		animations: {
			walk: {
			 frames: [0,2,1,3], duration: 200
			},
			attack: {
			 frames: [4, 5, 2], duration: 150
			},
			stand: {
				frames: [0, 1], duration: 200
			}
		},
		role: 'ranged',
		projectile: 1,
		ai: AI.ranged
	},
	
	necromancer:{
		level: 3,
		ai: AI.summoner,
		creatures: [ "skeleton" ]
	},
	duergar:{
		level: 2,
		ai: AI.healer
	},
	giant:{
		level: 8,
		ai: AI.ranged,
		projectile: 2
	},
	iron_golem:{
		level: 10
	},
	clay_golem:{
		level: 10
	},
	ghost: {
		level: 5,
		speed: .6,
		frameH: 2,
		frameW: 3,
		attackSpeed: 12,
		dropTable: [
			{ chance: 100, id: 'xp', qty:2 },
			{ chance: 5, id: 'manaPotion', qty: 1 }
		],
		animations: {
			attack: {
			 frames: [3, 4, 4, 5, 3], duration: 150
			},
			stand: {
				frames: [0, 1, 2], duration: 200
			}
		},
		ai: function() {
			
			if ( this.cooldown-- > 0 && roll() > 3 ) {
				if ( !this.moving ) {
					this.move( roll( 1, 100, 400 ) , roll( 1, 500, 100 )  );
				}
			} else {
				if ( this.moving ) {
					this.halt( );
				}
				if ( this.cooldown <= 0 ) {
					this.attack( );
				}
			}
			
		}
	},
	rakshaaza:{
		level: 10,
		ai: AI.caster,
		spellsKnown: [
			{
				id: 'teleport',
				cd: 20,
				effect: function( en ) {
					// game.playSound( 'teleport' );
					en.x = roll( 0, WW );
					en.y = roll( 0, HH );
				}
			}, 
			{
				id: 'fireball',
				cd: 10,
				effect: function( en ) {
					// game.playSound( 'cast' );
					var p = new CAAT.Projectile( 3 );
					p.setup( en );
					p.add( );
				}
			},
			{ id:'bluff', cd:2, effect:function( en ){ en.say( 'abracadabra' ) } }
		]
	}
};