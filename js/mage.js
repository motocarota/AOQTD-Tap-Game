(function() {	
	var _DEBUG = 1;
	
	CAAT.Mage = function( ) {
		CAAT.Mage.superclass.constructor.call( this );

		this.x = 140;
		this.y = 120;
		
		this.mana = 100;
		this.targetSpell = 0;
		this.item = { charges : 0 };
		this.cooldowns = {};
		return this;
	}
	
	CAAT.Mage.prototype = {
		
		add : function () {

			if ( _DEBUG ) CAAT.log('[Mage] add');

			// Tree
			var treeImage = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'tree' ), 1, 1 );
			var treeSprite = new CAAT.Foundation.Actor( ).
				setLocation( -15, -30 ).
				setScale( 0.9, 0.9 ).
				enableEvents( false ).
				setBackgroundImage( treeImage );

			var reset= function( s, time ) {
				s.playAnimation( "stand" );
			};

			var playerImage = new CAAT.Foundation.SpriteImage( ).initialize( director.getImage( 'player' ), 2, 3).
				addAnimation("stand",   [0,1], 200).
				addAnimation("cast",    [2,3,4,3,5,3,2], 150, reset);

			this.setScale( 0.7, 0.7 ).
				setLocation( this.x, this.y ).
				setPositionAnchor( 0.5, 0.5 ).
				setBackgroundImage( playerImage );
						
			game.bg.addChild( treeSprite );
			game.bg.addChild( this );
			
			this.playAnimation("fall");
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
				this.playAnimation("cast");
				spell = new CAAT.Spell( id, x, y );
				
				if ( this.mana > spell.cost ) {
					spell.add( );
					this.mana -= spell.cost;
					if ( spell.cooldown ) {
						this.cooldowns[ id ] = spell.cooldown;
						spellIndex = 0;
						game.player.notify('back to mm	')
					}
				} else { 
					CAAT.log( "[Mage] out of mana "+this.mana+" / "+spell.cost ) 
				}
			} else {  
				if ( _DEBUG ) CAAT.log('[Mage] cant cast, spell is in cooldown '+this.cooldowns[ id ] );
			}
			return spell;
		},
		
		tick : function () {
			
			for ( c in this.cooldowns ){
				this.cooldowns[ c ]--;
			}
			this.mana = ( this.mana < game.options.max_mana ) ? 
				this.mana + game.options.tick_mana : 
				game.options.max_mana;
		}
	};
	
	extend( CAAT.Mage, CAAT.Player );
	
})();