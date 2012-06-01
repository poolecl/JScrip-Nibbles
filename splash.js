function levelsplash(playfield, control)
    {
      this.playfield = playfield;
      this.control = control;

      this.keylistener = levelsplashkeylistener;
      this.tick = levelsplashtick;
      
      this.playfield.setbackgroundcolor("rgb(0,0,0)");
      this.playfield.setwallcolor("rgb(255,0,0)");
      this.playfield.clearfield();

      this.playfield.printtextcenter(4*2-1, "J S c r i p   N i b b l e s");
      this.playfield.printtextcenter(6*2-1, "Copyright     (C) Christopher Poole 2012");
      this.playfield.printtextcenter(8*2-1, "Nibbles is a game for one or two players.  Navigate your snakes");
      this.playfield.printtextcenter(9*2-1, "around the game board trying to eat up numbers while avoiding");
      this.playfield.printtextcenter(10*2-1, "running into walls or other snakes.  The more numbers you eat up*2-1,");
      this.playfield.printtextcenter(11*2-1, "the more points you gain and the longer your snake becomes.");
      this.playfield.printtextcenter(13*2-1, " Game Controls ");
      this.playfield.printtextcenter(15*2-1, "  General             Player 1               Player 2    ");
      this.playfield.printtextcenter(16*2-1, "                        (Up)                   (Up)      ");
      this.playfield.printtextcenter(17*2-1, "P - Pause                ^                      W       ");
      this.playfield.printtextcenter(18*2-1, "                     (Left) <   > (Right)   (Left) A   D (Right)  ");
      this.playfield.printtextcenter(19*2-1, "                         \/                     S       ");
      this.playfield.printtextcenter(20*2-1, "                       (Down)                 (Down)     ");
      this.playfield.printtextcenter(24*2-1, "Press any key to continue");
      
      this.playfield.redrawall();
    }

    function levelsplashkeylistener(keycode)
    {
      this.control.setlevel(new level1(this.playfield, this.control));
    }
    
    function levelsplashtick()
    {
    }