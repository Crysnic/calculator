window.onload = function() {
  var calculator = document.getElementsByClassName("calculator")[0];

  // делегирование
  calculator.onclick = function(event) {
    var target = event.target;
    if (target.type != "button") return;

    switch (target.value) {
      case '=':
        calculate();
        return;
      case '<-':
        deleteCharacter();
        return;
      case 'C':
        cleanDisplay();
        return;
    }
    
    sendValue(target.value);
  }

  //вывести доступные функции в левый верхний угол
  var availableFunctionsButton =
    document.getElementsByClassName('available_functions')[0];
  var availableFunctionsList = document.getElementById("signs");
  
  availableFunctionsList.style.display = "none";
    
  availableFunctionsButton.onclick = function() {
    availableFunctionsList.style.display =
      availableFunctionsList.style.display ? "" : "none";
  }

  // отмена действий браузера по-умолчанию(выделение текста)
  var header = calculator.getElementsByTagName('h1')[0];
  var footer = calculator.getElementsByTagName('footer')[0];

  availableFunctionsButton.onmousedown = function() {
    return false;
  }
  header.onmousedown = function() {
    return false;
  }
  footer.onmousedown = function() {
    return false;
  }
}

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
    
    // удалить errorMessage element если есть
    if(errElem) {
    	errElem.parentNode.removeChild(errElem);
    }
    
  } catch (e) {
    var error = document.createElement("div");
    error.className = "errorMessage";
    error.id = "errorMessage";   
  
    // любая другая ошибка
    if (e.name !== "Error") {
      var errMessage = e.name + ": Некорректное выражение";
    } else {
      errMessage = e.name + ": " + e.message;
    }
    
    error.innerHTML = errMessage;
    document.body.appendChild(error);
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
  
  // удалить errorMessage element если есть
  if ( document.getElementById("errorMessage") ) {
    document.getElementById("errorMessage").parentNode.removeChild(document.getElementById("errorMessage"));
  }
}

// Очистка дисплея
function cleanDisplay() {
  document.getElementById("display").value = "";
  
  // удалить errorMessage element если есть
  if ( document.getElementById("errorMessage") ) {
    document.getElementById("errorMessage").parentNode.removeChild(document.getElementById("errorMessage"));
  }
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