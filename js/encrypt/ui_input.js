/* global FRAME_COUNT_MIN */
/* global FRAME_COUNT_MAX */
/* global NUMERAL2BOOLEANS */
/* global errors */

/* global encrypt */
/* global showResult */

// submit numeral action
document.getElementById('submit_numeral').addEventListener('click', function () {
  var numerals = document.getElementById('numeral_input').value.split('').map(function (element) {
    return parseInt(element);
  });
  var booleans = numerals.reduce(function (previousValue, currentValue) {
    return previousValue.concat(NUMERAL2BOOLEANS[currentValue]);
  }, []);
  console.log(booleans);
  var trumps = encrypt(booleans);
  showResult(trumps, errors);
});

// submit pattern action
document.getElementById('submit_pattern').addEventListener('click', function () {
  var booleans = getBooleansFromPattern(
    document.getElementById('pattern_input_container')
  );
  var trumps = encrypt(booleans);
  showResult(trumps, errors);
});

function createPatternInputFrame(patternInputContainer) {
  var table = document.createElement('table');
  var tr;
  for (var i = 0; i < Math.pow(3, 2); i++) {
    if (i % 3 == 0) {
      tr = document.createElement('tr');
      table.appendChild(tr);
    }
    var td = document.createElement('td');
    td.appendChild(document.createElement('div'));
    td.addEventListener('click', function () {
      this.classList.toggle('one');
    });
    tr.appendChild(td);
  }
  return table;
}

function createFrameControl() {
  var controls = [
    {
      name: '枠を追加',
      func: function () {
        if (this.classList.contains('disabled')) {
          return;
        }
        var container = document.getElementById('pattern_input_container');
        container.insertBefore(
          createPatternInputFrame(container),
          container.children[container.children.length - 1]
        );
        if (container.children.length - 1 >= FRAME_COUNT_MAX) {
          this.classList.add('disabled');
        }
        if (container.children.length - 1 > FRAME_COUNT_MIN) {
          this.parentNode.nextElementSibling.children[0].classList.remove('disabled');
        }
      }
    },
    {
      name: '枠を削除',
      func: function () {
        if (this.classList.contains('disabled')) {
          return;
        }
        var container = document.getElementById('pattern_input_container');
        var frames = container.children;
        container.removeChild(frames[frames.length - 2]);
        if (frames.length - 1 <= FRAME_COUNT_MIN) {
          this.classList.add('disabled');
        }
        if (container.children.length - 1 < FRAME_COUNT_MAX) {
          this.parentNode.previousElementSibling.children[0].classList.remove('disabled');
        }
      }
    },
    {
      name: 'リセット',
      func: function () {
        var target = document.getElementsByClassName('one');
        while (target.length > 0) {
          target[0].classList.remove('one');
        }
        // forEach.call cannot be used for target is constantly updated
      }
    }
  ];
  var table = document.createElement('table');
  controls.forEach(function (element) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    
    var td = document.createElement('td');
    td.setAttribute('colspan', 3);
    td.textContent = element.name;
    td.addEventListener('click', element.func);
    tr.appendChild(td);
  });
  return table;
}

function showPatternInput(initialFrameCount) {
  var container = document.getElementById('pattern_input_container');
  for (var i = 0; i < initialFrameCount; i++) {
    container.appendChild(createPatternInputFrame(container));
  }
  container.appendChild(createFrameControl());
}

function getBooleansFromPattern(container) {
  var booleans = Array.prototype.map.call(
    container.getElementsByTagName('td'),
    function (element) {
      return element.classList.contains('one');
    }
  );
  return booleans.slice(0, booleans.length - 3);
}