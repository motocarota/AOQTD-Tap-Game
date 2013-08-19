( function( ) {	
	
	CAAT.DEBUG = 0;
	var _DEBUG = false,
		_FILE_VERSION = 1001;
			
	window.spellIndex = 0;
	window.addEventListener( 'load', load, false );
	
	function load( ) {

		new CAAT.Module.Preloader.Preloader( ).
			//UI
			addElement( "icons",		"img/UI/icons.png" ).
			addElement( "list-bg",		"img/UI/list-bg.png" ).
			addElement( "list-btns",	"img/UI/list-btns.png" ).
			addElement( "list-stars",	"img/UI/list-stars.png" ).
			addElement( "bg-small",		"img/UI/bg-small.png" ).
			addElement( "game-btns",	"img/UI/game-btns.png" ).
			addElement( "info-char-bg",	"img/UI/info-char-bg.png" ).
			addElement( "items",		"img/sprites/items.png" ).
			addElement( "logo", 		"img/UI/logo.png" ).
			
			//splash screens
			addElement( "cover",		"img/cover.png" ).
			addElement( "splash",		"img/splash/splash0.jpg" ).
			addElement( "eg-win",		"img/splash/endgame-win.png" ).
			addElement( "eg-die",		"img/splash/endgame-die.png" ).
			
			//backgrounds
			addElement( "bg",				"img/bg.png" ).
			addElement( "bg-1",			"img/bg/level-1.png" ).
			addElement( "bg-2",			"img/bg/level-2.png" ).
			addElement( "bg-3",			"img/bg/level-3.png" ).
			addElement( "bg-4",			"img/bg/level-4.png" ).
			addElement( "bg-5",				"img/bg/5.jpeg" ).
			addElement( "bg-6",				"img/bg/6.jpeg" ).
			addElement( "bg-7",				"img/bg/7.jpeg" ).
			
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
			addElement( "spell",		"img/empty.png" ).
			
			//monsters
			addElement( "kobold",		"img/sprites/enemies/kobold.png" ).
			addElement( "troll",	    "img/sprites/enemies/troll.png" ).
			addElement( "shadow",		"img/sprites/enemies/shadow.png" ).
			addElement( "gel_cube",		"img/sprites/enemies/gel_cube.png" ).
			addElement( "orc",			"img/sprites/enemies/orc.png" ).
			addElement( "elem_fire",	"img/sprites/enemies/elem-fire.png" ).
			addElement( "elem_earth",	"img/sprites/enemies/elem-earth.png" ).
			addElement( "elem_air",	    "img/sprites/enemies/elem-air.png" ).
			
			//other
			addElement( "empty",		"img/empty.png" ).
			
			load( function onAllAssetsLoaded( images ) {
				startGame( images );
			} 
		);
    }


	function startGame( images ) {

		// WW= window.innerWidth;
		// HH= window.innerHeight;
		WW= 900; HH = 600;
		
		setupOptions( );
		menu.setupScene( images );
		CAAT.loop( 30 );
	}

} )( );