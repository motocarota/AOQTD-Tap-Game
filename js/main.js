( function( ) {	
	
	CAAT.DEBUG = false;
	var _DEBUG = false,
		_FILE_VERSION = 1001,
		_CELL_SIZE = 5,
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
		window.infoScene = director.createScene( );
		window.creditsScene = director.createScene( );
		
		menuScene.activated = function() {
			director.setClear( CAAT.Foundation.Director.CLEAR_ALL );
		};
		
		// UI - Strings and Bars
		game.UI = {
			emptySprite : 	new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 ),
			btns : 			new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'game-btns' ), 2, 4 ),
			emptyBar : 		new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty-bar' ), 1, 1 )
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
			new CAAT.Foundation.Actor( ).
				setLocation( director.width-50, 120 ).
				setScale( 1.6, 1.6 ).
				setPositionAnchor( 1, 0 ).
				setAsButton( 
					game.UI.btns,
					1, 1, 5, 5, 
					function( button ){ 
						if( _DEBUG ) CAAT.log('[Menu] PLAY' );
						director.switchToScene( 1, 2000, false, true );
					} 
				) 
		);
		menuScene.addChild( 
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Info" ).
				setFont( "30px "+game.options.font ).
				setTextFillStyle( "red" ).
				setTextAlign('right').
				setLocation( director.width, 200 ).
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
		
		creditsScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "AOQTD: the game" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				enableEvents( false ).
				setLocation( director.width/2, 100 )
		);
		
		//Info
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
		infoScene.addChild(
			new CAAT.Foundation.UI.TextActor( ).
				setText( "Info blablabla" ).
				setFont( "20px "+game.options.font ).
				setTextFillStyle( "black" ).
				setTextAlign('center').
				setLocation( director.width/2, 100 )
		);
		
		game.setup();
	}
	
	game.setup = function( images ) {		

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
						director.switchToScene( 0, 2000, false, true );
					} ) 
		);
		
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
		
		game.UI.mainString = new CAAT.Foundation.UI.TextActor( ).
			setText( "hello" ).
			setFont( "30px "+game.options.font ).
			setTextFillStyle( "red" ).
			setTextAlign('center').
			setLocation( director.width/2, 80 );
		gameScene.addChild( game.UI.mainString );
		
		game.UI.healthBar = new CAAT.Foundation.UI.ShapeActor().
				setLocation( 500, 9 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#f55' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
		gameScene.addChild( game.UI.healthBar );
		
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