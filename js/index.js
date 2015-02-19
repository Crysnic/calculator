function Calculator() {
  var options = {
    "+": function(a, b) {return a+b;},
    "-": function(a, b) {return a-b;},
    "*": function(a, b) {return a*b},
    "/": function(a, b) {return a/b},
    "=": function(a, b) {return a == b ? 0 : -1;} 
  };
  var expression = document.getElementById('expr').value;

  this.calculate = function() {
    var values = parseStrExpr(expression);
    
    if(!isNumeric(values.value1) || !isNumeric(values.value2)) {
      alert("Error: wrong entry");
      return this;
    }
    
    var optn = values.option;
    var a = +values.value1;
    var b = +values.value2;

    for (var key in options) {
      if(key == optn) {
        var result = options[key](a, b);
        alert(result);
        return this;
      }
    }
    alert("Error: Unknown option \"" + optn + "\"");
    return this;
  }
}

function parseStrExpr(str) {
  var value1 = /^\s*\d+/.exec(str);
  var value2 = /\s*\d+$/.exec(str);
  var option = /[^0-9a-zA-Z ]+/.exec(str);
  
  return {"value1": value1, "value2": value2, "option": option};
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}