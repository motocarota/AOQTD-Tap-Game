( function( ) {	
	
	CAAT.DEBUG = false;
	var _DEBUG = false;
	game.version = "1020";
			
	window.spellIndex = 0;
	window.addEventListener( 'load', load, false );
	
	function load( ) {

		new CAAT.Module.Preloader.Preloader( ).
			//UI
			addElement( "icons",		"img/UI/icons.png" ).
			addElement( "list-bg",		"img/UI/list-bg.png" ).
			addElement( "list-btns",	"img/UI/list-btns.png" ).
			addElement( "list-stars",	"img/UI/list-stars.png" ).
			addElement( "game-btns",	"img/UI/game-btns.png" ).
			addElement( "info-char-bg",	"img/UI/info-char-bg.png" ).
			addElement( "level-up", 	"img/UI/level-up.png" ).
			addElement( "options-bg", 	"img/UI/options-bg.png" ).
			addElement( "logo", 		"img/UI/logo.png" ).
			addElement( "items",		"img/sprites/items.png" ).
			addElement( "badge",		"img/UI/badge.png" ).
			
			//splash screens
			addElement( "cover",		"img/cover.png" ).
			addElement( "splash",		"img/splash/splash0.jpg" ).
			addElement( "eg-win",		"img/splash/UI-win.png" ).
			addElement( "eg-die",		"img/splash/UI-lose.png" ).
			addElement( "about",		"img/splash/about.png" ).
			addElement( "help",		    "img/splash/help.png" ).
			addElement( "char",		    "img/splash/char-demo.png" ).
			
			//backgrounds
			addElement( "bg-1",			"img/bg/level-1.png" ).
			addElement( "bg-2",			"img/bg/level-2.png" ).
			addElement( "bg-3",			"img/bg/level-3.png" ).
			addElement( "bg-4",			"img/bg/level-4.png" ).
			addElement( "bg-5",			"img/bg/level-5.png" ).
			addElement( "bg-6",			"img/bg/level-6.png" ).
			addElement( "bg-7",			"img/bg/level-7.png" ).
			
			//player
			addElement( "tree",			"img/sprites/tree.png" ).
			addElement( "player",		"img/sprites/sd2.png" ).
			
			//spells
			addElement( "mmissile",		"img/sprites/spells/magic_missile.png" ).
			addElement( "aarrow",		"img/sprites/spells/acid_arrow.png" ).
			addElement( "aarrows",		"img/sprites/spells/acid_arrow_splash.png" ).
			addElement( "lightning",	"img/sprites/spells/lightning.png" ).
			addElement( "fireball",		"img/sprites/spells/fireball.png" ).
			addElement( "fb-splash",	"img/sprites/spells/fireball-splash.png" ).
			addElement( "hwilting",		"img/sprites/spells/horrid-wilting-big.png" ).
			addElement( "void-sphere",	"img/sprites/spells/void-sphere.png" ).
			addElement( "fire_bolt",	"img/sprites/spells/fire-bolt.png" ).
			addElement( "spell",		"img/empty.png" ).
			
			//projectiles
			addElement( "rock",			"img/sprites/rock.png" ).
			addElement( "arrow",		"img/sprites/arrow.png" ).
			
			//monsters
			addElement( "kobold",		"img/sprites/enemies/kobold.png" ).
			addElement( "troll",	    "img/sprites/enemies/troll.png" ).
			addElement( "shadow",		"img/sprites/enemies/shadow.png" ).
			addElement( "gel_cube",		"img/sprites/enemies/gel_cube.png" ).
			addElement( "orc",			"img/sprites/enemies/orc.png" ).
			addElement( "elem_fire",	"img/sprites/enemies/elem-fire.png" ).
			addElement( "elem_earth",	"img/sprites/enemies/elem-earth.png" ).
			addElement( "elem_air",	    "img/sprites/enemies/elem-air.png" ).
			addElement( "elem_water",	"img/sprites/enemies/elem-water.png" ).
			addElement( "skeleton",	    "img/sprites/enemies/skeleton.png" ).
			addElement( "goblin",	    "img/sprites/enemies/goblin.png" ).
			addElement( "ghost",	    "img/sprites/enemies/ghost.png" ).
			addElement( "necromancer",	"img/sprites/enemies/necromancer.png" ).
			addElement( "duergar",	    "img/sprites/enemies/duergar.png" ).
			addElement( "giant",	    "img/sprites/enemies/giant.png" ).
			addElement( "iron_golem",	"img/sprites/enemies/iron_golem.png" ).
			addElement( "clay_golem",	"img/sprites/enemies/clay_golem.png" ).
			addElement( "zombie",		"img/sprites/enemies/zombie.png" ).
			addElement( "imp",			"img/sprites/enemies/imp.png" ).
			addElement( "ogre_magi",	"img/sprites/enemies/ogre_magi.png" ).
			addElement( "rakshaaza",	"img/sprites/enemies/rakshaaza.png" ).
			addElement( "tinker",		"img/sprites/enemies/tinker.png" ).
			addElement( "bandit",		"img/sprites/enemies/bandit.png" ).
			
			//other
			addElement( "empty",		"img/empty.png" ).
			
			load( function onAllAssetsLoaded( images ) {
				startGame( images );
			} 
		);
    }


	function startGame( images ) {

		WW= 900; HH = 600;
		setupOptions( );
		menu.setupScene( images );
		CAAT.loop( 30 );
	}

} )( );