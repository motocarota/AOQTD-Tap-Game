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
			addElement( "bg",		"img/bg.png" ).
			
			load( function onAllAssetsLoaded( images ) {
				startGame( images );
			} 
		);
    }


	function startGame( images ) {

		setupOptions( );
		setupScene( images );
		setupBackground( );
		setupPlayer( );
		setupButtons( );
		setupTimers( );
		setupUI( );

		CAAT.loop( 30 );
	}
	

	function setupScene( images ) {
		
		window.director = new CAAT.Foundation.Director( ).initialize( 900, 600, 'experiment-canvas' );
		window.director.setImagesCache( images );
		window.gameScene = director.createScene( );
		window.menuScene = director.createScene( );
		
		menuScene.activated = function() {
			director.setClear( CAAT.Foundation.Director.CLEAR_ALL );
		};
		var btn = new CAAT.Foundation.Actor( ).
			setAsButton( 
				new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'spell' ), 1, 3 ),
				0, 0, 0, 0,
				function( button ){
					director.switchToPrevScene( 2000, false	, true );
				} ).
			setLocation( 300, 300 );
		menuScene.addChild( btn );

		//NOTA this could be useful for invisibles objects
		gameScene.emptySprite = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'empty' ), 1, 1 );
	}
	
	
	function setupBackground( ) {
		
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
	}
	
	
	function setupButtons( ) {
		
		game.enemies = [];
		game.spells = [];
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
	}
	
	
	function setupPlayer() {
		
		game.player = new CAAT.Mage( );
		game.player.add();
		game.killCount = 0;
	}
	
	
	function setupTimers () { 
		
		game.time = game.options.global_cooldown;
		game.mainTimer = gameScene.createTimer(
			0,
			Number.MAX_VALUE, 
			null,
			function(){ 
				if( game.time-- < 0 ) {
					tick();
					game.time = game.options.global_cooldown;
				} 
			},
			null 
		);
	}
	
	
	function setupUI () {
		
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
	}
	
	
	function tick() {
		
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