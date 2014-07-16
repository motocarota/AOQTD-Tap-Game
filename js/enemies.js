game.enemiesList = [ "kobold", "troll", "orc", "goblin", "necromancer", "shaman", "zombie" ];
game.summonsList = [ "elem_air", "elem_fire", "elem_earth", "elem_water", "skeleton", "ghost" ];
game.enemiesBook = {
	
	kobold: {
		ai: AI.melee,
		level: 1,
		speed: 0.6,
		frameW: 3, 
		frameH: 3,
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
	goblin: {
		level: 1,
		speed: 0.8,
		frameH: 2,
		frameW: 3,
		attackSpeed: 2,
		dropTable: [
			{ chance: 5, id: "wand", qty: 1 },
			{ chance: 5, id: "scroll", qty: 1 },
			{ chance: 5, id: "lifePotion", qty: 1 },
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
		role: "ranged",
		projectile: 1,
		ai: AI.ranged
	},
	orc: {
		ai: AI.melee,
		level: 5,
		speed: 0.6,
		frameW: 3, frameH: 3,
		dropTable: [
			{ chance: 10, id: "lifePotion", qty: 1 },
			{ chance: 5, id: "manaPotion", qty: 1 }
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
	troll: {
		ai: AI.melee,
		level: 9,
		speed: 0.7,
		frameW: 3, 
		frameH: 3,
		regeneration: 5,
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
	shaman: {
		level:  4,
		speed: .5,
		ai: AI.caster,
		spellsKnown: [ "minor_heal", "aoe_heal", "magic_missile" ]
	},
	elem_fire: {
		ai: AI.melee,
		level: 2,
		speed: .84,
		attackSpeed: 2,
		frameW: 2, frameH: 2,
		getDamage: function(){ return roll( 1, 3 ) },
		dropTable: [
			{ chance: 10, id: "manaPotion", qty: 1 }
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
			if ( source === "force" ){
				amount = amount * 2;
			} else if ( source === "fire" ) {
				amount = Math.floor( amount * 0.5 ) || 1;
			}
			return amount;
		}
	},
	elem_earth: {
		ai: AI.melee,
		level: 2,
		speed: .84,
		frameW: 3, frameH: 2,
		dropTable: [
			{ chance: 10, id: "manaPotion", qty: 1 }
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
			if ( source === "acid" ){
				amount = amount * 2;
			} else if ( source === "force" ) {
				amount = Math.floor( amount * 0.5 ) || 1;
			}
			return amount;
		}
	},
	elem_air: {
		ai: AI.melee,
		level: 2,
		speed: .84,
		frameW: 3, frameH: 2,
		dropTable: [
			{ chance: 10, id: "manaPotion", qty: 1 }
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
			if ( source === "fire" ){
				amount = amount * 2;
			} else if ( source === "electricity" ) {
				amount = Math.floor( amount * 0.5 ) || 1;
			}
			return amount;
		}
	},
	elem_water: {
		ai: AI.melee,
		level: 2,
		speed: .84,
		frameW: 3, frameH: 2,
		element: "acid",
		dropTable: [
			{ chance: 10, id: "manaPotion", qty: 1 }
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
			if ( source === "electricity" ){
				amount = amount * 2;
			} else if ( source === "acid" ) {
				amount = Math.floor( amount * 0.5 ) || 1;
			}
			return amount;
		}
	},
	zombie:{
		level: 9,
		speed: 1.3,
		boss: true,
		ai: AI.kamikaze
	},
	necromancer:{
		level: 7,
		speed: 0.9,
		frameW: 4, frameH: 1,
		ai: AI.summoner,
		summons: [ "skeleton", "zombie", "ghost", "elem_air", "elem_fire", "elem_earth", "elem_water" ],
		animations: {
			walk: {
			 frames: [0,1], duration: 300
			},
			attack: {
			 frames: [2,3,2,3], duration: 250
			}
		}
	},
	skeleton: {
		ai: AI.melee,
		level:  5,
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
		},
		damageFilter: function( amount, source ) {
			return ( amount - 2 ) || 1;
		}
	},
	ghost: {
		level: 2,
		speed: .6,
		frameH: 2,
		frameW: 3,
		attackSpeed: 12,
		dropTable: [
			{ chance: 5, id: "manaPotion", qty: 1 }
		],
		animations: {
			attack: {
			 frames: [3, 4, 4, 5, 3], duration: 150
			},
			stand: {
				frames: [0, 1, 2], duration: 200
			}
		},
		damageFilter: function( amount, source ) {
			if ( source !== "force" ){
				amount = parseInt( ( amount * 0.1 ).toFixed( 0 ) ) || 1;
			}
			return amount;
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
	}
};