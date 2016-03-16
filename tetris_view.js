var view = {

  init: function() {
    this.blockSize = 36;
    var myCanvas = "<canvas id='tetris-canvas' width='" + (MODELS.model.boardWidth * this.blockSize) + "' height='" + ((MODELS.model.boardHeight - 4) * this.blockSize) + "'></canvas>";
    $('.game-board').append(myCanvas);
    this.canvas = $('#tetris-canvas');
    this.context = this.canvas[0].getContext('2d');
    this.moveListener();
  },

  drawBlock: function(row, col, color) {
    var blockXStart = col * this.blockSize;
    var blockYStart = (row - 4) * this.blockSize;
    this.context.fillStyle = color;
    this.context.strokeStyle = "#000";
    this.context.fillRect(blockXStart, blockYStart, this.blockSize, this.blockSize);
    this.context.strokeRect(blockXStart, blockYStart, this.blockSize, this.blockSize);
  },

  blockColors: function(type) {
    var color = "#000";
    switch (type) {
      case 1:
        color = "#33BEB7";
        break;
      case 2:
        color = "#A364D9";
        break;
      case 3:
        color = "#B2C224";
        break;
      case 4:
        color = "#DB3937";
        break;
      case 5:
        color = "#F8A227";
        break;
      case 6:
        color = "#F66320";
        break;
      case 7:
        color = "#FECC2F";
        break;
      case 8:
        color = "#EE6579";
        break;
      case 9:
        color = "#fde500";
        break;
    }
    return color;
  },

  drawBlocks: function(board, block) {
    for ( var row = 4; row < board.length; row++ ) {
      for( var col = 0; col < board[row].length; col++ ) {
        if ( board[row][col] ) {
          this.drawBlock( row, col, this.blockColors(board[row][col]) );
        }
      }
    }

    for ( var row = 0; row < block.grid.length; row++) {
      for (var col = 0; col < block.grid[row].length; col++) {
        if( block.grid[row][col] ) {
          var boardX = block.left + col;
          var boardY = block.top + row;
          this.drawBlock( boardY, boardX, this.blockColors(block.grid[row][col]) )
        }
      }
    }
  },

  update: function(board, block, score) {
    this.context.clearRect(0, 0, MODELS.model.boardWidth * this.blockSize, MODELS.model.boardHeight * this.blockSize);
    this.drawBlocks(board, block);
    this.drawScore(score);
  },

  drawScore: function(score) {
    $("#score-box").html("<h3>Score: <span id='score'>" + score + "</span></h3>");
  },

  showLossMessage: function(score) {
    $("#loss-message").html("<h3>Game Over!</h3>");
    $("#loss-message").append("<h3>Click anywhere to play again!</h3>")
    $(window).on('click', function() {
      location.reload();
    });
  },

  moveListener: function() {
    $(window).on('keydown', function(event) {
      event.preventDefault();
      switch (event.which) {
        case 37:
          controller.moveLeft();
          break;
        case 39:
          controller.moveRight();
          break;
        case 38:
          controller.rotate();
          break
        case 40:
          controller.moveDown();
          break;
        default:
          break;
      }
    })
  }
}
