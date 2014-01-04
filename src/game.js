
Game = 
{
    // This defines our grid's size and the size of each of its tiles
    map_grid: {
        width: 60,
        height: 40,
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
   
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    // Initialize and start our game
    
    start: function() 
    {
    
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


Crafty.e("Hero,2D, DOM, Color,Grid, Collision,Keyboard").at(25, 15); 

//Score boards
Crafty.e("LeftPoints, DOM, 2D, Text")
	.attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
	.text("0 Points");
	
Crafty.e("RightPoints, DOM, 2D, Text")
	.attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
	.text("0 Points");
  }
}
