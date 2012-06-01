function level1(playfield, control)
    {
      this.playfield = playfield;
      this.control = control;
      this.ticking = false;

      this.keylistener = level1keylistener;
      this.tick = level1tick;

      this.playfield.setbackgroundcolor("rgb(0,0,200)");
      this.playfield.setwallcolor("rgb(255,0,0)");

      this.playfield.clearfield();
      
      this.playfield.wallhline(0,2,79);
      this.playfield.wallhline(0,49,79);
      this.playfield.wallvline(0,2,49);
      this.playfield.wallvline(79,2,49);

      this.playfield.redrawall();
            
      player = this.playfield.createplayer(); 
  
      //i shoudl be able to do this inside player 
      // when initializing player but it doesn't work
 //     // our buffer is not ready yet
      this.playfield.placeplayer(player);
      placerandompellet(this.playfield);
      placerandompellet(this.playfield);
      placerandompellet(this.playfield);
      placerandompellet(this.playfield);
      placerandompellet(this.playfield);

      this.playfield.redrawall();

     
      this.playfield.printtext(0,1,"012345678901234567890");

      this.ticking = true;
      
      
    }

    function level1keylistener(keycode)
    {
      if (this.ticking)
      {
        this.playfield.keylistener(keycode);
      }
    }
    
    function level1tick()
    {
      if (this.ticking)
      {
        this.playfield.tick();
      }
    }