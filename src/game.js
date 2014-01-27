Game = 
{
    // This defines our grid's size and the size of each of its tiles
    map_grid: {
        width: 50,
        height: 30,
        tile: {
            width: 16,
            height: 16
            }
        },
    // The total width of the game screen. Since our grid takes up the entire screen
    // this is just the width of a tile times the width of the grid
    width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
    },
    // The total height of the game screen. Since our grid takes up the entire screen
    // this is just the height of a tile times the height of the grid
   
    height: function() 
    {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    // Initialize and start our game
    start: function() 
    {
        Crafty.load( [ 'enemyUFO.png'], function () 
        {
	        Crafty.sprite(99, 75, 'enemyUFO.png', { spr_ship: [0, 0] });
            Crafty.bind('Click', function() 
            {
                console.log("Clicked!!");
            })
        });
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(249, 223, 125)');
        // Place a tree at every edge square on our grid of 16x16 tiles
        
        
        
        
        
         for (var x = 0; x < Game.map_grid.width; x++)
        {
            for (var y = 0; y < Game.map_grid.height; y++)
            {
                var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
         
                if (at_edge) {
                // Place a tree entity at the current tile
                Crafty.e('Tree').at(x, y);
                } else if (Math.random() < 0.01) {
                // Place a bush entity at the current tile
                Crafty.e('Bush').at(x, y);
                }
            }
        }
        
        var max_villages = 5;
        for (var x = 0; x < Game.map_grid.width; x++)
        {
            for (var y = 0; y < Game.map_grid.height; y++)
            {
                if (Math.random() < 0.02)
                {
                    Crafty.e('Village').at(x, y);
                     
                    if (Crafty('Village').length >= max_villages)
                    {
                       // return;
                    }
                }
            }
        }
        
          
/////////////////////////////////////////////////////
        var Hero =   Crafty.e("Hero,2D, DOM, Color,Collision,Keyboard,Grid").at(250/16, 150/16); 
        
        
        Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e)
        {
             console.log(e.realY , Hero.y,e.realX , Hero.x );
            Crafty.e('ball').at(Hero.x,Hero.y);
            
/////////////////////////////////////////////////////////////////// 
  if (e.realY >= Hero.y+30)
            {
                 if (e.realX >= Hero.x + 30)
                {
                     dX = 10;
                }
                else if (e.realX <= Hero.x - 30)
                {
                    dX = -10;
                }
                else
                {
                    dX = 0;
                }
                dY = 10;
            }
///////////////////////////////////////////////////////////////////        
     else if (e.realY+30 <= Hero.y)
            {
               if (e.realX < Hero.x - 50)
                {
                     dX = -10;
                }
                else if (e.realX > Hero.x + 50)
                {
                    dX = 10;
                }
                else
                {
                    dX = 0;
                }
                dY = -10;
            }
//////////////////////////////////////////////////////////////////////
       else if (e.realX >= Hero.x+30)
            {
            
            
            
                if (e.realY-130 >= Hero.y )
                {
                     dY = 10;
                }
                else if (e.realY+310 <= Hero.y )
                {
                    dY = -10;
                }
                else
                {
                    dY = 0;
                }
                dX=10;
            }
///////////////////////////////////////////////////////////////////        
            else if (e.realX+30 <= Hero.x)
            {
                if (e.realY+330 <= Hero.y )
                {
                    dY = -10;
                }
                else if (e.realY-330 >= Hero.y )
                {
                    dY = 10;
                }
                else
                {
                    dY = 0;
                }
                dX=-10;
            }
///////////////////////////////////////////////////////////////////        
         
///////////////////////////////////////////////////////////////////        
	    });
        Crafty.addEvent(this, Crafty.stage.elem, "mouseUp", this.mouseUpHandler);
        Crafty.stage.elem.click();
        Crafty.trigger("mousedown");
    }
}
