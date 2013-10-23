(function() {	
	var _DEBUG = false;
	
	CAAT.Mage = function( ) {
		CAAT.Mage.superclass.constructor.call( this );

		this.x = 135;
		this.y = 130;
		
		this.xp = 0;
		this.gold = 0;
		this.mana = 100;
		this.targetSpell = 0;
		this.item = { charges : 0 };
		this.cooldowns = {};
		return this;
	}
	
	CAAT.Mage.prototype = {
		
		getHp: function() {
			
			if ( _DEBUG ) CAAT.log('[Mage] getHp ->'+this.hp);
			 return this.hp;
		},
		
		addMana: function( n ) {
			if ( _DEBUG ) { CAAT.log('[Player] add '+n+' Mana points ('+this.mana+')') }
			this.mana = _.min( [ this.mana + n, game.options.player.max_mana ] );
			return this.mana;
		},
		
		add : function () {

			if ( _DEBUG ) CAAT.log('[Mage] add');

			// Tree
			var treeSprite = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'tree' ), 1, 1 );
			this.tree = new CAAT.Foundation.Actor( ).
				setLocation( -15, -30 ).
				setScale( 0.9, 0.9 ).
				enableEvents( false ).
				setBackgroundImage( treeSprite );
			
			var reset= function( s, time ) {
				s.playAnimation( "stand" );
			};

			var playerImage = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'player' ), 2, 3).
				addAnimation("stand",   [0,1], 200).
				addAnimation("cast",    [2,3,4,3,5,3,2], 150, reset);

			this.setScale( 0.6, 0.6 ).
				setLocation( this.x, this.y ).
				setPositionAnchor( 0.5, 0.5 ).
				setBackgroundImage( playerImage );
						
			game.bg.addChildAt( this.tree, 1 );
			game.bg.addChild( this );
			
			this.playAnimation( "stand" );
		},
		
		
		castSpell : function ( id, x, y ) {
			
			if ( _DEBUG ) CAAT.log('[Mage] casts a spell id:'+id+' at ('+x+','+y+')');
			var spell = null;
			
			// Wand and Scroll
			if( this.item.charges > 0 ) {
				this.playAnimation("cast");
				spell = new CAAT.Spell( this.item.spellId, x, y ).add( );
				this.item.charges--;
				if ( this.item.type === "wand" ) 
					game.player.notify( this.item.charges+' charges left' );
				return;
			}
			
			if ( !this.cooldowns[ id ] || this.cooldowns[ id ] < 0 ) {
				
				spell = new CAAT.Spell( id, x, y );
				if ( this.mana > spell.cost ) {
					this.playAnimation("cast");
					spell.add( );
					this.mana -= spell.cost;
					if ( spell.cooldown ) {
						this.cooldowns[ id ] = spell.cooldown;
						spellIndex = 0;
						game.player.notify('back to mm	')
					}
				} else { 
					game.player.notify( "Out of Mana!" );
					if ( _DEBUG ) CAAT.log( "[Mage] out of mana "+this.mana+" / "+spell.cost ) 
				}
			} else {  
				if ( _DEBUG ) CAAT.log('[Mage] cant cast, spell is in cooldown '+this.cooldowns[ id ] );
			}
			return spell;
		},
		
		tick : function () {
			
			if ( this.getHp() <= 0 )
				this.die();
			for ( c in this.cooldowns ){
				if ( this.cooldowns[ c ] && this.cooldowns[ c ] > 0 ) 
					this.cooldowns[ c ]--;
				else {
					delete this.cooldowns[ c ];
				}
			}
			this.addMana( game.options.tick_mana );
		},
		
		die: function() {
			
			game.over( false );
		}
	};
	
	extend( CAAT.Mage, CAAT.Player );
	
	// Roots e' l'elemento che i nemici attaccheranno per abbattere l'albero su cui e' superdrow
	game.roots = {
		
		x: 70, y: 250,
		height: 280, width: 50,
		id: "roots",
		
		damage : function( amount, element ) {
			
			if ( _DEBUG ) CAAT.log('[Roots] receive '+amount+' points of '+element+" damage" );
			
			game.player.notifyAt( "-"+amount, { x: this.x, y: this.y }, 'red' );
			game.player.damage( amount, element );
		}
	};
})();