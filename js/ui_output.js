function showCipher(trumps, size) {
  var table = document.getElementById('cipher_table');
  
  // empty the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  
  table.style.display = 'inline-block';
  for (var y = 0; y < size[1]; y++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for (var x = 0; x < size[0]; x++) {
      var td = document.createElement('td');
      td.textContent = trumps[y * size[0] + x];
      tr.appendChild(td);
    }
  }
}