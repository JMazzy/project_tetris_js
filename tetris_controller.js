var controller = {
  init: function() {
    MODELS.model.init();
    view.init();
  },

  update: function() {
    MODELS.model.update();
    view.update( MODELS.model.board, MODELS.model.currentBlock, MODELS.model.score );
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

$( document ).ready( function() {
  controller.init();
  setInterval( function() {
    controller.update();
  }, 250);
});
