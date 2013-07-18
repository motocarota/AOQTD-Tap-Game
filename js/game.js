( function( ) {	
	
	var _DEBUG = false,
		_FILE_VERSION = 1001,
		_MAX_BAR_HEIGHT = 23,
		_MAX_BAR_WIDTH = 382;
	
	game.status = {
		xp:		0,
		gold: 	0,
		level:	1,
		scores:	[ ]
	};
	
	//TODO rimuovere
	game.getStatus = function() {
		var s = game.status;
		var str = "Level:"+s.level+" XP:"+s.xp+" Gold:"+s.gold;
		CAAT.log( str );
		return str;
	};
	
	game.save = function() {
		localStorage.setItem( "status", JSON.stringify( this.status ) );
	};
	
	game.load = function() {
		
		var info = {
			xp:		0,
			gold: 	0,
			level:	1,
			scores:	[ ]
		};
		this.status = localStorage.getItem( "status" ) ? JSON.parse( localStorage.getItem( "status" ) ) : info;
	};
	
	game.setupScene = function( level ) {
		
		if ( _DEBUG ) CAAT.log( "[Game] Loading level "+level );
		
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
		
		//Player
		game.player = new CAAT.Mage( );
		game.player.add();
		game.killCount = 0;
		
		game.enemies = [];
		game.spells = [];
		
		//UI - Spell Buttons
		var btn = [];
		btn[0] = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'icons' ), 1, 4 ),
				1, 1, 1, 1, 
				function( button ){ game.player.notify( spellIndex-- ); } ).
			setLocation( 50, 530 );
			
		btn[1] = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'icons' ), 1, 4 ),
				2, 2, 2, 2,
				function( button ){ game.player.notify( spellIndex++ ); } ).
			setLocation( 250, 530 );
				
		btn[2] = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'icons' ), 1, 4 ),
				0, 0, 0, 0,
				function( button ){
					new CAAT.Enemy( ).add( game.enemiesList[ roll( 1, game.enemiesList.length ) -1 ] );
				} ).
			setLocation( 650, 530 );

		gameScene.addChild( btn[0] );
		gameScene.addChild( btn[1] );
		gameScene.addChild( btn[2] );
		
		// Pause game Button
		gameScene.addChild(
			new CAAT.Foundation.Actor( ).
				setLocation( director.width/2, 50 ).
				setPositionAnchor( 0.5, 0.5 ).
				setAsButton( 
					game.UI.btns,
					0, 0, 4, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Game] Paused' );
						window.spellIndex = 0;
						// director.switchToScene( 0, 2000, false, true );
						director.easeInOut(
							0,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_TOP,
							2,
							CAAT.Foundation.Scene.EASE_TRANSLATE,
							CAAT.Foundation.Actor.ANCHOR_BOTTOM,
							1000,
							false,
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false),
							new CAAT.Interpolator().createExponentialInOutInterpolator(3,false) 
						);
					} ) 
		);
		
		// Lock game Button - rimuovere
		gameScene.addChild( new CAAT.Foundation.Actor( ).
			setAsButton( 
				game.UI.btns,
				3, 3, 7, 7, 
				function( button ){ 
					CAAT.log('[Main] Game BRUTALLY Stopped = '+!gameScene.paused )
					gameScene.setPaused( !gameScene.paused );
				} ).
			setPositionAnchor( 0.5, 0 ).
			setLocation( 20, 40 )
		);
		
		// Main string
		game.UI.mainString = new CAAT.Foundation.UI.TextActor( ).
			setText( "hello" ).
			setFont( "30px "+game.options.font ).
			setTextFillStyle( "red" ).
			setTextAlign('center').
			setLocation( director.width/2, 80 );
		gameScene.addChild( game.UI.mainString );
		
		// Player bars
		game.UI.hpBar = new CAAT.Foundation.UI.ShapeActor().
				setLocation( 500, 9 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#f55' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
		
		game.UI.manaBar = new CAAT.Foundation.UI.ShapeActor().
				setLocation( 20, 9 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#79f' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
	
		var emptyManaBar = new CAAT.Foundation.Actor().
			enableEvents( false ).
			setLocation( 10, 0 ).
			setBackgroundImage( game.UI.emptyBar );
			
		var emptyHpBar = new CAAT.Foundation.Actor().
			enableEvents( false ).
			setLocation( 490, 0 ).
			setBackgroundImage( game.UI.emptyBar );
				
		gameScene.addChild( game.UI.hpBar );
		gameScene.addChild( game.UI.manaBar );
		gameScene.addChild( emptyManaBar );
		gameScene.addChild( emptyHpBar );
		
		if ( _DEBUG ) {
			game.UI.debugString = new CAAT.Foundation.UI.TextActor( ).
				setText( "file version: "+_FILE_VERSION ).
				setFont( "20px arial" ).
				setTextAlign('right').
				setLocation( director.width-5, director.height-25 );

			gameScene.addChild( game.UI.debugString );
		}
		
		game.player.notify( level );
		CAAT.log("level", level)
		
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
		game.UI.hpBar.setSize( game.player.hp / 100 * _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
			setLocation( 500 - ( game.player.hp - 100 ) / 100 * _MAX_BAR_WIDTH, 9 );
			
		game.UI.manaBar.setSize( _MAX_BAR_WIDTH * game.player.mana / 100, _MAX_BAR_HEIGHT );
		
		if ( game.killCount > game.options.enemies.wave )
			game.player.win();
	}

} )( );