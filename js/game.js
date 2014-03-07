( function( ) {	
	
	var _DEBUG = 1,//false,
		_FILE_VERSION = 1001,
		_MAX_BAR_HEIGHT = 22,
		_MAX_BAR_WIDTH = 345,
		waiting = false;
	game.toCreate = 0;
	game.active = false;
	game.waveTimer = 0;
	
	game.status = {
		xp:		0,
		gold: 	0,
		level:	1,
		scores:	[ ]
	};
	
	game.getStatus = function( ) {
		return game.status;
	};
	
	game.save = function( ) {
		if ( game.status.level >= 10 && game.status.xp >= 10000 ) {
			game.status.xp = 10000;
		}
		localStorage.setItem( "status", JSON.stringify( this.status ) );
	};
	
	game.load = function( ) {
		
		var info = {
			xp:		0,
			gold: 	0,
			level:	1,
			scores:	[ ]
		};
		this.status = localStorage.getItem( "status" ) ? JSON.parse( localStorage.getItem( "status" ) ) : info;
	};
	
	game.setupScene = function( level, options ) {
		
		if ( _DEBUG ) CAAT.log( "[Game] Loading level "+level+" at difficulty: "+game.difficulty );

		game.active = true;
		waiting = false;
		gameScene.timerManager.timerList = []; //clear previous timers
		
		menu.resumeBtn.setVisible( true );
		
		// Background
		game.bg = new CAAT.Foundation.ActorContainer( ).
			setBounds( 0, 0, director.width, director.height ).
			setFillStyle( 'white' ).
			enableEvents( true );

		gameScene.addChild( game.bg );
		
		game.bg.addChild( 
			new CAAT.Foundation.Actor( ).
				setBounds( 0, 0, director.width, director.height ).
				setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg-'+level ), 1, 1 ) ).
				enableEvents( false )	
		 );
		
		game.bg.mouseDown = function( ev ) {
			game.player.castSpell( ev.point.x, ev.point.y );
		};
		
		//Player
		game.player = new CAAT.Mage( );
		game.player.add( );
		game.killCount = 0;
		
		for (var i = game.enemies.length - 1; i >= 0; i--){ //loop inverso per non fottersi con gli splice
			game.enemies[i].die( { loot: false } );
		};
		game.enemies = [];
		game.spells = [];
		
		//UI - Spell Buttons
		game.UI.spellsBtn = [];
		for ( var i=0; i < game.spellList.length; i++ ) {
			if ( game.status.level / 2 > i ) {
				game.UI.spellsBtn[i] = new CAAT.Foundation.Actor( ).
					setLocation( 30+i*120, director.height-70 ).
					setBackgroundImage( game.UI.icons ).
					enableEvents( true ).
					setSpriteIndex( i );
				game.UI.spellsBtn[i].mouseDown = btnHelper( i );
				gameScene.addChild( game.UI.spellsBtn[i] );
			} else {
				if ( _DEBUG ) CAAT.log( "[Game] You can't cast "+game.spellList[i]+"! you are level "+game.status.level )
			}
		};
		
		function btnHelper( i ) {
			return function( button ) {
				CAAT.log( "[Game] you choose this spell: ",game.spellList[i] )
				spellIndex = i;
				game.refreshSpellsBtn( );
			}
		}
		
		//UI - Item Button		
		game.UI.itemBtn = new CAAT.Foundation.Actor( ).
			setLocation( 30, director.height-170 ).
			setBackgroundImage( game.UI.items ).
			setScale( 0.8, 0.8 ).
			setVisible( false ).
			enableEvents( true );
		
		game.UI.itemBtn.mouseDown = game.player.useItem;
		gameScene.addChild( game.UI.itemBtn );
		
		// Main string
		game.UI.mainString = new CAAT.Foundation.UI.TextActor( ).
			setText( "" ).
			setFont( "30px "+game.options.font ).
			setTextFillStyle( "red" ).
			setTextAlign( 'center' ).
			setLocation( director.width/2, 80 );
		gameScene.addChild( game.UI.mainString );
		
		// Player bars
		game.UI.hpBar = new CAAT.Foundation.UI.ShapeActor( ).
				setLocation( 78, 15 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#f55' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
		
		game.UI.manaBar = new CAAT.Foundation.UI.ShapeActor( ).
				setLocation( 78, 35 ).
				setSize( _MAX_BAR_WIDTH, _MAX_BAR_HEIGHT ).
				setFillStyle( '#79f' ).
				setShape( CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE ).
				enableEvents( false ).
				setStrokeStyle( '#fff' );
		
		gameScene.addChild( game.UI.hpBar );
		gameScene.addChild( game.UI.manaBar );
		
		//UI - Player Info
		//empty bar
		gameScene.addChild( new CAAT.Foundation.Actor( ).
			enableEvents( false ).
			setLocation( 10, 0 ).
			setBackgroundImage( game.UI.infoCharBg ) 
		);
		
		//level
		gameScene.addChild( new CAAT.Foundation.UI.TextActor( ).
			setText( game.status.level ).
			setFont( game.options.font ).
			setTextFillStyle( "white" ).
			setTextAlign( 'center' ).
			setLocation( 53, -10 )
		);
		
		//wave
		game.UI.waveLabel = new CAAT.Foundation.UI.TextActor( ).
			setText( "" ).
			setFont( game.options.fontAlt ).
			setTextFillStyle( "#f00" ).
			setLocation( WW-10, HH ).
			setPositionAnchor( 1, 1 );
		
		gameScene.addChild( game.UI.waveLabel );
		
		// Pause game Button
		gameScene.addChild( 
			new CAAT.Foundation.Actor( ).
				setLocation( ( director.width/2 )-15, 0 ).
				setPositionAnchor( 0, 0 ).
				setAsButton( 
					game.UI.btns,
					0, 0, 5, 5, 
					function( button ){ 
						if( _DEBUG ) CAAT.log( '[Game] Paused' );
						menu.slideTo( 0, true, true ); //MENU_SCENE_ID
					} ) 
		 );
				
		if ( _DEBUG ) {
			game.UI.debugString = new CAAT.Foundation.UI.TextActor( ).
				setText( "file version: "+_FILE_VERSION ).
				setFont( "20px arial" ).
				setTextAlign( 'right' ).
				setLocation( director.width-5, director.height-25 );

			gameScene.addChild( game.UI.debugString );
		}
				
		//Timers
		game.time = game.options.global_cooldown;
		game.mainTimer = gameScene.createTimer( 
			0,
			Number.MAX_VALUE, 
			null,
			function( ){ 
				if( game.time-- < 0 ) {
					game.tick( );
					game.time = game.options.global_cooldown;
				}
			},
			null 
		 );
	};

	game.over = function( victory ) {
		
		game.active = false;
		game.save( );
		menu.updateReport( victory, score );
		game.bg.emptyChildren();
	};
	
	game.refreshSpellsBtn = function( ) {

		for ( var id=0; id < game.UI.spellsBtn.length; id++ ) {
			if( id === spellIndex ) {
				game.UI.spellsBtn[id].setSpriteIndex( id+5 ); 			//selected spell icon
			} else {
				if ( game.player.cooldowns[ id ] ) {
					game.UI.spellsBtn[id].setSpriteIndex( id+10 );		//disabled spell icon
				} else {
					game.UI.spellsBtn[id].setSpriteIndex( id ); 		//normal spell icon
				}
			}
		}
		
		if ( spellIndex === "item" ) {
			game.UI.itemBtn.setScale( 1.3, 1.3 );
		} else {
			game.UI.itemBtn.setScale( 0.8, 0.8 );
		}
	};
	
	game.checkLevelUp = function ( ) {
		
		if ( !is( "Number", game.player.xp ) ){
			CAAT.log( '[Game] warning: error with xp gained format' );
		}
		if ( !is( "Number", game.status.xp ) || !is( "Number", game.status.level ) ) {
			CAAT.log( '[Game] warning: error with xp / level format' );
			game.status.xp = 0;
			game.status.level = 1;
		}
		
		game.status.xp += game.player.xp;
		var delta = game.status.xp - ( game.status.level * 1000 );
		
		if ( delta > 0 && game.status.level < game.options.levelCap ) {
			game.status.xp = delta;
			game.status.level++;
			game.save( );
			return true;
		} else {
			game.save( );
			return false;
		}
	};
	
	game.tick = function( ) {
		
		//UPDATE PLAYER
		game.player.tick( );
		
		//UPDATE UI
		game.refreshSpellsBtn( );		
		game.UI.hpBar.setSize( _MAX_BAR_WIDTH * game.player.hp / game.options.player.max_hp, _MAX_BAR_HEIGHT );
		game.UI.manaBar.setSize( _MAX_BAR_WIDTH * game.player.mana / game.options.player.max_mana, _MAX_BAR_HEIGHT );
		
		//UPDATE ENEMIES
		game.enemies = _.sortBy( game.enemies, 'y' );
		for ( var i=0; i < game.enemies.length; i++ ) {
			game.enemies[i].tick();
			game.bg.setZOrder( game.enemies[i], i+2 ); //+2 perche'ci sono anche l'albero e il mage
		};
		
		//ENEMIES CREATION
		var wave = 1;
		if ( game.waveTimer++ % 20 === 0 ) {
			console.log( "game.waveTimer"+game.waveTimer+" OK" );
			game.UI.waveLabel.setText( 'Wave: '+wave );
			game.summon( { qty: 5+wave, extra: false } );
			wave++;
		}
	};
	
	game.summon = function( opts ){
		
		if ( _DEBUG ) CAAT.log( "[Game] Summoning ", opts );
		if ( !opts ) {
			opts = { qty:1, extra:true };
		}
		if ( !opts.qty || !is( 'Number', opts.qty ) || opts.qty < 1 ) {
			opts.qty = 1;
		}
		for (var i=0; i < opts.qty; i++) {
			gameScene.createTimer(
				gameScene.time,
				( opts.extra ) ? 0 : 250*roll( 1, 30 ), 
				function(){ 
					var enemy = new CAAT.Enemy( );
					var en = game.enemiesList[ _.random( game.enemiesList.length ) ];
					console.log( 'summoning a '+en )
					enemy.add( en, opts.extra );
					enemy.target = game.roots;
					enemy.ai( );
					if ( !opts.extra ) {
						game.toCreate--;
					}
				},
				null,
				null
			);
		};
	}
} )( );