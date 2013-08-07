( function( ) {	
	
	var _DEBUG = false,
		_FILE_VERSION = 1001,
		_MAX_BAR_HEIGHT = 22,
		_MAX_BAR_WIDTH = 345,
		waiting = false;
	game.toCreate = 0;
	
	game.status = {
		xp:		0,
		gold: 	0,
		level:	1,
		scores:	[ ]
	};
	
	game.getStatus = function( ) {
		var s = game.status;
		var str = "Level "+s.level+"   XP "+s.xp+"   Gold "+s.gold;
		if ( _DEBUG ) CAAT.log( str );
		return str;
	};
	
	game.save = function( ) {
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
	
	game.setupScene = function( level ) {
		
		if ( _DEBUG ) CAAT.log( "[Game] Loading level "+level );
		
		if ( !is( "Number", level ) ) {
			CAAT.log( "[Game] level is fucked up: "+level+" so I set it to 1" );
			game.level = 1;
		} else {
			game.level = level;
		}
		
		//TODO
		//load custom song, based on level

		game.phase = 0;
		waiting = false;
				
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
			game.player.castSpell( spellIndex, ev.point.x, ev.point.y );
		};
		
		//Player
		game.player = new CAAT.Mage( );
		game.player.add( );
		game.killCount = 0;
		
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
				
				game.UI.spellsBtn[i].mouseDown = loopHelper( i );
				gameScene.addChild( game.UI.spellsBtn[i] );
			} else {
				if ( _DEBUG ) CAAT.log( "[Game] You can't cast "+game.spellList[i]+"! you are level "+game.status.level )
			}
		};
		
		function loopHelper( i ) {
			return function( button ) {
				CAAT.log( "[Game] you choose this spell: ",game.spellList[i] )
				spellIndex = i;
				game.refreshSpellsBtn( );
			}
		}
		
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
		
		//bg
		gameScene.addChild( new CAAT.Foundation.Actor( ).
			enableEvents( false ).
			setLocation( WW, HH-10 ).
			setPositionAnchor( 1, 1 ).
			setBackgroundImage( game.UI.bgSmall ) 
		);
		
		//xp
		gameScene.addChild( new CAAT.Foundation.UI.TextActor( ).
			setText( "Xp: "+game.status.xp ).
			setFont( game.options.fontAlt ).
			setTextFillStyle( "white" ).
			setTextAlign( 'right' ).
			setLocation( WW, HH-10 ).
			setPositionAnchor( 1, 1 )
		);
		
		//gold
		gameScene.addChild( new CAAT.Foundation.UI.TextActor( ).
			setText( "Gold: "+game.status.gold ).
			setFont( game.options.fontAlt ).
			setTextFillStyle( "white" ).
			setTextAlign( 'right' ).
			setLocation( WW, HH-50 ).
			setPositionAnchor( 1, 1 )
		);
		
		// Pause game Button
		gameScene.addChild( 
			new CAAT.Foundation.Actor( ).
				setLocation( ( director.width/2 )-15, 8 ).
				setPositionAnchor( 0, 0 ).
				setAsButton( 
					game.UI.btns,
					0, 0, 5, 5, 
					function( button ){ 
						if( _DEBUG ) CAAT.log( '[Game] Paused' );
						menu.slideTo( 0, true, true ); //MENU_SCENE_ID
					} ) 
		 );
		
		// Lock game Button - rimuovere
		gameScene.addChild( new CAAT.Foundation.Actor( ).
			setAsButton( 
				game.UI.btns,
				3, 3, 8, 8, 
				function( button ){ 
					CAAT.log( '[Main] Game BRUTALLY Stopped = '+!gameScene.paused )
					button.setSpriteIndex( 8 );
					gameScene.setPaused( !gameScene.paused );
				} ).
			setPositionAnchor( 0.5, 1 ).
			setLocation( WW-10, HH )
		 );
		
		// Music game Button - rimuovere
		gameScene.addChild( new CAAT.Foundation.Actor( ).
			setAsButton( 
				game.UI.btns,
				4, 4, 9, 9, 
				function( button ){ button.setSpriteIndex( 9 ) } ).
			setPositionAnchor( 0.5, 1 ).
			setLocation( WW-10, HH-50 )
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
		
		if ( victory ) {
			var score = Math.floor( game.player.getHp() / 50 )+1;
			if ( !game.status.scores[ game.level-1 ] || game.status.scores[ game.level-1 ] < score ) {
				game.status.scores[ game.level-1 ] = score;
				game.status.gold += game.player.gold;
				game.save( );
			}
		} else {
			//NOTA in caso di sconfitta prendi meta' dei px
			game.player.xp = game.player.xp/2;
		}
		menu.updateReport( victory, score );
	};
	
	game.refreshSpellsBtn = function( ) {
		
		for ( var id=0; id < game.UI.spellsBtn.length; id++ ) {
			if( id === spellIndex ) {
				//selected spell icon
				game.UI.spellsBtn[id].setSpriteIndex( id+5 );
			} else {
				if ( game.player.cooldowns[ id ] ) {
					//disabled spell icon
					game.UI.spellsBtn[id].setSpriteIndex( id+10 );
				} else {
					//normal spell icon
					game.UI.spellsBtn[id].setSpriteIndex( id );
				}
			}
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
		var delta = game.status.xp - ( ( 2 * game.status.level ) * 1000 );
		
		if ( delta > 0 ) {
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
		
		game.tickNo++;
		
		//UPDATE PLAYER
		game.player.tick( );
		
		//UPDATE UI
		game.refreshSpellsBtn( );		
		game.UI.hpBar.setSize( _MAX_BAR_WIDTH * game.player.hp / game.options.player.max_hp, _MAX_BAR_HEIGHT );
		game.UI.manaBar.setSize( _MAX_BAR_WIDTH * game.player.mana / game.options.player.max_mana, _MAX_BAR_HEIGHT );
		
		//UPDATE ENEMIES
		for ( e in game.enemies ) {
			game.enemies[ e ].tick( );
		}
		
		// Enemies generation
		if ( waiting ) {
			if ( game.enemies.length === 0 && game.toCreate <= 0 ) {
				waiting = false;
				game.phase++;
			}
		} else {
			var currentWave = game.waves[ game.level ][ game.phase ];
			if ( !currentWave ) { 
				game.over( true );
			} else {
				for ( en in currentWave ) {
					for (var i=0; i < currentWave[ en ]; i++) {
						game.toCreate++;
						helper( en )
					};
				};
				waiting = true;
			}
		}		
	};
	
	function helper( e ){
	
		gameScene.createTimer(
			gameScene.time,
			500*roll( 1, 6 ), 
			function(){ 
				var enemy = new CAAT.Enemy( );
				enemy.add( e );
				enemy.target = game.roots;
				enemy.ai( );
				game.toCreate--;
			},
			null,
			null
		);
	}
} )( );