game.dropList = [ 'lifePotion', 'manaPotion', 'scroll', 'wand', 'coins' ];
game.dropTable = {

	coins : {
		imageId: 5,
		effect : function(){ 
			var amount = roll( this.level, 6, 1 );
			game.player.notify( 'You Loot '+amount+' gold coins' );
			game.player.gold+= amount; 
		}
	},
	
	scroll : {
		
		type: 			"scroll",
		imageId: 		3,
		spellId : 		0,
		charges : 		1,
		level : 		roll( 1, this.level ),
		effect : 		function(){ 			
			this.spellId = roll( 1, game.spellList.length )-1;
			game.player.item = this;
			game.player.notify( 'You Loot a Scroll of '+game.spellList[ this.spellId ] );
		}
	},
	
	wand : {
		type: 			"wand",
		imageId: 		4,
		spellId : 		0,
		charges : 		5,
		level : 		roll( 1, this.level ),
		effect : 		function(){ 
			this.spellId = roll( 1, game.spellList.length )-1;			
			game.player.item = this;
			game.player.notify( 'You Loot a Wand of '+game.spellList[ this.spellId ]+' charges:'+this.charges );
		}
	},

	lifePotion : {
		type: 			"lifePotion",
		imageId: 		1,
		amount: 		roll( 2, 8, 5 ),
		effect: 		function(){ 
			game.player.notify( 'You loot a Health Potion' );
			game.player.heal( this.amount ); 
		}
	},
	
	manaPotion: {
		type: 			"manaPotion",
		imageId: 		2,
		effect: function(){ 
			game.player.notify( 'You loot a Mana Potion' );
			game.player.mana += 25; 
		}
	}
};