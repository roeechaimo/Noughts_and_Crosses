var SingleCell = function(col, row, content, checked, name){
  this.col = col;
  this.row = row;
  this.content = content;
  this.checked = checked;
  this.name = name;
}

var cellOne = new SingleCell (0, 0, null, false, "cellOne");
var cellTwo = new SingleCell (1, 0, null, false, "cellTwo");
var cellThree = new SingleCell (2, 0, null, false, "cellThree");
var cellFour = new SingleCell (0, 1, null, false, "cellFour");
var cellFive = new SingleCell (1, 1, null, false, "cellFive");
var cellSix = new SingleCell (2, 1, null, false, "cellSix");
var cellSeven = new SingleCell (0, 2, null, false, "cellSeven");
var cellEight = new SingleCell (1, 2, null, false, "cellEight");
var cellNine = new SingleCell (2, 2, null, false, "cellNine");

var cells = [cellOne, cellTwo, cellThree, cellFour,  cellFive,  cellSix, cellSeven,  cellEight,  cellNine];
