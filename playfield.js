function playfield(canvas)
    {
      this.canvas = canvas;
      this.context = canvas.getContext("2d");  
      this.WIDTH = 80;
      this.HEIGHT = 50
      this.XRES = this.canvas.width/this.WIDTH;
      this.YRES = this.canvas.height/this.HEIGHT;
      this.pellets = new Array();

      this.backgroundcolor;
      this.wallcolor;
      this.context;
      this.buffer;
      this.textbuffer;
      this.players = new Array();
      
      this.WALL = -2;
      this.BACKGROUND = -1;
      this.PELLET = -3;

      this.tick = playfieldtick;

      this.clearfield = playfieldclearfield;
      this.printtext = playfieldprinttext;
      this.printtextcenter = playfieldprinttextcenter;
      this.createplayer = playfieldcreateplayer;
      this.placeplayer = playfieldplaceplayer;
      this.removeplayer = playfieldremoveplayer;

      this.placepellet = playfieldplacepellet;
      this.removepelletat = playfieldremovepelletat;

      this.setbackgroundcolor = playfieldsetbackgroundcolor;
      this.setwallcolor = playfieldsetwallcolor;

      this.redrawall = playfieldredrawall;
      this.redrawarea = playfieldredrawarea;
      this.redrawblock = playfieldredrawblock;
      this.redrawtext = playfieldredrawtext;

      this.wallhline = playfieldwallhline;
      this.wallvline = playfieldwallvline;
      this.walblock = playfieldwallblock;
            
      this.keylistener = playfieldkeylistener;

      this.setbackgroundcolor("rgb(0,0,0)");
      this.setwallcolor("rgb(255,255,255)");
    }

    function playfieldkeylistener(keycode)
    {
    // this should be modified to
    // not assume the player 0 in the future
      switch (keycode)
      {
        case 38:  /* Up arrow was pressed */
          for (i=0;i<this.players.length;i++)
          {
            this.players[i].moveup();
          }
          break;
        case 40:  /* Down arrow was pressed */
          for (i=0;i<this.players.length;i++)
          {
            this.players[i].movedown();
          }
          break;
        case 37:  /* Left arrow was pressed */
          for (i=0;i<this.players.length;i++)
          {
            this.players[i].moveleft();
          }
          break;
        case 39:  /* Right arrow was pressed */
          for (i=0;i<this.players.length;i++)
          {
            this.players[i].moveright();
          }
          break;
      }
    }
    
    function playfieldplacepellet(pellet)
    {
      if ((this.buffer[pellet.getx()][pellet.getyupper()] == this.BACKGROUND) && (this.buffer[pellet.getx()][pellet.getylower()] == this.BACKGROUND))
      {
        this.buffer[pellet.getx()][pellet.getyupper()] = this.PELLET;
        this.buffer[pellet.getx()][pellet.getylower()] = this.PELLET;
        this.pellets.push(pellet);
        return true;
      }
      else
      {
        return false;
      }
    }
        
    function playfieldremovepelletat(x,y)
    {
      for (i=0;i<this.pellets.length;i++)
      {
        if ((this.pellets[i].getx() == x ) && 
           ((this.pellets[i].getylower() == y) || (this.pellets[i].getyupper() == y )))
        {
          this.buffer[this.pellets[i].getx()][this.pellets[i].getyupper()] = this.BACKGROUND;
          this.buffer[this.pellets[i].getx()][this.pellets[i].getylower()] = this.BACKGROUND;
          this.redrawblock(this.pellets[i].getx(),this.pellets[i].getyupper());
          this.redrawblock(this.pellets[i].getx(),this.pellets[i].getylower());
          this.pellets.splice(i,1);
        }
      }
    }

    function playfieldcreateplayer()
    {
      newplayer = new player(this, this.players.length);
      this.players.push(newplayer);
      return newplayer;
    }

    // place a players piec at location x,y by the id number id
    function playfieldplaceplayer(player)
    {
      x = player.head().x;
      y = player.head().y;
      switch (this.buffer[x][y])
      {
        case this.BACKGROUND:
          this.buffer[x][y] = player.id;
          break;
        case this.WALL:
          alert("bang!");
          break;
        case this.PELLET:
          alert("yum!");
          this.removepelletat(x,y);
          this.buffer[x][y] = player.id;
          player.maxlength+=10;
          placerandompellet(this);
          break;
        default:
          alert("bonk!");
          break;
          
      }
      this.redrawblock(x,y);
    }
    
    function playfieldremoveplayer(x,y,id)
    {
      this.buffer[x][y] = this.BACKGROUND;
      this.redrawblock(x,y);
    }

    function playfieldtick()
    {
      for(i=0;i<this.players.length;i++)
      {
        this.players[i].tick();
      }
      // this update should be done elsewhere and more selectivly?
  //    for (i=0;i<this.pellets.length;i++)
  //   {
  //      this.pellets[i].draw();
  //    }

    }
    
    function playfieldredrawall()
    {
      this.redrawarea(0,0,this.WIDTH,this.HEIGHT);
      this.redrawtext();
    }

    function playfieldredrawarea(x, y, w, h)
    {
      for(xx=x;xx<=x+w;xx++)
      {
        for(yy=y;yy<=y+h;yy++)
        {
          this.redrawblock(xx,yy);
        }
      }
    }

    function playfieldredrawblock(x, y)
    {
      var color;
      switch (this.buffer[x][y])
      {
        case this.BACKGROUND:
          color = this.backgroundcolor;
          break;
        case this.WALL:
          color = this.wallcolor;
          break;
      //temporary code to make pellets stand out more
        case this.PELLET:
          color = "rgb(0,0,0)";
          break;
        default:
          color = this.players[this.buffer[x][y]].color;
          break;
          
      }
      this.context.fillStyle = color;
      this.context.fillRect(x*this.XRES, y*this.YRES, this.XRES, this.YRES);
    }

    function playfieldsetbackgroundcolor(color)
    {
      this.backgroundcolor = color;
    }
    function playfieldsetwallcolor(color)
    {
      this.wallcolor = color;
    }

    function playfieldwallhline(x,y,len)
    {
      for (o=0;o<=len;o++)
      {
        this.buffer[x+o][y] = this.WALL;
      }
    }
    function playfieldwallvline(x, y, len)
    {
      for (o=0;o<=len;o++)
      {
        this.buffer[x][y+o] = this.WALL;
      }
    }

    function playfieldwallblock(x, y)
    {
      this.buffer[x][y] = this.WALL;
    }

    function playfieldclearfield()
    {
      this.buffer=new Array();
      this.textbuffer=new Array();
      for(x=0;x<=this.WIDTH;x++)
      {
        this.buffer[x] = new Array();
        this.textbuffer[x] = new Array();
        for(y=0;y<=this.HEIGHT;y++)
        {
          this.buffer[x][y]=this.BACKGROUND;
          this.textbuffer[x][y]="";
        }
      }
    }
    
    function playfieldredrawtext()
    {
      this.context.fillStyle = "rgb(255,255,255)";
      this.context.font = ""+this.YRES*2-2+"px monospace bold";
      this.context.textBaseline = 'bottom';

      for(x=0;x<=this.WIDTH;x++)
      {
        for(y=0;y<=this.HEIGHT;y++)
        {
          if (this.textbuffer[x][y].length == 1)
          {
            this.context.fillText(this.textbuffer[x][y], (x)*this.XRES+1, (y+1)*this.YRES-1);
          }
        }
      }
    }

    function playfieldprinttext(x,y,text)
    {
      x = Math.floor(x);
      y = Math.floor(y);
      
      for(i=0; i<text.length; i++)
      {
        this.textbuffer[x+i][y] = text.charAt(i);
      }
    }

    function playfieldprinttextcenter(y,text)
    {
      this.printtext((this.WIDTH / 2) + 1 - (text.length / 2),y,text);
    }