game.dropList = [ 'xp', 'lifePotion', 'manaPotion', 'scroll', 'wand', 'coins' ];
game.dropTable = {

	// smallXp : {
	// 	imageId: 0,
	// 	effect : function(){ 
	// 		var amt = 5*roll( 1, 3 );
	// 		game.player.notify( 'You gain '+amt+' xp' );
	// 		game.player.xp+= amt;
	// 		game.player.addMana( 5 );
	// 	}
	// },
	// xp : {
	// 	imageId: 0,
	// 	effect : function(){ 
	// 		var amt = 5*roll( 1, 6 );
	// 		game.player.notify( 'You gain '+amt+' xp' );
	// 		game.player.xp+= amt;
	// 		game.player.addMana( 7 );
	// 	}
	// },
	// bigXp : {
	// 	imageId: 0,
	// 	effect : function(){ 
	// 		var amt = 10*roll( 2, 5 );
	// 		game.player.notify( 'You gain '+amt+' xp' );
	// 		game.player.xp+= amt;
	// 		game.player.addMana( 10 );
	// 	}
	// },
	// coins : {
	// 	imageId: 5,
	// 	effect : function(){ 
	// 		var amount = roll( this.level, 6, 1 );
	// 		game.player.notify( 'You get '+amount+' gold coins' );
	// 		game.player.gold+= amount; 
	// 	}
	// },
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
		imageId: 		1,
		effect : 		function() {
			game.player.notify( 'You get a Phoenix Potion' );
			game.player.heal( 100 );
			game.player.addMana( 100 );
		}
	},
	BFG : {
		type: 			"BFG",
		imageId: 		1,
		effect : 		function() {
							game.player.notify( 'Armageddon!!!' );
							game.player.addItem( {
								imageId: 1,
								use: function() {
									for (var i = game.enemies.length - 1; i >= 0; i--){
										game.enemies[i].die( false );
									};
								}
							} );
						}
	},
	regenPotion : {
		type: 			"regen-potion",
		imageId: 		1,
		effect : 		function() {
							game.player.notify( 'You drink a regeneration potion' );
							game.player.addItem( {
								imageId: 1,
								use: function() {
									var c = new Buff();
									game.player.addBuff( c );
								}
							} );
						}
	}
};