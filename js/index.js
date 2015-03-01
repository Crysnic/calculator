function Calculator() {
  "use strict";
  var expression = document.getElementById('expr').value;
  var errElem = document.getElementsByTagName("div")[0];

  this.calculate = function () {
    try {
      expression = parseStrExpr(expression);
      var result = (new Function("return " + expression))();
      if (!isNumeric(result)) {
        throw {message: "Невозможная операция", name: "Error"};
      }
      document.getElementById('expr').value = result;
      errElem.children[0].innerHTML = "";

    } catch (e) {
      errElem.children[0].innerHTML = e.name + ": " + e.message;
    }
  };
}

function parseStrExpr(str) {
  "use strict";
  var regstr = /(cos|sin|tan|acos|asin|atan|log|pow|sqrt)/ig;
  return str.replace(regstr, "Math.$1");
}

function isNumeric(n) {
  "use strict";
  return !isNaN(parseFloat(n)) && isFinite(n);
}