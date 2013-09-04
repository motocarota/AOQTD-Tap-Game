// game.enemiesList = [ 'bat', 'kobold', 'wolf', 'zombie', 'dragon' ];
// enemies list verra' popolato a seconda del livello

//TODO rifare/spostare/eliminare sta tabella
game.enemiesTable = [
	null,
	[ 'kobold' ],
	[ 'troll' ],
	[ 'gel_cube' ],
	[ 'shadow' ],
	[ 'kobold', 'troll' ],
	[ 'kobold', 'troll', 'gel_cube', 'shadow' ],
	[ 'orc' ] 
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
	
	skeletor: {
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
        // },       
        // ai: function(){
        //  
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
	
	elem_fire: {    //TODO aumentare attack speed, ridurre i danni
		level: 5,
		speed: .84,
		attackSpeed: 2,
		frameW: 2, frameH: 2,
		animations: {
			walk: {
				frames: [1,3,0,2], duration: 200
			},
			stand: {
				frames: [0, 1], duration: 200
			}
		}
	},
	
	elem_earth: {
		level: 5,
		speed: .84,
		frameW: 3, frameH: 2,
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
		}
	},
	
	elem_air: {
		level: 5,
		speed: .84,
		frameW: 3, frameH: 2,
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
		}
	},
	
	elem_water: {
		level: 5,
		speed: .84,
		frameW: 3, frameH: 2,
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
		}
	},
	
	orc: {
		level: 3,
		speed: .6,
		frameW: 3, frameH: 3,
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
		},
		damageFilter: function( amount, source ) {
			var c = amount;
			if ( this.element === source )
				c = Math.floor( amount * 0.7 );
			return c;
		}
	},

	goblin: {
		level: 2,
		speed: .6,
		frameH: 2,
		frameW: 3,
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
                    game.player.notifyAt( "shoot", this );
    				this.attack( );
				}
            }
            
		}
	},
};