( function( ) {	
	
	var _DEBUG 				= false;
	var MENU_SCENE_ID 		= 0,
		LIST_SCENE_ID 		= 1,
		GAME_SCENE_ID 		= 2,
		HELP_SCENE_ID 		= 3,
		CREDITS_SCENE_ID 	= 4,
		ENDGAME_SCENE_ID 	= 5,
		CHAR_SCENE_ID 		= 6;

	window.menu = {};
	game.difficulty = 0;

	menu.setupScene = function( images ) {
		
		// window.director = createCanvas( );
		window.director = createCSS( );
		// window.director = createGl( );
		
		window.menuScene = director.createScene( );
		window.levelsScene = director.createScene( );
		window.gameScene = director.createScene( );
		window.helpScene = director.createScene( );
		window.creditsScene = director.createScene( );
		window.reportScene = director.createScene( );
		window.charScene = director.createScene( );
		
		window.director.setImagesCache( images );
		CAAT.setCoordinateClamping( false );
		
		// UI - Strings and Bars
		game.UI = {
			emptySprite :	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 ),
			icons :			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'icons' ), 3, 5 ),
			items :			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'items' ), 3, 3 ),
			btns :			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'game-btns' ), 2, 5 ),
			stars :			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'list-stars' ), 2, 2 ),
			optionsBg :		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'options-bg' ), 1, 1 ),
			infoCharBg :	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'info-char-bg' ), 1, 1 )
		};
	
	
	// Audio Manager ================================================================================================
		
		director.addAudio( 'boom', "audio/spells/boom.ogg" );
		// director.audioPlay( 'boom' );
	
	// ( Scene 0 ) Main menu ================================================================================================

		menuScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( -1, -1, WW, HH ).
			setFillStyle( 'white' );
						
		menuScene.addChild( menuScene.bg );
		menuScene.bg.addChild( 
			new CAAT.Foundation.Actor( ).
				setBounds( 0, 0, WW, HH ).
				setBackgroundImage( director.getImage( 'cover' ), false ).
				setLocation( 1, 1 )
		 );
		
		// Main menu - Version Number
		menuScene.addChild( 
			new CAAT.Foundation.UI.TextActor( ).
				setText( "version: "+game.version ).
				setFont( game.options.fontAlt ).
				setTextFillStyle( "white" ).
				setLocation( 20, HH-50 )
		 );
		
		// Main menu - Play Button
		menuScene.addChild( 
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Play" ).
				setFont( game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign( 'right' ).
				setLocation( WW-20, 210 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log( '[Menu] Play' );
						game.setupScene( );
						menu.slideTo( GAME_SCENE_ID, false, false );
					} 
				 )
		 );
		
		// Main menu - Help Button
		menuScene.addChild( 
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Help" ).
				setFont( game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign( 'right' ).
				setLocation( WW-20, 410 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log( '[Menu] Help' );
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
				setTextAlign( 'right' ).
				setLocation( WW-20, 310 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log( '[Menu] Credits' );
						menu.slideTo( CREDITS_SCENE_ID, false, true );
					} 
				 )
		 );
		
		// Main menu - resume Button
		menu.resumeBtn = new CAAT.Foundation.UI.TextActor( ).
			setText( "Resume" ).
			setFont( game.options.font ).
			setTextFillStyle( "red" ).
			setTextAlign( 'right' ).
			setLocation( WW-20, 110 ).
			setVisible( false ).
			setAsButton( 
				null, 1, 2, 3, 4, 
				function( button ){ 
					if( _DEBUG ) CAAT.log( '[Menu] Resume game' );
					menu.slideTo( GAME_SCENE_ID, true, false );
				} 
			 )
		menuScene.addChild( menu.resumeBtn );
		
		// Options BG
		menuScene.addChild( new CAAT.Foundation.Actor( ).
			setLocation( 20+WW/2, HH ).
			setBackgroundImage( game.UI.optionsBg ).
			setPositionAnchor( 0.5, 1 )
		);
		
		// Music Label 
		menuScene.addChild( new CAAT.Foundation.UI.TextActor( ).
			setText( "Music:" ).
			setTextFillStyle( "black" ).
			setFont( game.options.fontAlt ).
			setLocation( WW/2-130, HH-55 ) );
		
		// Music Button 
		menuScene.addChild( new CAAT.Foundation.Actor( ).
			setAsButton( 
				game.UI.btns,
				4, 4, 9, 9, 
				function( button ){ 
					// TODO toggle music
					// button.setSpriteIndex( 9 ) 
				} ).
			setPositionAnchor( 1, 1 ).
			setLocation( 40+WW/2, HH )
		 );
		
		// Sound Label
		menuScene.addChild( new CAAT.Foundation.UI.TextActor( ).
			setText( "Sound:" ).
			setTextFillStyle( "black" ).
			setFont( game.options.fontAlt ).
			setLocation( 40+WW/2, HH-55 ) );
			
		// Sound Button
		menuScene.addChild( new CAAT.Foundation.Actor( ).
			setAsButton( 
				game.UI.btns,
				3, 3, 8, 8, 
				function( button ){ 
					// TODO toggle sounds
					button.setSpriteIndex( 8 );
				} ).
			setPositionAnchor( 0, 1 ).
			setLocation( 115+WW/2, HH )
		 );
		
		
	// ( Scene 4 ) Credits ================================================================================================
		
		creditsScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'about' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		creditsScene.addChild( creditsScene.bg );
		
		// Credits - events
		creditsScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log( '[Credits] Menu' );
			menu.slideTo( MENU_SCENE_ID, false, false );
		};
				
	// ( Scene 3 ) Help ================================================================================================
		
		helpScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'help' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );
		helpScene.addChild( helpScene.bg );
		
		//Info - Events
		helpScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log( '[Info] Menu' );
			menu.slideTo( MENU_SCENE_ID, false, true );
		};
		
		
	// ( Scene 5 ) Report ================================================================================================
		
		reportScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setFillStyle( 'white' ).
			enableEvents( true );
		
		reportScene.addChild( reportScene.bg );
		
		// Report - xp
		reportScene.xpLabel = new CAAT.Foundation.UI.TextActor( ).
			setText( "0" ).
			setTextFillStyle( "white" ).
			setFont( game.options.fontBig ).
			setTextAlign( 'center' ).
			setPositionAnchor( 0.5, 0 ).
			enableEvents( false ).
			setLocation( 760, 295 );
			
		reportScene.bg.addChild( reportScene.xpLabel );
		
		// Report - score
		reportScene.starsImg = new CAAT.Foundation.Actor( ).
			setLocation( 730, 480 ).
			setBackgroundImage( game.UI.stars ).
			setPositionAnchor( 0.5, 0 ).
			enableEvents( false ).
			setScale( 1.8, 1.8 );
			
		reportScene.addChild( reportScene.starsImg );
		
		//Report - Events		
		reportScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log( '[Report] Menu' );
			menu.slideTo( MENU_SCENE_ID, false, true );
		};
		
		menu.updateReport = function( ) {

			menu.resumeBtn.setVisible( false );
			reportScene.firstClick = true;
			//TODO decidere il numero di stelle a seconda del risultato
			// es 100+: 1 stella, 200+: 2 stelle, 300+: 3 stelle
			// reportScene.starsImg.setVisible( true ).setSpriteIndex( score-1 );
			reportScene.bg.setBackgroundImage( director.getImage( 'eg-die' ), false );
			reportScene.xpLabel.setText( game.killCount );
			reportScene.starsImg.setVisible( true );
			
			menu.slideTo( ENDGAME_SCENE_ID, false, false );
		};
		
	// ( Scene 6 ) Character Sheet ==========================================================================================

		charScene.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, WW, HH ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'char' ), 1, 1 ) ).
			enableEvents( true );
		charScene.addChild( charScene.bg );

		// Char - events
		charScene.bg.mouseDown = function( ev ) {
			if( _DEBUG ) CAAT.log( '[Char] Menu' );
			menu.slideTo( LIST_SCENE_ID, false, true );
		};
			
	// ( Scene 1 ) List ================================================================================================

	// removed
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
			director.getCurrentSceneIndex( ),
			CAAT.Foundation.Scene.EASE_TRANSLATE,
			anchorTwo,
			1000,
			false,
			new CAAT.Interpolator( ).createExponentialInOutInterpolator( 3,false ),
			new CAAT.Interpolator( ).createExponentialInOutInterpolator( 3,false ) 
		 );
	}
	
	menu.updateGrid = function( ) { };
	
	function createCSS( ) {
        return new CAAT.Director( ).
            initialize( WW, HH, document.getElementById( 'game' ) ).
            setClear( false ).
			enableResizeEvents( CAAT.Director.prototype.RESIZE_PROPORTIONAL );
    }

    function createCanvas( ) {
        return new CAAT.Director( ).
			initialize( WW, HH, 'game' ).
			setClear( false ).
			enableResizeEvents( CAAT.Director.prototype.RESIZE_PROPORTIONAL );
    }

    function createGl( ) {
        return new CAAT.Director( ).
			initializeGL( WW, HH, 'game' ).
			setClear( false ).
			enableResizeEvents( CAAT.Director.prototype.RESIZE_PROPORTIONAL );
    }
} )( );