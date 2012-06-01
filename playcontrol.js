    function playcontrol(playfield)
    {
      this.playfield = playfield
      this.level;
      
      this.setlevel = playcontrolsetlevel;

      this.keylistener = playcontrolkeylistener;
      this.tick = playcontroltick;
    }

    function playcontrolsetlevel(level)
    {
      this.level = level;
    }

    function playcontrolkeylistener(keycode)
    {
      if (!(this.level === undefined))
      {
        this.level.keylistener(keycode)
      }
    }
    
    function playcontroltick()
    {
      if (!(this.level === undefined))
      {
        this.level.tick()
      }
    }
    
    