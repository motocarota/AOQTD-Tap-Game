( function( ) {	
	
	var _DEBUG 				= false;
	var MENU_SCENE_ID 		= 0,
		LIST_SCENE_ID 		= 1,
		GAME_SCENE_ID 		= 2,
		HELP_SCENE_ID 		= 3,
		CREDITS_SCENE_ID 	= 4,
		ENDGAME_SCENE_ID 	= 5;
	
	window.menu = {};

	menu.setupScene = function( images ) {
		
		window.director = createCanvas();
		window.director.setImagesCache( images );
		window.menuScene = director.createScene( );
		window.levelsScene = director.createScene( );
		window.gameScene = director.createScene( );
		window.helpScene = director.createScene( );
		window.creditsScene = director.createScene( );
		window.endgameScene = director.createScene( );
		
		// This should improve performance... TODO CONTROLLARE
		CAAT.setCoordinateClamping(false);
		
		// UI - Strings and Bars
		game.UI = {
			emptySprite :	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 ),
			btns :			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'game-btns' ), 2, 5 ),
			infoCharBg :	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'info-char-bg' ), 1, 1 ),
			listBtns :		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-btns' ), 2, 4 ),
			icons:			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'icons' ), 3, 5 ),
			stars:			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-stars' ), 1, 3 )
		};

	// (Scene 0) Main menu

		menuScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setFillStyle( 'white' );
						
		menuScene.addChild( menuScene.bg );
		menuScene.bg.addChild(
			new CAAT.Foundation.Actor().
				setBounds( 0, 0, WW, HH ).
				setBackgroundImage( director.getImage( 'cover' ), false ).
				setLocation( 1, 1 )
		);
		
		// Main menu - Play Button
		menuScene.addChild(
			new CAAT.Foundation.Actor( ).
				setLocation( WW-130, 120 ).
				setScale( 1.6, 1.6 ).
				setPositionAnchor( 0.5, 0.5 ).
				setAsButton( 
					game.UI.btns,
					1, 1, 6, 6, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] Play (List)' );
						game.load();
						menu.slideTo( LIST_SCENE_ID, true, false );
					} 
				) 
		);
		
		// Main menu - Help Button
		menuScene.addChild( 
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Help" ).
				setFont( game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign('right').
				setLocation( WW-80, 300 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] Help' );
						menu.slideTo( HELP_SCENE_ID, false, false );
					} 
				)
		);
		
		// Main menu - Credits Button
		menuScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Credits" ).
				setFont( game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign('right').
				setLocation( WW-80, 400 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] Credits' );
						menu.slideTo( CREDITS_SCENE_ID, false, true );
					} 
				)
		);
		
		// Main menu - resume Button
		menu.resumeBtn = new CAAT.Foundation.UI.TextActor( ).
			setText( "Resume" ).
			setFont( game.options.font ).
			setTextFillStyle( "red" ).
			setTextAlign('right').
			setLocation( WW-80, 200 ).
			setVisible( false ).
			setAsButton( 
				null, 1, 2, 3, 4, 
				function( button ){ 
					if( _DEBUG ) CAAT.log('[Menu] Resume game' );
					menu.slideTo( GAME_SCENE_ID, true, false );
				} 
			)
		menuScene.addChild( menu.resumeBtn );
		
		
	// (Scene 4) Credits
		
		creditsScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		creditsScene.addChild( creditsScene.bg );
		
		// Credits - text
		creditsScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "AOQTD: the game" ).
				setFont( game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				enableEvents( false ).
				setLocation( WW/2, 100 )
		);
		
		// Credits - events
		creditsScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Credits] Menu' );
			menu.slideTo( MENU_SCENE_ID, false, false );
		};
		
		
	// (Scene 3) Help
		
		helpScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		helpScene.addChild( helpScene.bg );
		
		// Info - text
		helpScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Info blablabla" ).
				setFont( game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				setLocation( WW/2, 100 )
		);
		
		//Info - Events
		helpScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Info] Menu' );
			menu.slideTo( MENU_SCENE_ID, false, true );
		};
		
		
	// (Scene 5) Endgame
		
		endgameScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setFillStyle( 'white' ).
			enableEvents( true );
		
		endgameScene.addChild( endgameScene.bg );
		
		// Endgame - text
		endgameScene.goldLabel = new CAAT.Foundation.UI.TextActor( ).
			setText( "0" ).
			setTextFillStyle( "white" ).
			setFont( game.options.font ).
			setTextAlign('center').
			setPositionAnchor( 0.5, 0 ).
			setLocation( 160+WW*2/3, 150 );
			
		endgameScene.bg.addChild( endgameScene.goldLabel );
		
		endgameScene.xpLabel = new CAAT.Foundation.UI.TextActor( ).
			setText( "0" ).
			setTextFillStyle( "white" ).
			setFont( game.options.font ).
			setTextAlign('center').
			setPositionAnchor( 0.5, 0 ).
			setLocation( 160+WW*2/3, 300 );
			
		endgameScene.bg.addChild( endgameScene.xpLabel );
		
		endgameScene.starsImg = new CAAT.Foundation.Actor( ).
			setLocation( 130+WW*2/3, 480 ).
			setBackgroundImage( game.UI.stars ).
			setPositionAnchor( 0.5, 0 ).
			setScale( 1.8, 1.8 );
			
		endgameScene.addChild( endgameScene.starsImg );
		
		//Endgame - Events		
		endgameScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Endgame] Menu' );
			menu.slideTo( LIST_SCENE_ID, false, true );
		};
		
		menu.updateEndgame = function( victory, score ) {
			
			menu.resumeBtn.setVisible( false );
			if( victory ){
				// endgameScene.bigLabel.setText( "Hai vinto!! "+score+" stars" );
				endgameScene.bg.setBackgroundImage( director.getImage( 'eg-win' ), false );
				endgameScene.goldLabel.
					setText( "+"+game.player.gold ).
					setVisible( true );
				endgameScene.xpLabel.setText( "+"+game.player.xp );
				endgameScene.starsImg.
					setVisible( true ).
					setSpriteIndex( score-1 );
			} else {
				// endgameScene.bigLabel.setText( "Hai persoooo" );
				endgameScene.bg.setBackgroundImage( director.getImage( 'eg-die' ), false );
				endgameScene.goldLabel.setVisible( false );
				endgameScene.xpLabel.setText( "+"+game.player.xp*2+" /2" );
				endgameScene.starsImg.setVisible( false );
			}
			if ( game.checkLevelUp() ) {
				endgameScene.bg.addChild( 
					new CAAT.Foundation.ActorContainer( ).
						setLocation( 20, HH-100 ).
						setFrameTime( endgameScene.time, 2000 ).
						setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'level-up' ), 1, 1 ) )
			 	);
			}
			menu.slideTo( ENDGAME_SCENE_ID, false, false );
		};
		
	// (Scene 1) List
		
		levelsScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		levelsScene.addChild( levelsScene.bg );
		
		// List - text
		game.UI.listStr = new CAAT.Foundation.UI.TextActor( ).
			setText( game.getStatus() ).
			setFont( game.options.fontAlt ).
			setTextFillStyle( "black" ).
			setTextAlign( 'right' ).
			setLocation( WW-30, 130 );
		
		levelsScene.bg.addChild( game.UI.listStr );
		
		levelsScene.grid = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH );
		levelsScene.addChild( levelsScene.grid );
		
		// List - Buttons
		levelsScene.activated = function( ) {
			menu.updateGrid();
		};
	}
	
	menu.slideTo = function( to, vertical, reverse ) {
		
		if ( _DEBUG ) CAAT.log( "[Menu] slide to scene "+to+" vertical:"+vertical+" reverse:"+reverse );
		
		var anchorOne, anchorTwo;
		if ( vertical ) {
			//verticale verso il basso
			anchorOne = CAAT.Foundation.Actor.ANCHOR_BOTTOM;
			anchorTwo = CAAT.Foundation.Actor.ANCHOR_TOP;
		} else {
			//orizzontale verso dx
			anchorOne = CAAT.Foundation.Actor.ANCHOR_RIGHT;
			anchorTwo = CAAT.Foundation.Actor.ANCHOR_LEFT;
		}
		if ( reverse ) {
			var tmp = anchorOne;
			anchorOne = anchorTwo;
			anchorTwo = tmp;
		}
		
		director.easeInOut(
			to,
			CAAT.Foundation.Scene.EASE_TRANSLATE,
			anchorOne,
			director.getCurrentSceneIndex(),
			CAAT.Foundation.Scene.EASE_TRANSLATE,
			anchorTwo,
			1000,
			false,
			new CAAT.Interpolator().createExponentialInOutInterpolator(3,false),
			new CAAT.Interpolator().createExponentialInOutInterpolator(3,false) 
		);
	}
	
	menu.updateGrid = function() {
		
		if( _DEBUG ) CAAT.log('[List] update grid');
		var x, y;
		game.load();
		levelsScene.grid.emptyChildren();
		for ( var i=0; i < 8; i++ ) {
			x = 25 + ( WW*i/4 ),
			y = 20 + ( HH/4 );
			if ( i > 3 ) {
				x = 25 + ( WW*(i-4)/4 );
				y = 20 + ( HH/2 );
			}
			
			// List - Menu button
			if ( i === 0 ) {
				levelsScene.grid.addChild(
					new CAAT.Foundation.Actor( ).
						setLocation( x, y ).
						setAsButton( 
							game.UI.listBtns,
							i, i, i, i,
							function( button ){ 
								if( _DEBUG ) CAAT.log('[List] Menu' );
								menu.slideTo( MENU_SCENE_ID, true, true );
							} 
						) 
				);
			} else {
				
				//List - Levels Button
				var score = game.status.scores[i-1];
				
				if ( i === 1 || score || game.status.scores[i-2] )
				levelsScene.grid.addChild(
					new CAAT.Foundation.Actor( ).
						setLocation( x, y ).
						setAsButton( 
							game.UI.listBtns,
							i, i, i, i, 
							helper( i )
						)
				);
				
				// List - Stars
				if ( score ) {
					if( _DEBUG ) CAAT.log( '[List] level '+i+' already done' );
					if ( is( 'Number', score ) && score >= 0 && score <= 3 ) 
					levelsScene.grid.addChild(
						new CAAT.Foundation.Actor( ).
							setLocation( x+25, y+75 ).
							setBackgroundImage( game.UI.stars ).
							setSpriteIndex( score-1 )
					);
				}
			}
		};
		game.UI.listStr.setText( game.getStatus() );
	};
	
	function helper( i ) {
		
		return function( ) {
			if( _DEBUG ) CAAT.log('[List] Play level: '+i );
			
			game.setupScene( i );
			menu.slideTo( GAME_SCENE_ID, false, false );
		}
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
	
} )( );