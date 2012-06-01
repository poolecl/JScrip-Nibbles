// new javascript file


    globals_a = new holder();

    function init()
    {
      var canvas = document.getElementById("canvas");  
      var ctx = canvas.getContext("2d");  

      
      game = new playfield(canvas);
      player = game.createplayer();
 
  
      game.setbackgroundcolor("rgb(0,0,200)");
      game.setwallcolor("rgb(255,0,0)");
      game.wallhline(0,2,79);
      game.wallhline(0,49,79);
      game.wallvline(0,2,49);
      game.wallvline(79,2,49);


      globals_a.game = game;
      
      //i shoudl be able to do this inside player 
      // when initializing player but it doesn't work
      // our buffer is not ready yet
      game.placeplayer(player);
      placerandompellet(game);
      placerandompellet(game);
      placerandompellet(game);
      placerandompellet(game);
      placerandompellet(game);

      game.redrawall();
     
      game.printtext(0,1,"012345678901234567890");


      window.addEventListener('keydown',keylistener,true);
      
      setInterval(periodic, 100);
    }
    
    function periodic()
    {
      globals_a.game.tick();
    }

    function holder()
    {
      this.game;
    }
        
    function keylistener(evt)
    {
      globals_a.game.keylistener(evt.keyCode);
    }

    


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
      this.players = new Array();
      
      this.WALL = -2;
      this.BACKGROUND = -1;
      this.PELLET = -3;

      this.tick = playfieldtick;

      this.clearfield = playfieldclearfield;
      this.printtext = playfieldprinttext;
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

      this.wallhline = playfieldwallhline;
      this.wallvline = playfieldwallvline;
      this.walblock = playfieldwallblock;
            
      this.keylistener = playfieldkeylistener;

      this.clearfield();
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
          this.players[0].moveup();
          break;
        case 40:  /* Down arrow was pressed */
          this.players[0].movedown();
          break;
        case 37:  /* Left arrow was pressed */
          this.players[0].moveleft();
          break;
        case 39:  /* Right arrow was pressed */
          this.players[0].moveright();
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
      for (i=0;i<this.pellets.length;i++)
      {
        this.pellets[i].draw();
      }

    }
    
    function playfieldredrawall()
    {
      this.redrawarea(0,0,this.WIDTH,this.HEIGHT);
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
      for(x=0;x<=this.WIDTH;x++)
      {
        this.buffer[x] = new Array();
        for(y=0;y<=this.HEIGHT;y++)
        {
          this.buffer[x][y]=this.BACKGROUND;
        }
      }
    }
    
    function playfieldprinttext(x,y,text)
    {
      this.context.fillStyle = "rgb(255,255,255)";
      this.context.font = ""+this.YRES*2-2+"px monospace bold";
      this.context.textBaseline = 'bottom';
      this.context.fillText(text, x*this.XRES+1, (y+1)*this.YRES-1);
    }
    
    function player(playfield, id)
    {
      this.playfield = playfield;
      this.id = id;
      this.color;
      this.tail = new Array();
      this.direction;
      
      this.maxlength = 10;

      this.tick = playertick;
      this.moveup = playermoveup;
      this.movedown = playermovedown;
      this.moveleft = playermoveleft;
      this.moveright = playermoveright;
      this.setcolor = playersetcolor;
      this.setmaxlength = playersetmaxlength;
      this.head = playerhead;

      this.tail.push(new Point(1,3));
      this.direction = new Point(1,0);
      this.setcolor("rgb(255,255,255)");
//      this.playfield.placeplayer(this);

    }
    
    function playerhead()
    {
      return this.tail[this.tail.length-1];
    }
    
    function playersetmaxlength(maxlength)
    {
      this.maxlength = maxlength;
    }
 
    function playertick(x, y)
    {
      this.playfield.redrawarea(0,0,80,2);    
      this.playfield.printtext(2,1,"oldx "+this.head().x+" oldy "+this.head().y+" x "+x+" y "+y+" len "+this.tail.length+" max "+this.maxlength);
      newx = this.head().x+this.direction.x;
      newy = this.head().y+this.direction.y
      while (newx >= this.playfield.WIDTH)
      {
        newx -= this.playfield.WIDTH;
      }
      while (newx < 0)
      {
        newx += this.playfield.WIDTH;
      }
      while (newy >= this.playfield.HEIGHT)
      {
        newy -= this.playfield.HEIGHT - 2;
      }
      while (newy < 2)
      {
        newy += this.playfield.HEIGHT - 2;
      }

      
      this.tail.push(new Point(newx, newy));
      
      while (this.tail.length > this.maxlength)
      {
        butt = this.tail.shift();
        this.playfield.removeplayer(butt.x, butt.y);
      }

      this.playfield.placeplayer(this);
    }
    
    function playermoveup()
    {
      this.direction = new Point(0,-1);
    }
    function playermovedown()
    {
      this.direction = new Point(0,1);
    }
    function playermoveleft()
    {
      this.direction = new Point(-1,0);
    }
    function playermoveright()
    {
      this.direction = new Point(1,0);
    }

    
    function playersetcolor(color)
    {
      this.color = color;
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
      this.playfield.redrawblock(this.getx(), this.getyupper());
      this.playfield.redrawblock(this.getx(), this.getylower());
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