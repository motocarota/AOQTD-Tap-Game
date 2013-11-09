game.enemiesList = [];

game.enemiesBook = {
	
	kobold: {
		ai: AI.melee,
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
		ai: AI.melee,
		level: 7,
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
	zombie: {
		ai: AI.melee,
		level:  5,
		speed: .3
	},
	skeleton: {
		ai: AI.melee,
		level:  3,
		speed: .8,
		frameH: 2,
		frameW: 3,
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
		ai: AI.summoner,
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
		}
	},
	elem_fire: {
		ai: AI.melee,
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
		ai: AI.melee,
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
		ai: AI.melee,
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
		ai: AI.melee,
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
		ai: AI.melee,
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
			{ chance: 5, id: 'wand', qty: 1 },
			{ chance: 5, id: 'scroll', qty: 1 },
			{ chance: 5, id: 'lifePotion', qty: 1 },
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
		level: 3,
		ai: AI.healer
	},
	giant:{
		level: 8,
		ai: AI.ranged,
		projectile: 2
	},
	iron_golem:{
		level: 10,
		ai: AI.melee
	},
	clay_golem:{
		level: 10,
		ai: AI.melee
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
	ogre_magi:{
		level: 5,
		ai: AI.caster,
		spellsKnown: [ 'fireball', 'magic_missile', 'rock' ]
	},
	rakshaaza:{
		level: 10,
		ai: AI.caster,
		spellsKnown: [ 'teleport', 'fireball', 'magic_missile' ]
	}
};