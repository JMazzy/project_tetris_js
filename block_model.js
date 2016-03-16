var MODELS = MODELS || {};

MODELS.Block = function() {
  var type = MODELS.pieceTypes[ Math.floor( Math.random() * MODELS.pieceTypes.length ) ];
  this.grid = [];
  for ( var i = 0; i < MODELS.pieces[type].length; i++ ) {
    this.grid[i] = MODELS.pieces[type][i];
  };

  this.top = 0;
  this.left = 3;
};

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
