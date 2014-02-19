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
Crafty.c('Zombie', 
{
    init: function() 
    {
        var Zombie      = this;
        var Hero        = Crafty("Hero");


Hero.bind("Moved", function(oldPos) {
   if (oldPos.x < Zombie.x)
      Zombie.flip();
   else
      Zombie.unflip();
});









        this.requires('Actor, Solid,2D, Player,spr_zombie, Fourway,Collision,SpriteAnimation')
        .stopOnSolids()
        .onHit('ball', this.killZombie)
        .onHit('Solid', this.change_direction)
        .bind('EnterFrame', function () 
        {           
            if (Zombie.y > Hero.y)
            {
            
             Zombie.flip;
              var animation_speed = 8;
                d_Zombie_y = -1;
        //        Zombie.reel('PlayerRunningl', 1000, [[1, 0], [1, 1], [1, 2], [1, 3]]);
        //        Zombie.animate('PlayerRunningl', animation_speed, -1);
                
            }
            if (Zombie.y < Hero.y)
            {
              var animation_speed = 8;
                d_Zombie_y = 1;
          //      Zombie.reel('PlayerRunningr', 1000, [[2, 1], [3, 1], [4, 1], [3, 1]]);
        //          Zombie.animate('PlayerRunningr', animation_speed, -1);
            }      
            if (Zombie.x > Hero.x)
            {
            
             Zombie.flip;
              var animation_speed = 8;
                d_Zombie_x = -1;
        //        Zombie.reel('PlayerRunningd', 1000, [[0, 0], [1, 0], [2, 0], [3, 0]]);
     //             Zombie.animate('PlayerRunningd', animation_speed, -1);
            }    

            if (Zombie.x < Hero.x)
            {
              var animation_speed = 8;
                d_Zombie_x = +1;
       //        Zombie.reel('PlayerRunningu', 1000, [[0, 0], [0, 1], [0, 2], [0, 3]]);
      //            Zombie.animate('PlayerRunningu', animation_speed, -1);
            }  
            this.x = this.x + d_Zombie_x;
            this.y = this.y + d_Zombie_y;
      
        })
        
        var animation_speed = 8;
        this.bind('NewDirection', function(data) 
        {
            if (data.x > 0) {
            
            Zombie.flip();
            
            console.log('up');
            
       //    Zombie.reel('PlayerRunningl', 1000, [[3, 0], [4, 0], [5, 0], [3, 3]]);
       //     Zombie.animate('PlayerRunningl', animation_speed, -1);
            }
            
            else if (data.x < 0) 
            {
        //   Zombie.reel('PlayerRunningr', 1000, [[3, 0], [4, 0], [5, 0], [3, 3]]);
      //          Zombie.animate('PlayerRunningr', animation_speed, -1);
           Zombie.unflip();
          
           console.log('up');
          
          
            } 
            
            else if (data.y > 0)
            {
       //   Zombie.reel('PlayerRunningd', 1000, [[3, 0], [4, 0], [5, 0], [3, 3]]);
       //         Zombie.animate('PlayerRunningd', animation_speed, -1);
            Zombie.flip();
            console.log('up');
           
            } 
            
            else if (data.y < 0) 
            {
        //   Zombie.reel('PlayerRunningu', 1000, [[3, 0], [4, 0], [5, 0], [3, 3]]);
        //        Zombie.animate('PlayerRunningu', animation_speed, -1);
           
            console.log('up');
            Zombie.flip();
           
            } 
            
            else {
            this.pauseAnimation();
            }
        });
 
    },
    
    change_direction: function()
        {
           Zombie = this;
           Zombie.d_Zombie_x = -Zombie.d_Zombie_x;
           Zombie.d_Zombie_y = -Zombie.d_Zombie_y;
           
            return this;
          },

    killZombie: function() 
    {
        var Zombie = this;
        Zombie.destroy();
    },
    
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
            if (this.y > 860)
            {
				this.destroy();
			}
        });
       this.tween({ h: 0, w: 0,alpha: 0 }, 420); 
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
        var Zombie = Crafty('Zombie');
        
        Crafty.addEvent(Hero, Crafty.stage.elem, "mousedown", Hero.onMouseDown);
        this.requires('Fourway,Grid,2D, Player,Tween, Controls, Collision,Mouse,Keyboard,Canvas,spr_player,SpriteAnimation')
        .attr({ h: 32, w:32 })
        .fourway(8)
        .stopOnSolids()
        .onHit('Village', this.visitVillage)
        .reel('PlayerMovingUp', 600, 0, 0, 3)
        .reel('PlayerMovingRight', 600, 0, 1, 3)
        .reel('PlayerMovingDown', 600, 0, 2, 3)
        .reel('PlayerMovingLeft', 600, 0, 3, 3);
        
        var animation_speed = 8;
        
        
        /*
        this.bind("Moved", function(oldPos) {
   if (oldPos.x < Zombie.x)
      Zombie.flip();
   else
      Zombie.unflip();
});
        
     */   
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        this.bind('NewDirection', function(data) 
        {
            if (data.x > 0) {
            this.animate('PlayerMovingRight', animation_speed, -1);
            
            Hero.unflip();
            
            
            } else if (data.x < 0) {
            this.animate('PlayerMovingLeft', animation_speed, -1);
             Hero.flip();
            } else if (data.y > 0) {
            this.animate('PlayerMovingDown', animation_speed, -1);
           //  Hero.flip();
            } else if (data.y < 0) {
            this.animate('PlayerMovingUp', animation_speed, -1);
           //  Hero.flip();
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
