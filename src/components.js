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
   //   this.attr({ x: x , y: y  });
      return this;
    }
  }
});

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Grid,Canvas');
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

Crafty.c('ball', 
{
    speed: 15,
    init: function()     {   
        var ball = this;
        this.requires("2D, DOM, Color, Collision, Canvas");
         this.attr({ h: 5 , w: 5  });
	    this.bind('EnterFrame', function () 
        { 	
        	this.x = this.x + dX;
		    this.y = this.y + dY;
             setTimeout(function () { 
             ball.destroy(); 
             
             }, 200);
    if (this.y > 460) {
				this.destroy();
			}
        });
    },
    at: function(x, y)
  {
    if (x === undefined && y === undefined) 
    {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else 
    {
      //this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      this.attr({ x: x , y: y  });
       return this;
    }
  }
});

Crafty.c('Hero',
{
    init: function() 
    {
        var Hero = this;
        Crafty.addEvent(Hero, Crafty.stage.elem, "mousedown", Hero.onMouseDown);
        this.attr({ x: Hero.x/16 , y: Hero.y/16  });
        this.requires('Fourway,Color,2D, player,Tween, controls, collision,Mouse,Keyboard,Canvas')
        .fourway(8)
        .bind('KeyDown', function (e)
        {
				  //  if(e.keyCode === 32) 
				   // {
				   //  Crafty.e('ball').at(Hero.x,Hero.y);
				 //   }
	    })
    .bind('MouseUp', function(e) {
   if( e.mouseButton == Crafty.mouseButtons.RIGHT )
       console.log("Clicked right button")
	})
        .color('rgb(0, 0, 0)')
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

