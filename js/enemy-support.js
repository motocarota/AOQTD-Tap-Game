
// ========================================================
// Projectiles
// ========================================================

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
			if ( this.cooldown < 1 && !this.moving )
				this.attack( this.getDamage() );
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
				game.summon( this.creatures[ roll( this.creatures ) ] );
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
					if ( game.enemies[i].wounds > 0 ) {
						this.target = game.enemies[i];
						this.target.heal( 12 );
						this.cooldown = this.attackSpeed;
						this.playAnimation( 'attack' );
						return;
					}
				};
			}
		}
	}
};

// ========================================================
// Enemy Spells
// ========================================================


window.enemySpellBook = {
	'teleport':{
		cd: 20,
		effect: function( en ) {
			// game.playSound( 'teleport' );
			var dest = game.options.enemies.destinations.ranged;
			en.x = roll( 1, dest.w, dest.x );
			en.y = roll( 1, dest.h, dest.y );
		}
	}, 
	'fireball':{
		cd: 10,
		effect: function( en ) {
			// game.playSound( 'cast' );
			var p = new CAAT.Projectile( 3 );
			p.setup( en );
			p.add( );
		}
	},
	'magic_missile':{ 
		cd: 5,
		effect: function( en ) {
			// game.playSound( 'cast' );
			var p = new CAAT.Projectile( 2 );
			p.setup( en );
			p.add( );
		}
	},
	'void_sphere':{ 
		cd: 25,
		effect: function( en ) {
			// game.playSound( 'cast' );
			var p = new CAAT.Projectile( 4 );
			p.setup( en );
			p.add( );
		}
	},
	'rock':{
		cd: 2,
		effect: function( en ) {
			// game.playSound( 'cast' );
			var p = new CAAT.Projectile( 1 );
			p.setup( en );
			p.add( );
		}
	}
}

// ========================================================
// Projectiles
// ========================================================

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
		frameH: 		2
	}
};
game.projList = [ 'arrow', 'rock', 'mmissile', 'fireball', 'void-sphere' ];