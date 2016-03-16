var controller = {
  init: function() {
    var d = new Date();
    this.lastTime = d.getTime();
    this.moveInterval = 600; //ms
    MODELS.model.init();
    view.init();
  },

  decreaseInterval: function() {
    if ( this.moveInterval > 100 ) {
      this.moveInterval--;
    }
  },

  update: function() {
    var d = new Date();
    var newTime = d.getTime();
    var deltaTime = newTime - this.lastTime;

    // Only update if enough time has elapsed
    if ( deltaTime > this.moveInterval ) {
      this.lastTime = newTime;
      MODELS.model.update();
      view.update( MODELS.model.board, MODELS.model.currentBlock, MODELS.model.score );
    }

  },

  moveRight: function() {
    MODELS.model.moveBlockRight();
  },

  moveLeft: function() {
    MODELS.model.moveBlockLeft();
  },

  moveDown: function() {
    MODELS.model.moveDown();
  },

  rotate: function() {
    MODELS.model.rotate();
  },

  lose: function() {
    view.showLossMessage();
  },
}
