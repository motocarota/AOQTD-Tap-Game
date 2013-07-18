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
		font :				"Arial",
		dropChance: 		50,
		player: {
			
		},
		enemies : {
			wave: 			50,
			baseSpeed : 	100
		},
		drop : {
			lifespan : 		80
		}
	};
}
