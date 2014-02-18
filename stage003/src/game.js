Game = 
{
    // This defines our grid's size and the size of each of its tiles
    map_grid: {
        width: 40,
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
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(87, 109, 20)');
         
        
        // Place a tree at every edge square on our grid of 16x16 tiles
        
        //  var Hero =   Crafty.e("Hero,2D, DOM, Color,Collision,Keyboard,Grid").at(250/16, 150/16); 
            Crafty.scene('Loading');
       
        //  var Hero =   Crafty.e("Hero").at(250/16, 150/16); 
    }
}
$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }
