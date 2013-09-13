(function() {	
	var _DEBUG = false;
	
	CAAT.Projectile = function( ) {
		CAAT.Spell.superclass.constructor.call( this );

		this.x = 0;
		this.y = 0;
		
		return this;
	}
	
	CAAT.Projectile.prototype = {
	    
	    setup : function( ){

			var name = game.projList[ this.typeId ];
			
			//TODO prendere questi dati dal caster
			this.x = 10;
			this.y = 10;
			
			if ( _DEBUG ) CAAT.log("[Projectile] Setup ( "+this.typeId+" -> "+name+" ) -> ", game.projBook[ name ] );
            
			var data = deepExtend( this, game.projBook[ name ] );
			
			if ( data.initPath ){
				if ( _DEBUG ) CAAT.log( "[Spell] custom Path" );
				this.travel.path = data.initPath( this.dest.x, this.dest.y );
			} else {
				
				if ( _DEBUG ) CAAT.log( "[Spell] standard path" )
				this.travel.path = new CAAT.PathUtil.Path( ).
					setLinear( this.x, this.y, game.player.x, game.player.y );
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
			this.effect();
		},
	    

	};
	
	
	game.projBook = {};
	game.projList = [ 'arrow', 'rock'];
})();