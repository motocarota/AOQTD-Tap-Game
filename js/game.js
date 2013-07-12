( function( ) {	
	
	var _DEBUG = false,
		_FILE_VERSION = 1001,
		_MAX_BAR_HEIGHT = 15,
		_MAX_BAR_WIDTH = 360;
		
	window.spellIndex = 0;
	
	game.setup = function( images ) {
		
		//Inizializza l'area di gioco:
		// carica 
		// 		livello (bg)
		// 		lista dei nemici
		//		stat/spell personaggio (from localstorage)
		//			exp power defense mana [ talenti ]
				
		menuScene.addChild( new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'spell' ), 1, 3 ),
				0, 0, 0, 0,
				function( button ){
					director.switchToPrevScene( 2000, false	, true );
				} ).
			setLocation( 300, 300 );
		);

		//NOTA this could be useful for invisibles objects
		gameScene.emptySprite = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 );

		// Background
		game.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg' ), 1, 1 ) ).
			enableEvents( true ).
			cacheAsBitmap( );

		gameScene.addChild( game.bg );
		
		game.bg.mouseDown = function( ev ) {
			game.player.castSpell( spellIndex, ev.point.x, ev.point.y );
		};
		game.bg.touchStart = function( ev ) {
			game.player.castSpell( spellIndex, ev.point.x, ev.point.y );
		}; 
		
		//Player
		game.player = new CAAT.Mage( );
		game.player.add();
		game.killCount = 0;
		
		game.enemies = [];
		game.spells = [];
		
		//UI - Buttons
		var btn = [];
		
		btn[0] = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'base' ), 2, 10 ),
				0, 0, 0, 0, 
				function( button ){ game.player.notify( spellIndex-- ); } ).
			setLocation( 50, 540 );
			
		btn[1] = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'base' ), 2, 10 ),
				0, 0, 0, 0,
				function( button ){ game.player.notify( spellIndex++ ); } ).
			setLocation( 250, 540 );
				
		btn[2] = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'base' ), 2, 10 ),
				0, 0, 0, 0,
				function( button ){
					new CAAT.Enemy( ).add( game.enemiesList[ roll( 1, game.enemiesList.length ) -1 ] );
				} ).
			setLocation( 650, 540 );

		gameScene.addChild( btn[0] );
		gameScene.addChild( btn[1] );
		gameScene.addChild( btn[2] );
				
		// UI - Strings and Bars
		game.UI = {};
		game.UI.pauseBtn = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'base'  ),  2, 10 ),
				1, 2, 3, 4, 
				function( button ){ 
					CAAT.log('[Main] Game Paused = '+!gameScene.paused )
					gameScene.setPaused( !gameScene.paused );
					// director.switchToNextScene( 2000, false, true );
				} ).
			setPositionAnchor( 0.5, 0 ).
			setLocation( director.width/2, 5 );
		
		game.UI.mainString = new CAAT.Foundation.UI.TextActor( ).
			setText( "hello" ).
			setFont( "30px "+game.options.font ).
			setTextFillStyle( "red" ).
			setTextAlign('center').
			setLocation( director.width/2, 50 );
		
		gameScene.addChild( game.UI.mainString );
		
		game.UI.healthBar = new CAAT.Foundation.UI.ShapeActor().
		setLocation( 500, 10 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#f55' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
		
		game.UI.manaBar = new CAAT.Foundation.UI.ShapeActor().
				setLocation( 40, 10 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#79f' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
		
		if ( _DEBUG ) {
			game.UI.debugString = new CAAT.Foundation.UI.TextActor( ).
				setText( "file version: "+_FILE_VERSION ).
				setFont( "20px arial" ).
				setTextAlign('right').
				setLocation( director.width-5, director.height-25 );

			gameScene.addChild( game.UI.debugString );
		}
		gameScene.addChild( game.UI.pauseBtn );
		gameScene.addChild( game.UI.healthBar );
		gameScene.addChild( game.UI.manaBar );
		
		//Timers
		game.time = game.options.global_cooldown;
		game.mainTimer = gameScene.createTimer(
			0,
			Number.MAX_VALUE, 
			null,
			function(){ 
				if( game.time-- < 0 ) {
					game.tick();
					game.time = game.options.global_cooldown;
				} 
			},
			null 
		);
	}
	
	game.tick = function() {
		
		//UPDATE PLAYER
		game.player.tick();
		
		//UPDATE ENEMIES
		for ( e in game.enemies ) {
			game.enemies[ e ].tick();
		}
		
		// Enemies generation
		var c = roll( 1, 10 );
		//improved version
		// if ( game.enemies.length < game.options.enemies.maxNumber && Math.random() < (game.options.enemies.spawnRate || 0.2) ) {
		if ( !_DEBUG && game.enemies.length < 5 && c < 4 ) {
			var enemy = new CAAT.Enemy( );
			// enemy.add( game.enemiesList[ roll( 1, game.enemiesList.length ) ] );
			enemy.add( 'kobold' );
			enemy.move( );
		}
		
		//UPDATE UI
		game.UI.healthBar.setSize( game.player.hp / 100 * _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
			setLocation( 500 - ( game.player.hp - 100 ) / 100 * _MAX_BAR_WIDTH, 10 );
			
		game.UI.manaBar.setSize( _MAX_BAR_WIDTH * game.player.mana / 100, _MAX_BAR_HEIGHT );
		
		if ( game.killCount > game.options.enemies.wave )
			game.player.win();
	}

} )( );