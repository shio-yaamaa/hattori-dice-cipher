function showMenuIndicator(id) {
  
}

// create single pattern frame
function createPatternFrame(booleans, onClick) {
  var table = document.createElement('table');
  var tr;
  for (var i = 0; i < Math.pow(3, 2); i++) {
    if (i % 3 == 0) {
      tr = document.createElement('tr');
      table.appendChild(tr);
    }
    var td = document.createElement('td');
    if (booleans && booleans[i]) {
      td.classList.add('one');
    }
    if (onClick) {
      td.addEventListener('click', function () {
        onClick(this);
      });
    }
    tr.appendChild(td);
  }
  return table;
}