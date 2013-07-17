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
			addElement( "base",		"img/sprites/sprite.png" ).
			//UI
			addElement( "icons",		"img/UI/icons.png" ).
			addElement( "game-btns",	"img/UI/game-btns.png" ).
			addElement( "empty-bar",	"img/UI/empty-bar.png" ).

			addElement( "empty",	"img/empty.png" ).
			addElement( "items",	"img/sprites/items.png" ).
			//player
			addElement( "tree",		"img/sprites/tree.png" ).
			addElement( "player",	"img/sprites/sd2.png" ).
			//spells
			addElement( "mmissile",	"img/sprites/magic_missile.png" ).
			addElement( "lightning","img/sprites/lightning.png" ).
			addElement( "fireball",	"img/sprites/fireball.png" ).
			addElement( "spell",	"img/sprites/sprite.png" ).
			addElement( "boom",		"img/sprites/peperone.png" ).
			//monsters
			addElement( "bat",		"img/sprites/bat.png" ).
			addElement( "wolf",		"img/sprites/wolf.png" ).
			addElement( "dragon",	"img/sprites/dragon.png" ).
			addElement( "kobold",	"img/sprites/kobold.png" ).
			addElement( "zombie",	"img/sprites/zombie.png" ).
			//other
			addElement( "cover",	"img/aoqtd-cover.png" ).
			addElement( "splash",	"img/splash/splash0.jpg" ).
			addElement( "bg",		"img/bg.png" ).
			
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
		setupMenuScene( images );
		CAAT.loop( 30 );
	}
	
	function createCSS() {
        return new CAAT.Director().initialize( WW, HH, document.getElementById('game')).setClear( false );
    }

    function createCanvas() {
        return new CAAT.Director().
			initialize( WW, HH, 'game' ).
			setClear( 
				false 									// more performance and glitches
				// CAAT.Foundation.Director.CLEAR_ALL 	// less performance and glitches
			)
			// .enableResizeEvents( CAAT.Director.prototype.RESIZE_PROPORTIONAL );
    }

    function createGL() {
        return new CAAT.Director().initializeGL( WW, HH ).setClear( false );
    }

	function setupMenuScene( images ) {
		
		window.director = createCanvas();
		window.director.setImagesCache( images );
		window.menuScene = director.createScene( );
		window.gameScene = director.createScene( );
		window.infoScene = director.createScene( );
		window.creditsScene = director.createScene( );
		
		// This should improve performance... TODO CONTROLLARE
		CAAT.setCoordinateClamping(false);
		
		// UI - Strings and Bars
		game.UI = {
			emptySprite : 	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 ),
			btns : 			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'game-btns' ), 2, 4 ),
			emptyBar : 		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty-bar' ), 1, 1 )
		};
		
		// Menu
		menuScene.bg = new CAAT.Foundation.ActorContainer( ).
			// setBackgroundImage( director.getImage( 'cover' ), false ).
			setBounds( 0, 0, director.width, director.height ).
			setFillStyle( 'white' )//.
			// setImageTransformation( CAAT.SpriteImage.prototype.TR_FIXED_TO_SIZE );
			
		menuScene.addChild( menuScene.bg );
		menuScene.bg.addChild(
			new CAAT.Foundation.Actor().
				setBounds( 0, 0, director.width, director.height ).
				setBackgroundImage( director.getImage( 'cover' ), false ).
				setLocation( 1, 1 )
		);
		
		menuScene.addChild(
			new CAAT.Foundation.Actor( ).
				setLocation( WW-100, 120 ).
				setScale( 1.6, 1.6 ).
				setPositionAnchor( 0.5, 0.5 ).
				setAsButton( 
					game.UI.btns,
					1, 1, 5, 5, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] PLAY' );
						// Old
						// director.switchToScene( 1, 2000, false );

						// New
						director.easeInOut(
							1,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_TOP,
							0,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_BOTTOM,
							1000,
							false,
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false),
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false) 
						);
					} 
				) 
		);
		
		menuScene.addChild( 
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Info" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign('right').
				setLocation( director.width-80, 200 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] INFO' );
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
				setLocation( director.width-80, 250 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] CREDITS' );
						director.switchToScene( 3, 2000, false, true );
					} 
				)
		);
		
		// Credits
		
		creditsScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		creditsScene.addChild( creditsScene.bg );

		creditsScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Credits] Menu' );
			director.switchToScene( 0, 2000, false, true );
		};
		
		creditsScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "AOQTD: the game" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				enableEvents( false ).
				setLocation( director.width/2, 100 )
		);
		
		// Info
		
		infoScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		infoScene.addChild( infoScene.bg );

		infoScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Info] Menu' );
			director.switchToScene( 0, 2000, false, true );
		};
		infoScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Info blablabla" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				setLocation( director.width/2, 100 )
		);
		
		//Game
		game.setupScene();
	}

} )( );