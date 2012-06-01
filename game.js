// new javascript file


    globals_a = new holder();

    function init()
    {
      var canvas = document.getElementById("canvas");  
      var ctx = canvas.getContext("2d");  

      
      game = new playfield(canvas);
      controls = new playcontrol(game);
      controls.setlevel(new levelsplash(game, controls));
      
//      player = game.createplayer();
 
  
//      game.setbackgroundcolor("rgb(0,0,200)");
//      game.setwallcolor("rgb(255,0,0)");
//      game.wallhline(0,2,79);
//      game.wallhline(0,49,79);
//      game.wallvline(0,2,49);
//      game.wallvline(79,2,49);


      globals_a.controls = controls;
      
      //i shoudl be able to do this inside player 
      // when initializing player but it doesn't work
      // our buffer is not ready yet
  //    game.placeplayer(player);
   //   placerandompellet(game);
   //   placerandompellet(game);
   //   placerandompellet(game);
   //   placerandompellet(game);
  //    placerandompellet(game);

   //   game.redrawall();
     
   //   game.printtext(0,1,"012345678901234567890");


      window.addEventListener('keydown',keylistener,true);
      
      setInterval(periodic, 100);
    }
    
    function periodic()
    {
      globals_a.controls.tick();
    }

    function holder()
    {
      this.controls;
    }
        
    function keylistener(evt)
    {
      globals_a.controls.keylistener(evt.keyCode);
    }

    


    
    function placerandompellet(playfield)
    {
      pelleto = new pellet(playfield,
                          Math.floor(Math.random()*playfield.WIDTH),
                          Math.floor(Math.random()*(playfield.HEIGHT-2))+2,
                          Math.floor(Math.random()*10));
      while (!playfield.placepellet(pelleto))
      {
        pelleto = new pellet(playfield,
                            Math.floor(Math.random()*playfield.WIDTH),
                            Math.floor(Math.random()*(playfield.HEIGHT-2))+2,
                            Math.floor(Math.random()*10));
      }
      return pelleto;
    }

    function pellet(playfield, x, y, value)
    {
      this.playfield = playfield
      this.x = x;
      this.y = y;
      this.value = value;
      
      this.getx = pelletgetx;
      this.getylower = pelletgetylower;
      this.getyupper = pelletgetyupper;
      this.getyother = pelletgetyother;
      this.draw = pelletdraw;
    }
    
    
    function pelletdraw()
    {
      this.playfield.printtext(this.getx(), this.getylower(), ""+this.value);
    }

    function pelletgetx()
    {
      return this.x;
    }
    
    function pelletgetylower()
    {
      if (this.y%2 == 0)
      {
        return this.y+1;
      }
      else
      {
        return this.y;
      }    
    }
    function pelletgetyupper()
    {
      if (this.y%2 == 0)
      {
        return this.y;
      }
      else
      {
        return this.y-1;
      }    
    }

    function pelletgetyother(y)
    {
      if (this.getyupper == y)
      {
        return this.getylower();
      }
      else if (this.getylower == y)
      {
        return this.getyupper();
      }
      else
      {
        return y;
      }
    }

    function Point(x, y)
    {
      this.x = x || 0;
      this.y = y || 0;
    }