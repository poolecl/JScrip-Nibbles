// new javascript file


    globals_a = new holder();

    function init()
    {
      var canvas = document.getElementById("canvas");  
      var ctx = canvas.getContext("2d");  

      
      game = new playfield(ctx);
      game.redrawall();
      player = game.createplayer();
 
  
      game.setbackgroundcolor("rgb(0,0,200)");
      game.setwallcolor("rgb(255,0,0)");
      game.wallhline(0,2,79);
      game.wallhline(0,49,79);
      game.wallvline(0,2,49);
      game.wallvline(79,2,49);

      game.redrawall();
     
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.font = "18px monospace bold";
      ctx.textBaseline = 'bottom';
      ctx.fillText("012345678901234567890", 0, 20-1);

      globals_a.context = ctx;
      globals_a.game = game;
      globals_a.player = player;
      
      //i shoudl be able to do this inside player 
      // when initializing player but it doesn't work
      // our buffer is not ready yet
      game.placeplayer(player);


      window.addEventListener('keydown',keylistener,true);
      
      setInterval(periodic, 100);
    }
    
    function periodic()
    {
      globals_a.game.tick();
    }

    function holder()
    {
      this.context;
      this.game;
      this.player;
    }
        
    function keylistener(evt)
    {
      switch (evt.keyCode)
      {
        case 38:  /* Up arrow was pressed */
          globals_a.player.moveup();
          break;
        case 40:  /* Down arrow was pressed */
          globals_a.player.movedown();
          break;
        case 37:  /* Left arrow was pressed */
          globals_a.player.moveleft();
          break;
        case 39:  /* Right arrow was pressed */
          globals_a.player.moveright();
          break;
      }
    }

    


    function playfield(context)
    {
      this.context = context;
      this.xres = 10;
      this.yres = 10;
      this.backgroundcolor;
      this.wallcolor;
      this.context;
      this.buffer;
      this.players = new Array();
      
      this.WALL = -2;
      this.BACKGROUND = -1;

      this.tick = playfieldtick;

      this.clearfield = playfieldclearfield;
      this.createplayer = playfieldcreateplayer;
      this.placeplayer = playfieldplaceplayer;
      this.removeplayer = playfieldremoveplayer;

      this.setbackgroundcolor = playfieldsetbackgroundcolor;
      this.setwallcolor = playfieldsetwallcolor;

      this.redrawall = playfieldredrawall;
      this.redrawarea = playfieldredrawarea;
      this.redrawblock = playfieldredrawblock;

      this.wallhline = playfieldwallhline;
      this.wallvline = playfieldwallvline;
      this.walblock = playfieldwallblock;

      this.clearfield();
      this.setbackgroundcolor("rgb(0,0,0)");
      this.setwallcolor("rgb(255,255,255)");
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
      if (this.buffer[x][y] != this.BACKGROUND)
      {
        alert("bang!");
        //this.players[player.id].direction = new Point(0,0)
      }
      else
      {
        // this is where we should collision detect of course!!!
        this.buffer[x][y] = player.id;
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
    }
    
    function playfieldredrawall()
    {
      this.redrawarea(0,0,80,50);
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
        default:
          color = this.players[this.buffer[x][y]].color;
          break;
          
      }
      this.context.fillStyle = color;
      this.context.fillRect(x*this.xres, y*this.yres, this.xres, this.yres);
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
      for(x=0;x<=80;x++)
      {
        this.buffer[x] = new Array();
        for(y=0;y<=50;y++)
        {
          this.buffer[x][y]=this.BACKGROUND;
        }
      }
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
      this.playfield.context.fillStyle = "rgb(255,255,255)";
      this.playfield.context.font = "18px monospace bold";
      this.playfield.context.textBaseline = 'bottom';
      this.playfield.context.fillText("oldx "+this.head().x+" oldy "+this.head().y+" x "+x+" y "+y+" len "+this.tail.length+" max "+this.maxlength, 20, 20-1);

      this.tail.push(new Point(this.head().x+this.direction.x, this.head().y+this.direction.y));
      
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
    function Point(x, y)
    {
      this.x = x || 0;
      this.y = y || 0;
    }
