( function( ) {	
	
	var _DEBUG 				= false;
	var MENU_SCENE_ID 		= 0,
		LIST_SCENE_ID 		= 1,
		GAME_SCENE_ID 		= 2,
		INFO_SCENE_ID 		= 3,
		CREDITS_SCENE_ID 	= 4,
		ENDGAME_SCENE_ID 	= 5;
		
	window.menu = {};

	menu.setupScene = function( images ) {
		
		window.director = createCanvas();
		window.director.setImagesCache( images );
		window.menuScene = director.createScene( );
		window.levelsScene = director.createScene( );
		window.gameScene = director.createScene( );
		window.infoScene = director.createScene( );
		window.creditsScene = director.createScene( );
		window.endgameScene = director.createScene( );
		
		// This should improve performance... TODO CONTROLLARE
		CAAT.setCoordinateClamping(false);
		
		// UI - Strings and Bars
		game.UI = {
			emptySprite :	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 ),
			btns :			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'game-btns' ), 2, 4 ),
			emptyBar :		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty-bar' ), 1, 1 ),
			listBtns :		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-btns' ), 2, 4 )
		};
		
		// (Scene 0) Main menu
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
						if( _DEBUG ) CAAT.log('[Menu] Play (List)' );
						game.load();
						menu.slideTo( LIST_SCENE_ID, true, false );
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
						if( _DEBUG ) CAAT.log('[Menu] Info' );
						menu.slideTo( INFO_SCENE_ID, false, false );
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
						if( _DEBUG ) CAAT.log('[Menu] Credits' );
						menu.slideTo( CREDITS_SCENE_ID, false, true );
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
					if( _DEBUG ) CAAT.log('[Menu] Resume game' );
					menu.slideTo( GAME_SCENE_ID, false, false );
				} 
			)
		menuScene.addChild( game.UI.resumeBtn );
		
		// (Scene 4) Credits
		
		creditsScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		creditsScene.addChild( creditsScene.bg );
		
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
		
		// Credits - events
		creditsScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Credits] Menu' );
			menu.slideTo( MENU_SCENE_ID, false, false );
		};
		
		// (Scene 3) Info
		
		infoScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		infoScene.addChild( infoScene.bg );
		
		// Info - text
		infoScene.bg.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Info blablabla" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				setLocation( director.width/2, 100 )
		);
		
		//Info - Events
		infoScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Info] Menu' );
			menu.slideTo( MENU_SCENE_ID, false, true );
		};
		
		// (Scene 5) Endgame
		
		endgameScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setFillStyle( 'white' ).
			enableEvents( true );
		endgameScene.addChild( endgameScene.bg );
		
		// Endgame - text
		endgameScene.label = new CAAT.Foundation.UI.TextActor( ).
			setText( "" ).
			setTextFillStyle( "black" ).
			setFont( "28px "+game.options.font ).
			setTextAlign('center').
			setLocation( director.width/2, 100 );
			
		endgameScene.bg.addChild( endgameScene.label );
		
		//Endgame - Events
		endgameScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log('[Endgame] Menu' );
			menu.slideTo( LIST_SCENE_ID, false, true );
		};
		
		// (Scene 1) List
		
		levelsScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		levelsScene.addChild( levelsScene.bg );
		
		// List - text
		game.UI.listStr = new CAAT.Foundation.UI.TextActor( ).
			setText( game.getStatus() ).
			setFont( "20px "+game.options.font ).
			setTextFillStyle( "black" ).
			setLocation( director.width/2, 130 );
		
		levelsScene.bg.addChild( game.UI.listStr );
		
		levelsScene.grid = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height );
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
				var score = game.status.scores[i-1],
					stars = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-stars' ), 1, 3 );
				
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
							setBackgroundImage( stars ).
							setSpriteIndex( score-1 )
					);
				}
			}
		};
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