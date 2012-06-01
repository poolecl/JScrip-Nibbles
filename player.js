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