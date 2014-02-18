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

//////////////////////////////////////////////////////////

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Grid,Canvas');
  },
});

/////////////////////////////////////////////////////////
Crafty.c('Rock', 
{
    init: function() 
    {
        var Rock        = this;
        var Hero        = Crafty("Hero");
        var d_rock_x    = 0;     
        var d_rock_y    = 0;
        this.requires('Actor, Solid, Color, Collision')
        .color('rgb(100, 125, 140)')
        .onHit('ball', this.killRobot)
        .bind('EnterFrame', function () 
        {           
            if (Rock.y>Hero.y)
            {
                d_rock_y = -1;
            }
            if (Rock.y<Hero.y)
            {
                d_rock_y = 1;
            }      
            if (Rock.x>Hero.x)
            {
                d_rock_x = -1;
            }    

            if (Rock.x<Hero.x)
            {
                d_rock_x = +1;
            }  
            this.x = this.x + d_rock_x;
            this.y = this.y + d_rock_y;
        });
    },

    killRobot: function() 
    {
        var Rock = this;
        Rock.destroy();
    }
});

// A Tree is just an Actor with a certain color
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor,spr_tree, Solid')
      
  },
});

// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, spr_bush, Solid')
     
  },
});

 // A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village',
{
    init: function() 
    {
        this.requires('Actor, spr_village')
    },
    collect: function() 
    {
        this.destroy();
    }
});

/////////////////////////////////////////////////////////

Crafty.c('ball', 
{
    speed: 25,
    init: function()
    {   
        var ball = this;
        this.requires("2D, Color, Collision,Tween, Canvas, spr_player");
        this.attr({ h: 5 , w: 5 });
	    this.bind('EnterFrame', function () 
        { 	
        	this.x = this.x + dX;
		    this.y = this.y + dY;
            setTimeout(function () 
            { 
                ball.destroy(); 
            }, 320);
            if (this.y > 460)
            {
				this.destroy();
			}
        });
       this.tween({ h: 0, w: 0,alpha: 0 }, 220); 
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

///////////////////////////////////////////////////////////////

Crafty.c('Hero',
{
    init: function() 
    {
        var Hero = this;
        Crafty.addEvent(Hero, Crafty.stage.elem, "mousedown", Hero.onMouseDown);
        this.requires('Fourway,Grid, Player,Tween, Controls, Collision,Mouse,Keyboard,Canvas,spr_player,SpriteAnimation')
        .attr({ h: 15, w:15 })
        .fourway(8)
        .stopOnSolids()
        .onHit('Village', this.visitVillage)
        .reel('PlayerMovingUp', 600, 0, 0, 3)
        .reel('PlayerMovingRight', 600, 0, 1, 3)
        .reel('PlayerMovingDown', 600, 0, 2, 3)
        .reel('PlayerMovingLeft', 600, 0, 3, 3);
        
        var animation_speed = 8;
        this.bind('NewDirection', function(data) 
        {
            if (data.x > 0) {
            this.animate('PlayerMovingRight', animation_speed, -1);
            } else if (data.x < 0) {
            this.animate('PlayerMovingLeft', animation_speed, -1);
            } else if (data.y > 0) {
            this.animate('PlayerMovingDown', animation_speed, -1);
            } else if (data.y < 0) {
            this.animate('PlayerMovingUp', animation_speed, -1);
            } else {
            this.pauseAnimation();
            }
        });
     },   
        // Registers a stop-movement function to be called when
        // this entity hits an entity with the "Solid" component
        stopOnSolids: function()
        {
            this.onHit('Solid', this.stopMovement);
            return this;
        },

        // Stops the movement
        stopMovement: function() 
        {
            this._speed = 0;
            if (this._movement)
            {
                this.x -= this._movement.x;
                this.y -= this._movement.y;
            }
        },

        // Respond to this player visiting a village
        visitVillage: function(data)
        {
            villlage = data[0].obj;
            villlage.collect();
        }
});
