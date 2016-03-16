var view = {

  init: function() {
    this.blockSize = 36;
    var myCanvas = "<canvas id='tetris-canvas' width='" + (model.boardWidth * this.blockSize) + "' height='" + (model.boardHeight * this.blockSize) + "'></canvas>";
    $('.game-board').append(myCanvas);
    this.canvas = $('#tetris-canvas');
    this.context = this.canvas[0].getContext('2d');
    this.moveListener();
  },

  drawBlock: function(i, j) {
    var blockXStart = j * this.blockSize;
    var blockYStart = i * this.blockSize;
    this.context.fillStyle = '#1188bb';
    this.context.strokeStyle = "#000";
    this.context.fillRect(blockXStart, blockYStart, this.blockSize, this.blockSize);
    this.context.strokeRect(blockXStart, blockYStart, this.blockSize, this.blockSize);
  },

  drawBlocks: function(board, block) {
    for ( var i = 0; i < board.length; i++ ) {
      for( var j = 0; j < board[i].length; j++ ) {
        if ( board[i][j] === 1 ) {
          this.drawBlock( i, j );
        }
      }
    }

    for ( var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if( block.grid[i][j] === 1 ) {
          var boardX = block.left + j;
          var boardY = block.top + i;
          this.drawBlock( boardY, boardX )
        }
      }
    }
  },

  update: function(board, block) {
    this.context.clearRect(0, 0, model.boardWidth * this.blockSize, model.boardHeight * this.blockSize);
    this.drawBlocks(board, block);
    this.context.fillStyle = "#555";
    this.context.fillRect( 0, 0, model.boardWidth * this.blockSize, 2 * this.blockSize );
  },

  moveListener: function() {
    $(window).on('keydown', function() {
      switch (event.which) {
        case 37:
          model.moveBlockLeft();
          break;
        case 39:
          model.moveBlockRight();
          break;
        case 38:
          model.rotate();
          break
        default:
          break;
      }
    })
  }
}
