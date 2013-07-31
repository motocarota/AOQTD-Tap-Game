//OPTIONS
// This file contains important game options to tweak game balance

function setupOptions( ) {
	
	window.game = window.game || {};
	
	game.options = {
		tick_mana: 			4,
		global_cooldown :	40,
		volume :			10,
		font :				'50px fof',
		fontAlt : 			'40px md',
		fontBig : 			'70px md',
			
		dropChance: 		50,
		player: {
			max_level: 			10,
			max_hp: 			100,
			max_mana: 			100
		},
		enemies : {
			baseSpeed : 	100
		},
		drop : {
			lifespan : 		80
		}
	};
}
