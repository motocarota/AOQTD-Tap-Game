( function( ) {	
	
	CAAT.DEBUG = false;
	var _DEBUG = false,
		_FILE_VERSION = 1001,
		_CELL_SIZE = 5,
		_MAX_BAR_HEIGHT = 15,
		_MAX_BAR_WIDTH = 360;
		
	window.spellIndex = 0;
	
	window.addEventListener( 'load', load, false );
    function load( ) {

		new CAAT.Module.Preloader.Preloader( ).
			//debug base sprite for animations
			addElement( "base",		"img/sprites/sprite.png" ).
			addElement( "empty",	"img/empty.png" ).
			addElement( "boom",		"img/sprites/peperone.png" ).
			addElement( "items",	"img/sprites/items.png" ).
			//player
			addElement( "tree",		"img/sprites/tree.png" ).
			addElement( "player",	"img/sprites/sd2.png" ).
			//spells
			addElement( "mmissile",	"img/sprites/magic_missile.png" ).
			addElement( "lightning","img/sprites/lightning.png" ).
			addElement( "fireball",	"img/sprites/fireball.png" ).
			addElement( "spell",	"img/sprites/sprite.png" ).
			//monsters
			addElement( "bat",		"img/sprites/bat.png" ).
			addElement( "wolf",		"img/sprites/wolf.png" ).
			addElement( "dragon",	"img/sprites/dragon.png" ).
			addElement( "kobold",	"img/sprites/kobold.png" ).
			addElement( "zombie",	"img/sprites/zombie.png" ).
			//other
			addElement( "cover",	"img/aoqtd-cover.png" ).
			addElement( "bg",		"img/bg.png" ).
			
			load( function onAllAssetsLoaded( images ) {
				startGame( images );
			} 
		);
    }


	function startGame( images ) {

		setupOptions( );
		setupMenuScene( images );
		CAAT.loop( 30 );
	}
	

	function setupMenuScene( images ) {
		
		window.director = new CAAT.Foundation.Director( ).initialize( 900, 600, 'experiment-canvas' );
		window.director.setImagesCache( images );
		window.menuScene = director.createScene( );
		window.gameScene = director.createScene( );
		window.optionsScene = director.createScene( );
		window.creditsScene = director.createScene( );
		
		menuScene.activated = function() {
			director.setClear( CAAT.Foundation.Director.CLEAR_ALL );
		};
		
		// Menu
		menuScene.addChild( 
			new CAAT.Foundation.ActorContainer( ).
				setBounds( 0, 0, director.width, director.height ).
				setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'cover' ), 1, 1 ) ).
				enableEvents( true ).
				cacheAsBitmap( )
		);
		
		menuScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Play" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign('right').
				setLocation( director.width, 150 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] PLAY' );
						director.switchToScene( 1, 2000, false, true );
					} 
				) 
		);
		menuScene.addChild( 
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Options" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign('right').
				setLocation( director.width, 200 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] OPTIONS' );
						director.switchToScene( 2, 2000, false, true );
					} 
				)
		);
		menuScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Credits" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign('right').
				setLocation( director.width, 250 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] CREDITS' );
						director.switchToScene( 3, 2000, false, true );
					} 
				)
		);
		
		//Credits
		creditsScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Menu" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setLocation( 50, 50 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Credits] Menu' );
						director.switchToScene( 0, 2000, false, true );
					} 
				) 
		);
		creditsScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "AOQTD: the game" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				setLocation( director.width/2, 100 )
		);
		
		//Options
		optionsScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Menu" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setLocation( 50, 50 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Options] Menu' );
						director.switchToScene( 0, 2000, false, true );
					}
				) 
		);
		optionsScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Opzioni blablabla" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				setLocation( director.width/2, 100 )
		);
		
		//Game
		gameScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Gioca" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign( 'center' ).
				setLocation( director.width/2, 100 )
		);
		gameScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Menu" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setLocation( 50, 50 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Game] Pausa' );
						director.switchToScene( 0, 2000, false, true );
					} ) 
		);
	}

} )( );