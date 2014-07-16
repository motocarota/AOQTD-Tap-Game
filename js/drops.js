game.dropList = [ 'manaPotion', 'scroll', 'wand' ];
game.dropTable = {
	scroll : {
		type: 			"scroll",
		imageId: 		3,
		effect : 		function() { 			
			game.player.notify( 'You get a magic scroll' );
			game.player.addItem( {
				imageId: 3,
				charges: 1,
				spellId: roll( 1, 3 )
			} );
			game.player.notify( game.spellList[ this.spellId ] );
			spellIndex = 'item';
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
				spellId: roll( 0, 3 )
			} );
			game.player.notify( game.spellList[ this.spellId ] );
			spellIndex = 'item';
		}
	},
	manaPotion: {
		type: 			"manaPotion",
		imageId: 		2,
		effect : 		function() {
			game.player.notify( 'You get a Mana Potion' );
			game.player.addMana( 40 );
		}
	}
};