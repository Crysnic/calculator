// Отправить символ на дисплей
function sendValue(val) {
  var display = document.getElementById("display");
  // отформатировать вывод для знаков(+,-,*,/)
  display.value +=
    isNumeric(val) || /(\.|%)/.test(val) ? val : " " + val + " ";
}

// Вычисление выражения с дисплея
function calculate() {
  var expression = document.getElementById('display').value;
  var errElem = document.getElementById("errorMessage");
  
  try {
    expression = parseExpression(expression);
    var result = (new Function("return " + expression))();
    
    // сформировать ошибку (например деление на ноль)
    if (!isNumeric(result)) {
      throw {message: "Невозможная операция", name: "Error"};
    }
    
    document.getElementById('display').value = result;
    errElem.children[0].innerHTML = "";
    
  } catch (e) {
    // любая другая ошибка
    if (e.name !== "Error") {
      var errMessage = e.name + ": Некорректное выражение";
    } else {
      errMessage = e.name + ": " + e.message;
    }
    
    errElem.children[0].innerHTML = errMessage;
  }
}

// Удаление одного символа с дисплея
function deleteCharacter() {
  var display = document.getElementById("display");
  
  var expressionArray = display.value.split('');
  // если рядом с символом есть пробел то удалить и его
  if (expressionArray.pop() === ' ') {
    expressionArray.pop();
  }
  
  display.value = expressionArray.join('');
  document.getElementById("errorMessage").children[0].innerHTML = "";
}

// Очистка дисплея
function cleanDisplay() {
  document.getElementById("display").value = "";
  document.getElementById("errorMessage").children[0].innerHTML = "";
}

// Internal Functions------------------------------------------------
function parseExpression(str) {
  "use strict";
  var regstr = /(%)/ig;
  return str.replace(regstr, "/ 100 ");
}

function isNumeric(n) {
  "use strict";
  return !isNaN(parseFloat(n)) && isFinite(n);
}