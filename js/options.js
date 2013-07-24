//OPTIONS
// This file contains important game options to tweak game balance

function setupOptions( ) {
	
	window.game = window.game || {};
	
	game.options = {
		max_hp: 			100,
		max_mana: 			100,
		tick_mana: 			4,
		global_cooldown :	40,
		volume :			10,
		font :				'50px fof',
		fontAlt : 			'40px md',
		fontBig : 			'70px md',
			
		dropChance: 		50,
		player: {
			
		},
		enemies : {
			wave: 			20,
			baseSpeed : 	100,
			maxNumber : 	10,
			spawnRate : 	0.3
		},
		drop : {
			lifespan : 		80
		}
	};
}
