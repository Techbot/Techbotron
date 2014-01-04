// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid',
{
  init: function() 
  {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y)
  {
    if (x === undefined && y === undefined) 
    {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else 
    {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});


// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// A Tree is just an Actor with a certain color
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 125, 40)');
  },
});

// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 185, 40)');
  },
});

Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('Actor, Fourway, Color, Collision')
        .fourway(4)
        .color('rgb(20, 75, 40)')
        .stopOnSolids()
        // Whenever the PC touches a village, respond to the event
        .onHit('Village', this.visitVillage);
    },

      // Registers a stop-movement function to be called when
      //  this entity hits an entity with the "Solid" component
      stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);

        return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
  
  
   visitVillage: function(data) {
        villlage = data[0].obj;
        villlage.collect();
}
 
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
    init: function() {
    this.requires('Actor, Color')
    .color('rgb(170, 125, 40)');
    },
 
    collect: function() {
    this.destroy();
    }
});

// A puddle is just an Actor with a certain color
Crafty.c('Hero', {
  init: function() {
    this.requires('Actor,Fourway,Color,2D, player, DOM, gravity, controls, collision, animate, audio, health')
    .fourway(4)
    .color('rgb(0, 0, 0)')
  .bind('KeyDown', function () 
  { 
        if (this.isDown('SPACE')) jump(); })
  },
 

 
 
});

Crafty.c('test',{
init: function(){
 Game.Hero = Crafty(Crafty("Hero")[0]);
}
});

/*
Crafty.c("Keyboard", {
  isDown: function (key) {
    if (typeof key === "string") {
      key = Crafty.keys[key];
    }
    
    return !!Crafty.keydown[key];
  }
});
*/

Crafty.c('place', {
   init: function() {
   
   var Hero = Crafty(Crafty("Hero")[0]);
   
    this.requires('2D, Canvas, Grid')
    
    .attr({ x: Hero.x, y: Hero.y, w: 10, h: 10, 
			    dX: Crafty.math.randomInt(2, 5), 
			    dY: Crafty.math.randomInt(2, 5) })
   },
    getCoords: function() {
    
    //puddle = this.puddle;
    return;
},
});  


Crafty.c('ball', {
  init: function() {   
var Hero = Crafty(Crafty("Hero")[0]);
    this.requires("2D, DOM, Color,Grid, Collision,test,Actor")
	.color('rgb(0,0,255)')
	
	.attr({ x: Hero.x, y: Hero.y, w: 10, h: 10, 
			    dX: Crafty.math.randomInt(2, 5), 
			    dY: Crafty.math.randomInt(2, 5) })
   
	
	.bind('EnterFrame', function () 
	{
		
		//Game.Puddle = Crafty(Crafty("Puddle")[0]);
		//distance = square root sqrt  of ( (x2-x1)^2 + (y2-y1)^2) // taken from template011
		//var distance = Math.sqrt(    Math.pow(bullet.x - 100, 2) + Math.pow(bullet.y - destY,2) );
		
		var distance = Math.sqrt(    Math.pow(Hero.x - this.x, 2) + Math.pow(Hero.y - this.y,2) );
		
		if (distance > 100)
		{

       // this.destroy();


		}
		
		
		//hit floor or roof
		if (this.y <= 10 || this.y >= 490)
			this.dY *= -1;

		if (this.x > 910) {
			this.x = 300;
			Crafty("LeftPoints").each(function () { 
				this.text(++this.points + " Points") });
		}
		if (this.x < 10) {
			this.x = 300;
			Crafty("RightPoints").each(function () { 
				this.text(++this.points + " Points") });
		}

		this.x += this.dX;
		this.y += this.dY;
	})
	
	.onHit('Bush', function () {
	    this.dX *= -1;
    })
    
    .onHit('Hero', function () {
	    this.dX *= -1;
	    console.log('bang');
    })

;


}

});



 function jump(){

//var Hero = Crafty(Crafty("Hero")[0]);

Crafty.e('ball').at(Hero.x, Hero.y);

//alert ('hi');
 
}
 
