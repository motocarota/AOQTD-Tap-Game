game.dropList = [ 'lifePotion', 'manaPotion', 'scroll', 'wand', 'phoenixPotion', 'BFG' ];
game.dropTable = {
	scroll : {
		type: 			"scroll",
		imageId: 		3,
		effect : 		function() { 			
							game.player.notify( 'You get a magic scroll' );
							game.player.addItem( {
								imageId: 3,
								charges: 1,
								spellId: roll( 1, 3 ),
								use: function() {
									game.player.notify( game.spellList[ this.spellId ] );
									spellIndex = 'item';
								}
							} );
						}
	},
	wand : {
		type: 			"wand",
		imageId: 		4,
		effect : 		function() { 			
							game.player.notify( 'You get a magic wand' );
							game.player.addItem( {
								imageId: 4,
								charges: 5,
								spellId: roll( 0, 3 ),
								use: function() {
									game.player.notify( game.spellList[ this.spellId ] );
									spellIndex = 'item';
								}
							} );
						}
	},
	lifePotion : {
		type: 			"lifePotion",
		imageId: 		1,
		effect : 		function() {
			game.player.notify( 'You get a Life Potion' );
			game.player.heal( 20 );
		}
	},
	manaPotion: {
		type: 			"manaPotion",
		imageId: 		2,
		effect : 		function() {
			game.player.notify( 'You get a Mana Potion' );
			game.player.addMana( 40 );
		}
	},
	phoenixPotion : {
		type: 			"phoenixPotion",
		imageId: 		0,
		effect : 		function() {
			game.player.notify( 'You get a Phoenix Potion' );
			game.player.heal( 100 );
			game.player.addMana( 100 );
		}
	},
	BFG : {
		type: 			"BFG",
		imageId: 		5,
		effect : 		function() {
			game.player.notify( 'Armageddon!!!' );
			game.wipe( true );
		}
	},
	greenPotion : {
		type: 			"Green Potion",
		imageId: 		6,
		effect : 		function() {
			//TODO aumenta rigenerazione
		}
	},
	shield : {
		type: 			"Shield",
		imageId: 		7,
		effect : 		function() {
			//TODO mette uno scudo
		}
	},
	time_stop : {
		type: 			"Time Stop",
		imageId: 		8,
		effect : 		function() { 
			//TODO rallentare tutti i nemici
			// per qualche motivo anche i melee si comportano come ranged se subiscono il debuff al movimento
			// for ( e in game.enemies ) {
			// 	game.enemies[ e ].addBuff( new game.Buff().initWithName( 'slow' ) );
			// }
		}
	}
};