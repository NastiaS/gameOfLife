var gameOfLife = {
  width: 80,
  height: 50,
  playing: null,
  stepInterval: 50,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
  


      //Pull the values of each cell and put into an array.
 */   var board = [];
      for (var h = 0; h < this.height; h++){
        board.push([])
        for (var w = 0; w < this.width; w++){
          var cell = document.getElementById(w + '-' + h);
          var dataStatus = cell.className;
          if(dataStatus === 'alive'){
            board[h].push(1)
          }else{
            board[h].push(0)
          }
        }
      }


      for (var h = 0; h < this.height; h++){
        for (var w = 0; w < this.width; w++){
          var cell = document.getElementById(w + '-' + h);
          //determine how many neighbors are alive and how many are dead
          var currentlyAlive = 0;
          if(board[h][w] === 1){
            currentlyAlive++
          }

          var numberAlive = 0;
          if(w != 0 && board[h][w-1] === 1){
            numberAlive++;
          }
          if(w != 0 && h != 0 && board[h-1][w-1] === 1){
            numberAlive++;
          }
          if(w != 0 && h != this.height - 1 && board[h+1][w-1] === 1){
            numberAlive++;
          }

          if(h != 0 && board[h-1][w] === 1){
            numberAlive ++;
          }
          if(h != this.height -1 && board[h+1][w] === 1){
            numberAlive ++;
          }

          if(w != this.width -1 && board[h][w+1] === 1){
            numberAlive ++;
          }
          if(h != this.height-1 && w != this.width -1 && board[h+1][w+1] === 1){
            numberAlive ++;
          }
          if(h != 0 && h != this.height-1 && board[h-1][w+1] === 1){
            numberAlive ++;
          }


          cell.className = iteratorFunc(currentlyAlive, numberAlive);
          //cell.setAttribute('data-status', iteratorFunc(currentlyAlive, numberAlive))
        }
      }
   
  },
  
  setupBoardEvents: function() {


    var onCellClick = function (e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      
      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        //this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        //this.setAttribute('data-status', 'dead');
      }
    };

    for (var h = 0; h < this.height; h++){
      for (var w = 0; w < this.width; w++){
        var cell = document.getElementById(w + '-' + h);
        cell.onclick = onCellClick;

      }
    }
    

    document.getElementById('step_btn').onclick = function(e){gameOfLife.step();};
    document.getElementById('play_btn').onclick = function(e){gameOfLife.enableAutoPlay();}
      document.getElementById('reset_btn').onclick = function(e){gameOfLife.resetRandom();}
    document.getElementById('clear_btn').onclick = function(e){gameOfLife.clearBoard();}
    document.getElementById('stop_btn').onclick = function(e){gameOfLife.stopBoard();}

  },


  step: function () {

    var gameOfLifeRules = function(alive, neighbors){
       
      if (alive === 0){
        if(neighbors === 3){
          return 'alive';
        }
        else return 'dead';

      }
      else {
        if(neighbors === 2 || neighbors === 3){
          return 'alive';
        }
        else return 'dead';

      }
       //Determine whether to return "alive" or "dead"
    };

    this.forEachCell(gameOfLifeRules);

    
  },

  enableAutoPlay: function () {
    var that = this;
    this.playing = window.setInterval(function(){that.step();}, that.stepInterval);
  },

  stopBoard: function(){
    window.clearInterval(this.playing);
  },

  clearBoard: function(){
    this.forEachCell(function(){return 'dead'});
  },

  resetRandom: function(){
  
  function random(){
    //return 'alive' 1/3 the time and 'dead' 2/3 the time.
    var randomNumber = Math.random();
    if(randomNumber <= 0.3){
      return 'alive';
    }
    else return 'dead';
  }

  this.forEachCell(random);

}

};




  gameOfLife.createAndShowBoard();
