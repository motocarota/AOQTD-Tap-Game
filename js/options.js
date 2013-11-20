//OPTIONS

function setupOptions( ) {
	
	window.game = window.game || {};
	
	game.options = {
		tick_mana: 			7,
		global_cooldown :	50,
		volume :			10,
		font :				'50px fof',
		fontAlt : 			'40px md',
		fontBig : 			'70px md',
		levelCap: 			10,
		drop:{
			lifespan : 		100,
			file: 			"items", 
			frameW: 		3, 
			frameH: 		3,
			dest: {
				x: 260, y: 220, w: 640, h: 340
			},
			powerUps: 			[ 'BFG', 'time_stop', 'phoenixPotion', 'greenPotion', 'shield' ],
		},
		
		player: {
			max_level: 			10,
			max_hp: 			100,
			max_mana: 			100
		},
		enemies : {
			bar_width: 		80,
			bar_height: 	3,
			bar_color: 		"#f00",
			baseSpeed : 	10,
			destinations:{
				melee:		{ x:200, y:350, w:50,  h:100 },
				ranged:		{ x:400, y:200, w:300, h:300 },
				healer:		{ x:700, y:200, w:150, h:300 }
			}
		}
	};
}
