(function() {	
	var _DEBUG = false;
	
	CAAT.Projectile = function( ) {
		CAAT.Spell.superclass.constructor.call( this );

        this.caster = null;
        this.target = null;
		this.x = 0;
		this.y = 0;
		
		return this;
	}
	
	CAAT.Projectile.prototype = {
	    
	    setup : function( caster ){

			var name = game.projList[ this.typeId ];
			this.caster = caster;
			this.target = caster.target;
			this.x = caster.x;
			this.y = caster.y;
			
			if ( _DEBUG ) CAAT.log("[Projectile] Setup ( "+this.typeId+" -> "+name+" ) -> ", game.projBook[ name ] );
            
			var data = deepExtend( this, game.projBook[ name ] );
			
			if ( data.initPath ){
				if ( _DEBUG ) CAAT.log( "[Spell] custom Path" );
				this.travel.path = data.initPath( this.caster.x, this.caster.y, this.target.x, this.target.y );
			} else {
				
				if ( _DEBUG ) CAAT.log( "[Spell] standard path" )
				this.travel.path = new CAAT.PathUtil.Path( ).
					setLinear( this.caster.x, this.caster.y, this.target.x, this.target.y );
			}
			
			if ( data.initEffect ) {
			    if ( _DEBUG ) CAAT.log( "[Spell] custom Effect" );
				this.effect = data.initEffect( );
			}
			
			if ( _DEBUG && _SHOW_PATH ) {
				gameScene.addChild( new CAAT.PathActor().
					setPath( this.travel.path ).
					setFrameTime( gameScene.time, this.travel.duration ).
					setBounds( 0, 0, director.width, director.height ).
					setInteractive( false )
				);
			}
			this.id = name+roll( 1, 999 );
			this.name = name;
		},
        
	    
	    effect: function() {
	        if( _DEBUG ) CAAT.log( "[Projectile] "+this.id+' effect procced!' );
	        game.player.damage( roll );
	        this.die();
	    },
	    
	    land: function ( ) {
			if( _DEBUG ) CAAT.log( "[Projectile] "+this.id+' is landed!' );	
			this.effect( this.target );
		}
	};
	
	
	game.projBook = {};
	game.projList = [ 'arrow', 'rock'];
})();