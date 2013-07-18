( function( ) {	
	
	CAAT.DEBUG = 0;
	var _DEBUG = false,
		_FILE_VERSION = 1001,
		_MAX_BAR_HEIGHT = 22,
		_MAX_BAR_WIDTH = 380;
		
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
			addElement( "empty-bar",	"img/UI/empty-bar.png" ).
			addElement( "items",		"img/sprites/items.png" ).
			addElement( "cover",		"img/aoqtd-cover.png" ).
			addElement( "splash",		"img/splash/splash0.jpg" ).
			addElement( "bg",			"img/bg.png" ).
			//player
			addElement( "tree",			"img/sprites/tree.png" ).
			addElement( "player",		"img/sprites/sd2.png" ).
			//spells
			addElement( "mmissile",		"img/sprites/magic_missile.png" ).
			addElement( "lightning",	"img/sprites/lightning.png" ).
			addElement( "fireball",		"img/sprites/fireball.png" ).
			addElement( "fb-splash",	"img/sprites/fireball-splash.png" ).
			addElement( "spell",		"img/sprites/sprite.png" ).
			//monsters
			addElement( "bat",			"img/sprites/bat.png" ).
			addElement( "wolf",			"img/sprites/wolf.png" ).
			addElement( "dragon",		"img/sprites/dragon.png" ).
			addElement( "kobold",		"img/sprites/kobold.png" ).
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
		game.setupMenu( images );
		CAAT.loop( 30 );
	}

} )( );