// game.enemiesList = [ 'bat', 'kobold', 'wolf', 'zombie', 'dragon' ];
// enemies list verra' popolato a seconda del livello
game.enemiesList = [ 'kobold' ];
game.enemiesBook = {
	
	kobold: {
		level: 1,
		speed: 0.8,
		frameW: 3, 
		frameH: 3,
		dropTable: [
			{ chance: 50, id: 'coins', qty: 4 }
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
		},
		damageFilter: function( amount ) {
			return amount * 2;
		}
	},
	
	bat: {
		level: 1,
		speed: .3
	},
	
	wolf: {
		level: 2,
		speed: .3
	},
	
	zombie: {
		level: 5,
		speed: .3,
		frames: 12
	},
	
	dragon: {
		element: "fire",
		level: 8,
		speed: .7,
		damageFilter: function( amount, source ) {
			var c = amount;
			if ( this.element === source )
				c = Math.floor( amount * 0.7 );
			return c;
		}
    }
};