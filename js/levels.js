(function(){

	game.levels = [
		
		{
			bg: 	null,
			music: 	null,
			waves: 	[ ]
		},
		{
			bg: 	null,
			music: 	null,
			spawnRate: 0.3,
			waves : {
				 5: { n:  2, list:[ 'shadow' ] }, 			// da subito crea 2 shadow
				10: { n: 12, list:[ 'kobold', 'troll' ] }, 	// al 10-imo tick crea 12 nemici tra kobold e orc
				25: { list:[ 'troll' ] }					// al 25-esimo tick crea un troll
			}
		}
	];
	
})()

