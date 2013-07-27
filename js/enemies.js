// game.enemiesList = [ 'bat', 'kobold', 'wolf', 'zombie', 'dragon' ];
// enemies list verra' popolato a seconda del livello

game.enemiesTable = [
	null,
	[ 'kobold' ],
	[ 'troll' ],
	[ 'gel_cube' ],
	[ 'shadow' ],
	[ 'kobold', 'troll' ],
	[ 'kobold', 'troll', 'gel_cube', 'shadow' ],
	[ 'dragon' ] 
];
game.enemiesList = [];

game.enemiesBook = {
	
	kobold: {
		level: 1,
		speed: 0.8,
		frameW: 3, 
		frameH: 3,
		dropTable: [
			{ chance: 50, id: 'xp', qty: (roll()) },
			{ chance: 50, id: 'coins', qty: (roll()) },
			{ chance: 10, id: 'wand', qty: 1 }
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
			{ chance: 50, id: 'bigXp', qty: (roll()) }
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
	
	gel_cube: {
		level:  3,
		speed: .3,
		frameW: 2,
		animations: {
			walk: {
				frames: [0,1], duration: 400
			}
		},		
		ai: function(){
			game.player.notifyAt("hahaha", this);
			this.move( 500, 300 );
		}
	},
	
	shadow: {
		level:  2,
		speed: .45,
		frameW: 3, frameH: 2,
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
	
	zombie: {
		level: 5,
		speed: .3,
		frames: 12
	},
	
	dragon: {
		element: "fire",
		level: 8,
		speed: .9,
		damageFilter: function( amount, source ) {
			var c = amount;
			if ( this.element === source )
				c = Math.floor( amount * 0.7 );
			return c;
		}
    }
};