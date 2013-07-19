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
			emptySprite :	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 ),
			btns :			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'game-btns' ), 2, 4 ),
			emptyBar :		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty-bar' ), 1, 1 ),
			listBtns :		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-btns' ), 2, 4 )
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
						// game.setupScene();
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
						director.switchToScene( 3, 1000, false, false );
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
						director.switchToScene( 4, 1000, false, false );
					} 
				)
		);
		
		// Main menu - resume Button
		game.UI.resumeBtn = new CAAT.Foundation.UI.TextActor( ).
			setText( "Resume" ).
			setFont( "30px "+game.options.font ).
			setTextFillStyle( "red" ).
			setTextAlign('right').
			setLocation( director.width-80, 300 ).
			setVisible( false ).
			setAsButton( 
				null, 1, 2, 3, 4, 
				function( button ){ 
					if( _DEBUG ) CAAT.log('[Menu] INFO' );
					director.switchToScene( 2, 1000, false, false );
				} 
			)
		menuScene.addChild( game.UI.resumeBtn );
		
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
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		levelsScene.addChild( levelsScene.bg );
		
		// Load player's info
		game.load();
		
		// Info - text
		levelsScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( game.getStatus() ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setLocation( director.width/2, 130 )
		);
		
		// Levels - Buttons
		for (var i=0; i < 8; i++) {
			
			var x = 25 + ( WW*i/4 ),
				y = 20 + ( HH/4 );
			if ( i > 3 ) {
				x = 25 + ( WW*(i-4)/4 );
				y = 20 + ( HH/2 );
			}
			//TODO rifare a modino
			if ( i === 0 ) {
				levelsScene.addChild(
					new CAAT.Foundation.Actor( ).
						setLocation( x, y ).
						setAsButton( 
							game.UI.listBtns,
							i, i, i, i, 
							function( button ){ 
								if( _DEBUG ) CAAT.log('[List] Back to menu' );
								director.easeInOut(
									0,
									CAAT.Foundation.Scene.EASE_TRANSLATE,
									CAAT.Foundation.Actor.ANCHOR_TOP,
									1,
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
			} else {
				levelsScene.addChild(
					new CAAT.Foundation.Actor( ).
						setLocation( x, y ).
						setAsButton( 
							game.UI.listBtns,
							i, i, i, i, 
							helper( i )
						) 
				);
				var c = game.status.scores[i-1],
					stars = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-stars' ), 1, 3 );
					
				if ( game.status.scores[i-1] ) {
					levelsScene.addChild(
						new CAAT.Foundation.Actor( ).
							setLocation( x+25, y+75 ).
							setBackgroundImage( stars ).
							setSpriteIndex( game.status.scores[i-1]-1 )
					);
				}
			}
		};
	}
	
	function helper( i ) {
		
		return function( ) {
			if( _DEBUG ) CAAT.log('[List] PLAY level i:'+i );
			game.setupScene( i );
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
	}
} )( );