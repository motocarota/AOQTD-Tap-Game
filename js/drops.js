game.dropList = [ 'lifePotion', 'manaPotion', 'scroll', 'wand', 'coins' ];
game.dropTable = {

	coins : {
		
		amount : roll( this.level, 6, 1 ),
		effect : function(){ 
			game.player.notify('You Loot '+this.amount+' gold coins');
			game.player.money+= this.amount; 
		}
	},
	
	scroll : {
		
		type: 			"scroll",
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
		amount: 		roll( 2, 8, 5 ),
		effect: 		function(){ 
			game.player.notify( 'You loot a Health Potion' );
			game.player.heal( this.amount ); 
		}
	},
	
	manaPotion: {
		effect: function(){ 
			game.player.notify( 'You loot a Mana Potion' );
			game.player.mana += 25; 
		}
	}
};