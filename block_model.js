var MODELS = MODELS || {};

MODELS.Block = function() {
  var type = MODELS.pieceTypes[ Math.floor( Math.random() * MODELS.pieceTypes.length ) ];
  this.grid = [];
  for ( var i = 0; i < MODELS.pieces[type].length; i++ ) {
    this.grid[i] = MODELS.pieces[type][i];
  }

  this.top = 0;
  this.left = Math.floor( Math.random() * 7 + 1 );
};

MODELS.Block.prototype.emptyGrid = function(rows) {
  var emptyGrid = [];
  for ( var row = 0; row < rows; row++) {
    emptyGrid[row] = [];
  }
  return emptyGrid;
};

MODELS.Block.prototype.cleanGrid = function() {
  for ( var row = this.grid.length - 1; row >= 0; row-- ) {
    if ( this.grid[row] === undefined ) {
      this.grid.pop();
      continue;
    }
  }
};

MODELS.Block.prototype.rotate = function() {
  var newGrid = this.emptyGrid( this.grid[0].length );
  for ( var row = 0; row < this.grid.length; row++ ) {
    for ( var col = 0; col < this.grid[row].length; col++ ) {
      newGrid[col][row] = this.grid[row][(this.grid[0].length - 1)-col];
    }
  }
  for ( var i = 0; i < this.grid.length; i++ ) {
    this.grid[i] = newGrid[i];
  }
  this.cleanGrid();
};

MODELS.Block.prototype.reverseRotate = function() {
  var newGrid = this.emptyGrid( this.grid[0].length );
  for ( var row = 0; row < this.grid.length; row++ ) {
    for ( var col = 0; col < this.grid[row].length; col++ ) {
      newGrid[col][row] = this.grid[(this.grid.length - 1)-row][col];
    }
  }
  for ( var i = 0; i < this.grid.length; i++ ) {
    this.grid[i] = newGrid[i];
  }
  this.cleanGrid();
};

MODELS.Block.prototype.moveDown = function() {

};

MODELS.pieceTypes = [ "square", "line", "rightL", "leftL", "leftS", "rightS", "tPiece", "single", "double", "triple", "miniL", "bigL", "bigT", "plus", "bigC", "leftG", "rightG" ];

MODELS.pieces = {

  square: [ [1,1],
            [1,1] ],

  line: [   [0,0,2,0],
            [0,0,2,0],
            [0,0,2,0],
            [0,0,2,0],],

  rightL: [ [0,3,0],
            [0,3,0],
            [0,3,3] ],

  leftL: [  [0,4,0],
            [0,4,0],
            [4,4,0] ],

  leftS:  [ [5,0,0],
            [5,5,0],
            [0,5,0] ],

  rightS: [ [0,0,6],
            [0,6,6],
            [0,6,0] ],

  tPiece: [ [0,7,0],
            [7,7,7],
            [0,0,0] ],

  single: [ [8] ],

  double: [ [0,9],
            [0,9] ],

  triple: [ [0,1,0],
            [0,1,0],
            [0,1,0] ],

  miniL:  [ [2,0],
            [2,2] ],

  bigL:   [ [3,0,0],
            [3,0,0],
            [3,3,3] ],

  bigT:   [ [0,4,0],
            [0,4,0],
            [4,4,4] ],

  plus:   [ [0,5,0],
            [5,5,5],
            [0,5,0] ],

  bigC:   [ [6,6,0],
            [6,0,0],
            [6,6,0] ],

  leftG:  [ [0,7,0],
            [7,7,0],
            [7,7,0] ],

  rightG: [ [0,8,0],
            [0,8,8],
            [0,8,8] ]
};
