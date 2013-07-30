( function( ) {	
	
	CAAT.DEBUG = 0;
	var _DEBUG = false,
		_FILE_VERSION = 1001;
			
	window.spellIndex = 0;
	window.addEventListener( 'load', load, false );
	
	function load( ) {

		new CAAT.Module.Preloader.Preloader( ).
			//debug base sprite for animations
			//UI
			addElement( "icons",		"img/UI/icons.png" ).
			addElement( "list-bg",		"img/UI/list-bg.png" ).
			addElement( "list-btns",	"img/UI/list-btns.png" ).
			addElement( "list-stars",	"img/UI/list-stars.png" ).
			
			addElement( "game-btns",	"img/UI/game-btns.png" ).
			addElement( "info-char-bg",	"img/UI/info-char-bg.png" ).
			addElement( "items",		"img/sprites/items.png" ).
			
			//splash screens
			addElement( "cover",		"img/aoqtd-cover.png" ).
			addElement( "splash",		"img/splash/splash0.jpg" ).
			addElement( "eg-win",		"img/splash/endgame-win.png" ).
			addElement( "eg-die",		"img/splash/endgame-die.png" ).
			
			//backgrounds
			addElement( "bg",			"img/bg.png" ).
			// addElement( "bg-1",			"img/bg/1.png" ).
			// addElement( "bg-2",			"img/bg/2.jpeg" ).
			// addElement( "bg-3",			"img/bg/3.jpeg" ).
			addElement( "bg-4",			"img/bg/4.jpeg" ).
			addElement( "bg-5",			"img/bg/5.jpeg" ).
			addElement( "bg-6",			"img/bg/6.jpeg" ).
			addElement( "bg-7",			"img/bg/7.jpeg" ).
			
			addElement( "bg-1",		"img/bg/level-1.png" ).
			addElement( "bg-2",		"img/bg/level-2.png" ).
			addElement( "bg-3",		"img/bg/level-3.png" ).
			
			//player
			addElement( "tree",			"img/sprites/tree.png" ).
			addElement( "player",		"img/sprites/sd2.png" ).
			//spells
			addElement( "mmissile",		"img/sprites/magic_missile.png" ).
			addElement( "aarrow",		"img/sprites/acid_arrow.png" ).
			addElement( "lightning",	"img/sprites/lightning.png" ).
			addElement( "fireball",		"img/sprites/fireball.png" ).
			addElement( "fb-splash",	"img/sprites/fireball-splash.png" ).
			addElement( "spell",		"img/sprites/sprite.png" ).
			
			//monsters
			addElement( "kobold",		"img/sprites/kobold.png" ).
			addElement( "troll",		"img/sprites/troll.png" ).
			addElement( "shadow",		"img/sprites/shadow.png" ).
			addElement( "gel_cube",		"img/sprites/gel_cube.png" ).
			addElement( "orc",			"img/sprites/orc.png" ).
			addElement( "zombie",		"img/sprites/zombie.png" ).
			//other
			addElement( "empty",		"img/empty.png" ).
			addElement( "base",			"img/sprites/sprite.png" ).
			
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