var MODELS = MODELS || {};

var model = {
  // board has filled and empty spaces
  // check if coordinates overlap filled space
  // blockList: [],
  boardHeight: 24,
  boardWidth: 10,
  board: [],

  init: function() {
    for(var i=0; i < this.boardHeight; i++) {
      this.board.push(Array(this.boardWidth));
    };
    this.board.push([1,1,1,1,1,1,1,1,1,1]);
    this.generateBlock("leftL",0,3);
  },

  update: function() {
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        var boardX = this.currentBlock.left + j;
        var boardY = this.currentBlock.top + i;
        console.log(this.currentBlock.grid)
        if ( this.currentBlock.grid[i][j] === 1 && this.board[boardY + 1][boardX] === 1 ) {
          this.stopBlock();
          this.generateBlock("square",0, 3);
          return true;
        }
      }
    }
    this.currentBlock.top++;

    this.checkLines();
  },

  stopBlock: function() {
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        var boardX = this.currentBlock.left + j;
        var boardY = this.currentBlock.top + i;

        if (this.currentBlock.grid[i][j] === 1) {
          this.board[boardY][boardX] = 1;
        }
      }
    }
  },

  generateBlock: function(type,y,x) {
    console.log("generating block")
    this.currentBlock = new MODELS.Block(type,x,y);
  },

  moveBlockLeft: function() {
    var validMove = true;
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        var boardX = this.currentBlock.left + j;
        var boardY = this.currentBlock.top + i;
        var leftBorder = this.board[boardY][boardX - 1];
        if ( this.currentBlock.grid[i][j] === 1 && ( leftBorder === 1 || boardX - 1 < 0 ) ) {
          validMove = false;
        };
      }
    }

    if (validMove) {
      this.currentBlock.left--;
    };
  },

  moveBlockRight: function() {
    var validMove = true;
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        var boardX = this.currentBlock.left + j;
        var boardY = this.currentBlock.top + i;
        var rightBorder = this.board[boardY][boardX + 1];
        if ( this.currentBlock.grid[i][j] === 1 && ( rightBorder === 1 || boardX + 1 > 9 ) ) {
          validMove = false;
        };
      }
    };

    if (validMove) {
      this.currentBlock.left++;
    };
  },

  checkLines: function() {
    for(var row = 0; row < this.boardHeight; row++) {
      var blockTally = 0;
      for(var col = 0; col < this.boardWidth; col++) {
        if (this.board[row][col] === 1) {
          blockTally++;
        }
      }
      if ( blockTally === this.boardWidth ) {
        this.board.splice(row, 1);
        this.board.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
      }
    }
  }

}
