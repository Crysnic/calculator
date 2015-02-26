function Calculator() {
  var expression = document.getElementById('expr').value;

  this.calculate = function() {
    try {
      expression = parseStrExpr(expression);
      var result = (new Function("", "return " + expression))();
      if(!isNumeric(result)) {
        throw {message: "Невозможная операция", name: "Error"};
      }
      alert(result);
      return this;

    } catch(e) {
      alert("Name: " + e.name + "\nMessage: " + e.message);
    }
  }
}

function parseStrExpr(str) {
  var regstr = /(cos|sin|tan|acos|asin|atan|log|pow|sqrt)/ig;
  var result = str.replace(regstr, "Math.$1");
  
  return result; 
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}