( function( ) {	
	
	var _DEBUG = false,
		_FILE_VERSION = 2000,
		_MAX_BAR_HEIGHT = 22,
		_MAX_BAR_WIDTH = 345,
		waiting = false;
	game.toCreate = 0;
	game.active = false;
	game.timer = 0;
	game.wave = 1;
	
	game.getStatus = function( ) {
		return game.score;
	};
	
	game.save = function( score ) {
		localStorage.setItem( "score", score );
	};
	
	game.load = function( ) {
		
		this.score = localStorage.getItem( "score" ) || 0;
	};
	
	game.setupScene = function( ) {
		
		if ( _DEBUG ) CAAT.log( "[Game] Loading level");

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
				setBackgroundImage( new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'bg-1' ), 1, 1 ) ).
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
			game.enemies[i].die( );
		};
		game.enemies = [];
		game.spells = [];
		
		//UI - Spell Buttons
		game.UI.spellsBtn = [];
		//TODO ogni 20 nemici, sbloccare uno spell
		for ( var i=0; i < game.spellList.length-1; i++ ) {
			game.UI.spellsBtn[i] = new CAAT.Foundation.Actor( ).
				setLocation( 30+i*120, director.height-70 ).
				setBackgroundImage( game.UI.icons ).
				enableEvents( true ).
				setSpriteIndex( i );
			game.UI.spellsBtn[i].mouseDown = btnHelper( i );
			gameScene.addChild( game.UI.spellsBtn[i] );
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

	game.over = function( score ) {
		
		game.active = false;
		game.save( );
		menu.updateReport( score );
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
		
		if ( !is( "Number", game.score ) ) {
			CAAT.log( '[Game] warning: bad score saved' );
			game.score = 0;
		}
		
		if ( game.score < game.killCount ) { 
			// new record
			game.save( game.killCount );
			return true;
		}
	};
	
	game.tick = function( ) {
		
		//UPDATE PLAYER
		game.player.tick( );
		
		//UPDATE UI
		game.refreshSpellsBtn( );
		game.UI.waveLabel.setText( 'Kills: '+game.killCount );
		game.UI.hpBar.setSize( _MAX_BAR_WIDTH * game.player.hp / game.options.player.max_hp, _MAX_BAR_HEIGHT );
		game.UI.manaBar.setSize( _MAX_BAR_WIDTH * game.player.mana / game.options.player.max_mana, _MAX_BAR_HEIGHT );
		
		//UPDATE ENEMIES
		game.enemies = _.sortBy( game.enemies, 'y' );
		for ( var i=0; i < game.enemies.length; i++ ) {
			game.enemies[i].tick();
			game.bg.setZOrder( game.enemies[i], i+2 ); //+2 perche'ci sono anche l'albero e il mage
		};
		
		//ENEMIES CREATION
		if ( game.timer++ % 15 === 0 ) {
			game.summon( { qty: 5+game.wave, extra: false } );
			game.wave++;
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
				( opts.summoned ) ? 0 : 250*roll( 1, 30 ), 
				function(){ 
					var enemy = new CAAT.Enemy( );
					var src = opts.summoned ? game.summonsList : game.enemiesList;
					var en = src[ _.random( src.length -1 ) ];
					if ( _DEBUG ) CAAT.log( '[Game] summoning a '+en )
					enemy.add( en, opts );
					enemy.target = game.roots;
					enemy.ai( );
					if ( !opts.summoned ) {
						game.toCreate--;
					}
				},
				null,
				null
			);
		};
	}
} )( );