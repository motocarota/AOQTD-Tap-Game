( function( ) {	
	
	var _DEBUG = false;

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

	game.setupMenu = function( images ) {
		
		window.director = createCanvas();
		window.director.setImagesCache( images );
		window.menuScene = director.createScene( );
		window.levelsScene = director.createScene( );
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
		
		// Main menu
		menuScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setFillStyle( 'white' );
						
		menuScene.addChild( menuScene.bg );
		menuScene.bg.addChild(
			new CAAT.Foundation.Actor().
				setBounds( 0, 0, director.width, director.height ).
				setBackgroundImage( director.getImage( 'cover' ), false ).
				setLocation( 1, 1 )
		);
		
		// Main menu - Play Button
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
						game.setupScene();
						director.easeInOut(
							1,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_BOTTOM,
							0,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_TOP,
							1000,
							false,
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false),
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false) 
						);
					} 
				) 
		);
		
		// Main menu - Info Button
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
						director.switchToScene( 3, 2000, false, true );
					} 
				)
		);
		
		// Main menu - Credits Button
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
						director.switchToScene( 4, 2000, false, true );
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
		
		// Credits - text
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
		
		// Info - text
		infoScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Info blablabla" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				setLocation( director.width/2, 100 )
		);
		
		// Levels
		
		levelsScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'map' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		levelsScene.addChild( levelsScene.bg );

		levelsScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Levels] Menu' );
			director.switchToScene( 0, 2000, false, true );
		};
		
		// Levels - text
		levelsScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Levels LOL" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "white" ).
				setTextAlign('center').
				setLocation( director.width/4, 100 )
		);
		
		// Levels - Static play button
		levelsScene.addChild(
			new CAAT.Foundation.Actor( ).
				setLocation( 120, HH-100 ).
				setScale( 1.6, 1.6 ).
				setPositionAnchor( 0.5, 0.5 ).
				setAsButton( 
					game.UI.btns,
					1, 1, 5, 5, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] PLAY' );
						game.setupScene();
						director.easeInOut(
							2,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_RIGHT,
							1,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_LEFT,
							1000,
							false,
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false),
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false) 
						);
					} 
				) 
		);
	}
	
} )( );