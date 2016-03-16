var MODELS = MODELS || {};

MODELS.Block = function() {
  var type = MODELS.pieceTypes[ Math.floor( Math.random() * MODELS.pieceTypes.length ) ];
  this.grid = [];
  for ( var i = 0; i < MODELS.pieces[type].length; i++ ) {
    this.grid[i] = MODELS.pieces[type][i];
  };

  this.top = 0;
  this.left = Math.floor( Math.random() * 7 );
};

MODELS.Block.prototype.rotate = function() {
  var newGrid = [[],[],[],[]];
  for ( var row = 0; row < 4; row++ ) {
    for ( var col = 0; col < 4; col++ ) {
      newGrid[col][row] = this.grid[row][col];
    }
  }
  for ( var i = 0; i < 4; i++ ) {
    this.grid[i] = newGrid[i];
  };
}

MODELS.pieceTypes = [ "square", "line", "rightL", "leftL", "leftS", "rightS", "tPiece" ];

MODELS.pieces = {

  square: [ [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0] ],

  line: [   [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0] ],

  rightL: [ [0,0,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,1,0] ],

  leftL: [  [0,0,0,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,1,1,0] ],

  leftS: [  [0,0,0,0],
            [0,0,1,0],
            [0,1,1,0],
            [0,1,0,0] ],

  rightS: [ [0,0,0,0],
            [0,1,0,0],
            [0,1,1,0],
            [0,0,1,0] ],

  tPiece: [ [0,0,0,0],
            [0,0,1,0],
            [0,1,1,0],
            [0,0,1,0] ],

};
