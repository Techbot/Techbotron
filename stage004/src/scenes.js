Crafty.scene('Loading', function(){

		Crafty.e('2D, DOM, Text')
			.attr({ x: 0, y: 200 - 24, w: 200 })
			.text('Loading...');





	// Load our sprite map image
	Crafty.load([
	'assets/dorm-tiles-red.png', 
	'assets/player.png',
	'assets/zombie.png',
	'http://desolate-caverns-4829.herokuapp.com/assets/door_knock_3x.mp3', 
	'http://desolate-caverns-4829.herokuapp.com/assets/door_knock_3x.ogg', 
	'http://desolate-caverns-4829.herokuapp.com/assets/door_knock_3x.aac'], 
	
	function(){
		// Once the images are loaded...

		Crafty.sprite(32, 'assets/dorm-tiles-red.png', {
			spr_tree:    [6, 2],
			spr_bush:    [3, 3],
			spr_village: [0, 1]
		});

		// Define the PC's sprite to be the first sprite in the third row of the
		//  animation sprite map
		Crafty.sprite(32, 'assets/player.png', {
			spr_player:  [0, 2],
		}, 0, 2);
        Crafty.sprite(32, 'assets/zombies.png', {
			spr_zombie:  [0, 0],
		}, 0, 2);




		// Now that our sprites are ready to draw, start the game
		Crafty.scene('Game');
	})
});

// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() 
{
 
    this.occupied = new Array(Game.map_grid.width);
    
    for (var i = 0; i < Game.map_grid.width; i++) 
    {
        this.occupied[i] = new Array(Game.map_grid.height);
        for (var y = 0; y < Game.map_grid.height; y++) 
        {
            this.occupied[i][y] = false;
        }
    }

    var Hero =   Crafty.e("Hero").at(10, 10); 
 this.occupied[10][10] = true;
    // Player character, placed at 5, 5 on our grid
    //this.Hero = Crafty.e('Hero').at(5, 5);
    //this.occupied[this.Hero.at().x][this.Hero.at().y] = true;

////////////////////////////////////////////////////////////////////////    
    
    for (var x = 0; x < Game.map_grid.width; x++)
    {
        for (var y = 0; y < Game.map_grid.height; y++)
        {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
         
            if (at_edge) 
            {
                // Place a tree entity at the current tile
                Crafty.e('Tree').at(x, y);
                this.occupied[x][y] = true;
          
            } 
                
            else if (Math.random() < 0.06 && !this.occupied[x][y]) 
         
        {
        
           if (Math.random() < 0.06 ) 
            {
            // Place a bush entity at the current tile
            // var bush_or_rock = (Math.random() > 0.3) ? 'Bush' : 'Rock';
            Crafty.e('Zombie').at(x, y);
           
            }
            
            else
             {
            // Place a bush entity at the current tile
            // var bush_or_rock = (Math.random() > 0.3) ? 'Bush' : 'Rock';
            Crafty.e('Bush').at(x, y);
            this.occupied[x][y] = true;
            }
            
         } 
   
           
 
            
            
        }
    }
 /////////////////////////////////////////////////////////////////////       
    var max_villages = 5;
    for (var x = 0; x < Game.map_grid.width; x++)
    {
        for (var y = 0; y < Game.map_grid.height; y++)
        {
            if (Math.random() < 0.03)
            {
               
                 
                if (Crafty('Village').length < max_villages && !this.occupied[x][y])
              
              //  if (Crafty('Village').length < max_villages)
                {
                   Crafty.e('Village').at(x, y);
                }
            }
        }
    }

////////////////////////////////////////////////////////////////////////    
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
  
});
Game.start();
