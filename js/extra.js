
// ================================================================================================================
// 		Projectiles
// ================================================================================================================

window.AI = {

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
		if ( !this.ready ){
			var dest = game.options.enemies.destinations.melee;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
			this.ready = true;
		} else {
			if ( this.cooldown < 1 && !this.moving ) {
				this.attack( this.getDamage() );
			}
		}
	},
	
	rogue: function( ) {
		var dest = game.options.enemies.destinations.ranged;
		if ( !this.initialized ){
			this.initialized = true;
			this.x = 0;
			this.y = HH;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
			this.moveCounter = 0;
		} else {
			if ( !this.moving ) {
				if ( this.moveCounter++ < 4 ) {
					this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
				} else {
					this.move( WW+100, roll( 1, dest.h, dest.y ) );
				}
			}
		}
		if ( this.x > WW ) {
			this.die();
		}
	},
	
	kamikaze: function( ) {
		if ( this.wounds > 0 ) {
			game.player.castSpell( this.x, this.y, 5 ); //explosion
			this.die();
			this.say( 'BOOM' );
		}
		if ( !this.ready ){
			var dest = game.options.enemies.destinations.melee;
			this.move( roll( 1, dest.w, dest.x ), roll( 1, dest.h, dest.y ) );
			this.ready = true;
		} else {
			if ( this.cooldown < 1 && !this.moving ) {
				game.player.castSpell( this.x, this.y, 5 ); //explosion
				this.say( 'BOOM' );
				this.attack( 30 );
				this.die();
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
				var chosenSpell = enemySpellBook[ this.spellsKnown[ id ] ];
				if ( _DEBUG ) CAAT.log( '[Enemies] caster is casting '+chosenSpell.id, chosenSpell );
				chosenSpell.effect( this );
				this.cooldown = this.attackSpeed;
				// game.playSound( 'cast' );
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
				game.summon( this.creatures[ roll( this.creatures ) ], true, 1 );
				this.cooldown = this.attackSpeed;
				// game.playSound( 'cast' );
				this.playAnimation( 'attack' );
			}
		}
	}
};

// ================================================================================================================
// 		Extra Spells
// ================================================================================================================


window.enemySpellBook = {
	'teleport': {
		cd: 20,
		effect: function( en ) {
			var dest = game.options.enemies.destinations.ranged;
			en.x = roll( 1, dest.w, dest.x );
			en.y = roll( 1, dest.h, dest.y );
		}
	}, 
	'fireball': {
		cd: 10,
		effect: function( en ) {
			var p = new CAAT.Projectile( 3 );
			p.setup( en );
			p.add( );
		}
	},
	'fire_bolt': { 
		cd: 2,
		effect: function( en ) {
			var p = new CAAT.Projectile( 5 );
			p.setup( en );
			p.add( );
		}
	},
	'magic_missile': { 
		cd: 5,
		effect: function( en ) {
			var p = new CAAT.Projectile( 2 );
			p.setup( en );
			p.add( );
		}
	},
	'void_sphere': { 
		cd: 25,
		effect: function( en ) {
			var p = new CAAT.Projectile( 4 );
			p.setup( en );
			p.add( );
		}
	},
	'minor_heal':{
		cd: 5,
		effect: function( en ){
			for ( var i=0; i < game.enemies.length; i++ ) {
				if ( game.enemies[i].wounds > 0 ) {
					game.enemies[i].addBuff( new game.Buff().initWithName( 'heal_over_time' ) );
					return;
				}
			};
		}
	},
	'heal': {
		cd: 5,
		effect: function( en ){
			for ( var i=0; i < game.enemies.length; i++ ) {
				if ( game.enemies[i].wounds > 0 ) {
					en.target = game.enemies[i];
					en.target.heal( 50 );
					return;
				}
			};
		}
	},
	'aoe_heal': { 
		cd: 5,
		effect: function( en ) {
			for ( var i=0; i < game.enemies.length; i++ ) {
				game.enemies[i].heal( 5 );
			};
		}
	},
	'empower': { 
		cd: 5,
		effect: function( en ) {
			var e = randomFrom( game.enemies );
			e.addBuff( new game.Buff().initWithName( 'empower' ) );
			// for ( var i=0; i < game.enemies.length; i++ ) {
			// 	game.enemies[i].addBuff( new game.Buff().initWithName( 'empower' ) );
			// };
		}
	},
	'haste': { 
		cd: 20,
		effect: function( en ) {
			en.addBuff( new game.Buff().initWithName( 'haste' ) );
		}
	}
}


// ================================================================================================================
// 		Projectiles
// ================================================================================================================

game.projBook = {
	'rock': {
		speed: 			1.5,
		damage: 		3
	},
	'arrow': {
		speed: 			1.5,
		damage: 		2
	},
	'mmissile':{
		speed: 			2,
		damage: 		3,
		frameW: 		3,
		frameH: 		2
	},
	'fireball':{
		speed: 			2,
		damage: 		12
	},
	'void-sphere':{
		speed: 			0.7,
		damage: 		20,
		frameW: 		2,
		frameH: 		2,
		animation: {
			frames: 	[ 0, 1, 2, 3 ],
			duration: 	100
		}
	},
	'fire_bolt':{
		speed: 			2,
		damage: 		3,
		frameW: 		1,
		frameH: 		2,
		animation: {
			frames: 	[ 0, 1 ],
			duration: 	100
		}
		
	}
};
game.projList = [ 'arrow', 'rock', 'mmissile', 'fireball', 'void-sphere', 'fire_bolt' ];

// ================================================================================================================
// 		Buff / Debuff
// ================================================================================================================

game.buffBook = {
	// BUFF
	'empower': {
		duration: 	10,
		harmful: 	false,
		modDamage: 	10,
		modSpeed: 	0.3,
		effect: function( t ) {
			if ( this.firstTick() ){
				t.say( "Rawr!!" );
				t.setScale( 1.2, 1.2 );
			} 
			else if ( this.lastTick() ){
				t.setScale( 1, 1 );
			}
		}
	},
	'heal_over_time': {
		duration: 	20,
		harmful: 	false,
		effect: function( t ) {
			if ( this.getDurationLeft() % 3 === 0 ) {
				t && t.heal( 5 );
			}
		}
	},
	'haste': {
		duration: 	10,
		harmful: 	false,
		modSpeed: 	1.9
	},
	
	// DEBUFF
	'acid_dot': {
		duration: 	15,
		harmful: 	true,
		modSpeed: 	0.2,
		effect: function( t ) {
			if ( this.getDurationLeft() % 3 === 0 ) {
				t && t.damage( roll( 2, 4 ), 'acid' );
			}
		}
	},
	'slow': {
		duration: 	5,
		harmful: 	true,
		modSpeed: 	0.2
	}
};