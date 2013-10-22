(function(){ 
//note:
/*
	il secondo livello e' troppo lungo, rimani sempre senza mana
*/
	game.waves = [
		null,
		[ { goblin:30 }, { kobold:1,goblin:3 }], //, { kobold:3 }, { kobold:3,goblin:2,orc:1 }, { kobold:6,goblin:2,orc:3 }, { troll:1 }, { orc:2 }, { orc:10,kobold:10 }, { orc:10,goblin:2 }, { troll:3 } ],
		[ { skeleton:5 }, { goblin:3,skeleton:5 }], //, { skeleton:10 }, { skeleton:7, troll:2 }, { goblin:3 }, { goblin:7,orc:5,skeleton:5 }, {skeleton:5,orc:3,troll:2,elem_fire:1}, {elem_fire:3,troll:2},{elem_fire:10},{troll:5,goblin:5,skeleton:5,elem_fire:5} ],
		[ { kobold:1 } ],
		[ { troll:1 }, { troll:2 }, { troll:3 } ],
		[ { shadow:1 }, { shadow:2 }, { shadow:3 } ],
		[ { goblin:7 } ],
		[ { kobold:5 }, { orc:4 }, { troll:3 }, { shadow:2 } ]
	];
	
})()