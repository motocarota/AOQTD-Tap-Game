(function(){ 
/*
				Easy			Medium			Hard			Boss
	-----------------------------------------------------------------
	Melee		coboldo			orco			troll			
				elem			scheletro		golem
								zombie			
	Ranged		goblin			drow			giant			
	Caster		imp				dragonkind		rakshaaza		
	Healer		duergar			-				-				
	Summoner	necromancer		vampiro			-
	
*/
	game.waves = [
		null, 
		// [ { goblin:30 } ], //test only
		[ { goblin:1 }, { rakshaaza:1 }, { necromancer:1 }, { duergar:1, troll:1 }, { giant:1 }, { iron_golem:1 }, { clay_golem:1 } ],
		[ // 1 Campagna - Sloth (1...3) : [ coboldi, goblin, orchi, troll ] 4/4 ---> ranged( goblin )
			{ kobold:4 }, 
			{ kobold:3, goblin:3 }, 
			{ kobold:3 }, 
			{ kobold:3, goblin:2, orc:1 }, 
			{ kobold:6, goblin:2, orc:3 }, 
			{ troll:1 }, 
			{ orc:2 }, 
			{ orc:10, kobold:10 }, 
			{ orc:10, goblin:2 }, 
			{ troll:1, goblin:1, orc:1 },
			{ troll:2 }
		],
		[ // 2 Deserto - Greed (2...4) : [ goblin, scheletri, troll, orchi, el.fuoco ] 5/6  ---> summoner( necromancer )
			{ skeleton:5 }, 
			{ goblin:3, skeleton:5 }, 
			{ skeleton:10 }, 
			{ skeleton:7, goblin:1 }, 
			{ necromancer:1, goblin:2 }, 
			{ goblin:3, orc:5, skeleton:5 }, 
			{ skeleton:5, orc:3, troll:1, elem_fire:2 }, 
			{ elem_fire:7 },
			{ troll:3, goblin:3, skeleton:3, necromancer:2 } 
		],
		[ // 3 Foresta - Gluttony (3...5) : [ goblin, troll, el.terra, el.fuoco, minotauro,summoner ] 4/5 ---> healer( duergar )
			{ goblin:10 }, 
			{ goblin:5 }, 
			{ elem_earth:5 }, 
			{ elem_earth:7, duergar:1 }, 
			{ goblin:3 }, 
			{ troll:1, duergar:1 }, 
			{ goblin:1, elem_earth:2 }, 
			{ troll:1, elem_earth:7, goblin:2 }, 
			{ goblin:1, elem_earth:2 }, 
			{ duergar:3, troll:1 }, 
			{ troll:2, goblin:2 }, 
			{ duergar:2, troll:1, elem_earth:2, goblin:2 } 
		],
		[ // 4 Neve - Lust (4...6) : [ orchi, el.acqua, scheletro, gigante gelo ] 3/4  ---> caster( imp )
			{ orc:5 }, 
			{ orc:5, duergar:2, elem_water:2 }, 
			{ skeleton:10 }, 
			{ skeleton:7, goblin:3 }, 
			{ imp:2 }, 
			{ imp:12 }, 
			{ imp:6 }, 
			{ imp:3, elem_water:7, necromancer:2 }, 
			{ necromancer:1, orc:10, elem_water:10 }, 
			{ imp:1 },
			{ imp:12, duergar:2 },
			{ imp:1 },
			{ necromancer:3, orc:5, imp:2 }
		],
		[ // 5 Torre del mago - Pride (5...7) : [ tutti elementali, scheletri, golem argilla, golem ferro, dragonkind ] 5/8 ---> caster hard ( Rakshaaza )
			{ necromancer:5 }, 
			{ necromancer:2, imp:4 }, 
			{ skeleton:20, imp:1 }, 
			{ elem_water:7, elem_air:7, elem_earth:7, elem_fire:7 }, 
			{ imp:1 }, 
			{ elem_water:5, elem_air:5, elem_earth:5, elem_fire:5, necromancer:2, imp:4 },
			{ imp:1 }, 
			{ necromancer:2, imp:4 }, 
			{ clay_golem:1 }, 
			{ elem_water:3, elem_air:3, elem_earth:3, elem_fire:3, imp:3 },
			{ iron_golem:1 },
			{ imp:1 }, 
			{ rakshaaza:1, iron_golem:1 }
		],
		[ // 6 Vulcano - Wrath (6...8) : [ coboldi, orchi, el.fuoco, el.terra, el.aria, rakshaaza ] 5/6 ---> ranged hard ( Giant )
			{ elem_air:1, elem_fire:1 }, 
			{ elem_fire:1, kobold:20, orc:2 }, 
			{ elem_earth:1, kobold:50, orc:4 }, 
			{ elem_fire:1, kobold:10, orc:10 }, 
			{ kobold:5 },
			{ elem_air:10, elem_fire:10, elem_earth:10 }, 
			{ giant:1 }, 
			{ clay_golem:2, elem_earth:5 }, 
			{ orc:10, kobold:10, elem_air:2, elem_earth:2, elem_fire:2 }, 
			{ kobold:20, giant:1, duergar:2 },
			{ clay_golem:3, elem_earth:15 }
		],
		[ // 7 Cimitero - Envy (7...9) : [ zombi, scheletri, necromancer, iron_golem, ghost ] 1/6
			{ skeleton:1 },
			{ skeleton:20 }, 
			{ skeleton:20, zombie:3 }, 
			{ necromancer:5, ghost:2, zombie:2 }, 
			{ necromancer:2, ghost:3, skeleton:5 }, 
			{ zombie:14 },
			{ zombie:2, skeleton:5 }, 
			{ ghost:3, necromancer:2, skeleton:5, zombie:4 }, 
			{ necromancer:8 }, 
			{ ghost:2 }, 
			{ iron_golem:2 },
			{ necromancer:1 }, 
			{ ghost:3, necromancer:2, skeleton:5, zombie:4 }, 
			{ ghost:4, necromancer:3, skeleton:6, zombie:5 }, 
			{ ghost:5, necromancer:4, skeleton:7, zombie:6 }, 
			{ ghost:6, necromancer:5, skeleton:8, zombie:7 }, 
			{ skeleton:1 },
			{ iron_golem:2, necromancer:2 },
			{ necromancer:10 },
			{ skeleton:1 } 
		]
	];
})()