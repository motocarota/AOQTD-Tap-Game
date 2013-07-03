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
			// addElement( "icons",	"img/icons.png" ).
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
		menuScene.setGestureEnabled(true);
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
		
		game.setup();
	}
	
	game.setup = function( images ) {

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
		gameScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Menu" ). //TODO replace with an image
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setLocation( director.width/2, 15 ).
				setPositionAnchor( 0.5, 0.5 ).
				setAsButton( 
					null, 1, 2, 3, 4, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Game] Paused' );
						window.spellIndex = 0;
						director.switchToScene( 0, 2000, false, true );
					} ) 
		);
		
		gameScene.addChild( new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'base'  ),  2, 10 ),
				1, 2, 3, 4, 
				function( button ){ 
					CAAT.log('[Main] Game BRUTALLY Stopped = '+!gameScene.paused )
					gameScene.setPaused( !gameScene.paused );
				} ).
			setPositionAnchor( 0.5, 0 ).
			setLocation( 20, 5 )
		);
		
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
		gameScene.addChild( game.UI.healthBar );
		
		game.UI.manaBar = new CAAT.Foundation.UI.ShapeActor().
				setLocation( 40, 10 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#79f' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
		gameScene.addChild( game.UI.manaBar );
		
		if ( _DEBUG ) {
			game.UI.debugString = new CAAT.Foundation.UI.TextActor( ).
				setText( "file version: "+_FILE_VERSION ).
				setFont( "20px arial" ).
				setTextAlign('right').
				setLocation( director.width-5, director.height-25 );

			gameScene.addChild( game.UI.debugString );
		}
		
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