var MODELS = MODELS || {};

MODELS.model = {
  // board has filled and empty spaces
  // check if coordinates overlap filled space
  // blockList: [],
  boardHeight: 24,
  boardWidth: 12,
  board: [],

  init: function() {
    this.score = 0;
    for(var row=0; row < this.boardHeight; row++) {
      this.board.push(Array(this.boardWidth));
    };
    this.generateBlock();
    this.playing = true;
  },

  update: function() {
    if ( this.playing ) {
      this.moveDown();
      this.checkLines();
      this.checkLoss();
    }
  },

  stopBlock: function() {
    for(var row = 0; row < this.currentBlock.grid.length; row++) {
      for(var col = 0; col < this.currentBlock.grid[row].length; col++) {
        var boardX = this.currentBlock.left + col;
        var boardY = this.currentBlock.top + row;

        if (this.currentBlock.grid[row][col]) {
          this.board[boardY][boardX] = this.currentBlock.grid[row][col];
        }
      }
    }
  },

  generateBlock: function() {
    this.currentBlock = new MODELS.Block();
  },

  moveBlockLeft: function() {
    var validMove = true;
    for(var row = 0; row < this.currentBlock.grid.length; row++) {
      for(var col = 0; col < this.currentBlock.grid[row].length; col++) {
        var boardX = this.currentBlock.left + col;
        var boardY = this.currentBlock.top + row;
        var leftBorder = this.board[boardY][boardX - 1];
        if ( this.currentBlock.grid[row][col] && ( leftBorder || boardX - 1 < 0 ) ) {
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
    for(var row = 0; row < this.currentBlock.grid.length; row++) {
      for(var col = 0; col < this.currentBlock.grid[row].length; col++) {
        var boardX = this.currentBlock.left + col;
        var boardY = this.currentBlock.top + row;
        var rightBorder = this.board[boardY][boardX + 1];
        if ( this.currentBlock.grid[row][col] && ( rightBorder || boardX + 1 > this.boardWidth - 1 ) ) {
          validMove = false;
        };
      }
    };

    if (validMove) {
      this.currentBlock.left++;
    };
  },

  moveDown: function() {
    if ( this.playing ) {
      for(var row = 0; row < this.currentBlock.grid.length; row++) {
        for(var col = 0; col < this.currentBlock.grid[row].length; col++) {
          var boardX = this.currentBlock.left + col;
          var boardY = this.currentBlock.top + row;
          if (  this.currentBlock.grid[row][col] && (
                this.atBottom(boardY) || this.board[boardY + 1][boardX] ) ) {
            this.stopBlock();
            this.generateBlock();
            return true;
          }
        }
      }
      this.currentBlock.top++;
    }
  },

  checkLines: function() {
    for(var row = 4; row < this.boardHeight; row++) {
      var blockTally = 0;
      for(var col = 0; col < this.boardWidth; col++) {
        if (this.board[row][col]) {
          blockTally++;
        }
      }
      if ( blockTally === this.boardWidth ) {
        this.board.splice(row, 1);
        this.board.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
        this.score += 10;
      }
    }
  },

  checkLoss: function() {
    for ( var row = 0; row < 4; row++) {
      for ( var col = 0; col < this.boardWidth; col++ ) {
        if ( this.board[row][col] ) {
          this.playing = false;
          controller.lose();
        }
      }
    }
  },

  atBottom: function(y) {
    return ( y + 1 ) >= ( this.boardHeight );
  },

  outOfBounds: function(x,y) {
    return x >= this.boardWidth || x < 0 || y >= this.boardHeight || y < 0
  },

  rotate: function() {
    this.currentBlock.rotate();
    for(var row = 0; row < this.currentBlock.grid.length; row++) {
      for(var col = 0; col < this.currentBlock.grid[row].length; col++) {
        var boardX = this.currentBlock.left + col;
        var boardY = this.currentBlock.top + row;

        if ( this.currentBlock.grid[row][col] && ( this.board[boardY][boardX] || this.outOfBounds(boardX,boardY) ) ) {
          this.currentBlock.reverseRotate();
        };
      }
    };
  },

  reverseRotate: function() {
    this.currentBlock.reverseRotate();
  },

}
