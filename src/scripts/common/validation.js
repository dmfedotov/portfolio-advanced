export default (function () {
  // Изначально форма null
  var _form = null;

  // Если валидация прошла успешно, записывается true. Нужно для ajax запроса
  var _result = false;

  // После выполнения метода валидации, результат (true, false), записывается в этот массив
  var _resultArray = [];

  // Инит принимает форму, которую нужно валидировать и присваивает ее переменной
  function _init(form) {
    _form = form;
    // Процесс валидации
    _addListeners();
  }

  // По событию submit срабатывают методы валидации
  function _addListeners() {
    _form.submit(function (ev) {
      ev.preventDefault();
      // Каждый раз по событию, массив с результатами обнуляется
      _resultArray = [];
      // Валидация
      _validate(_form);
      // Проверка успеха валидации
      _isResult(_resultArray);
    });
  }

  // Принимает форму
  function _validate(form) {
    _result = true;

    // Тип валидации
    const _validType = {
      'text': _onEmptyVariant,
      'password': _onEmptyVariant,
      'email': _onEmptyVariant,
      'textarea': _onEmptyVariant,
      'radio': _onRobotVariant,
      'checkbox': _onCheckVariant,
    };

    // Находим все инпуты и textarea
    let _formElems = form.find('input').add('textarea');

    // Для каждого типа поля, вызываем соответствующий метод
    for (var key in _validType) {
      _formElems.each((i, elem) => {
        // инпуты
        if ($(elem).attr('type') == key) {
          if (!_validType[key]($(elem))) {
            _result = false;
          }
        }
        // Textarea
        if ($(elem).is('textarea')) {
          if (!_validType[key]($(elem))) {
            _result = false;
          }
        }
      });
    }
    // Записываем _result в массив
    _resultArray.push(_result);
  }

  // Фукнция принимает массив, в котором записаны значения _result
  function _isResult(resArray) {
    // Перебираем и смотрим, если все элементы true, то _result = true
    // Если есть хотя бы один false, цикл прекращается и _result = false
    for (var i = 0; i < resArray.length; i++) {
      if (!resArray[i]) {
        _result = false;
        break;
      } else {
        _result = true;
      }
    }
  }

  // По событию _reset происходит очистка форма и удаляется класс с ошибкой
  function _clearError(form) {
    var _formChildren = form.children();
    form.on('reset', () => {
      _formChildren.each((i, item) => {
        $(item).removeClass('form-error');
      });
    });
  }

  // Возвращается результат валидации
  function _onResult() {
    return _result;
  }

  // Проверка на то, что текстовые поля не пустые
  function _onEmptyVariant(elem) {
    // При наборе текста, класс с ошибкой удаляется
    elem.keyup(() => {
      elem.parent().removeClass('form-error');
    });

    if (elem.val() == '') {
      elem.parent().addClass('form-error');
      return false;
    } else {
      elem.parent().addClass('form-success');
      return true;
    }
  }

  // Проверка, что пользователь не робот
  function _onRobotVariant(elem) {
    elem.click(() => {
      // По клику на radio "Да", удаляется класс ошибки
      if (elem.attr('id') == 'auth-radio-yes') {
        if (elem.is(':checked')) {
          $('.form').find('.form__line-title').removeClass('form-error');
        }
      }
    });

    // Проверки
    if (!elem.is(':checked')
               ||
        elem.attr('id') == 'auth-radio-no' && elem.is(':checked')) {
      $('.form').find('.form__line-title').addClass('form-error');
      return false;
    } else {
      $('.form').find('.form__line-title').removeClass('form-error');
      return true;
    }
  }

  // Проверка, что пользователь человек
  function _onCheckVariant(elem) {
    elem.click(() => {
      // Если поставить галочку, удаляется класс ошибки
      if (elem.is(':checked')) {
        elem.parent().parent().parent().removeClass('form-error');
      }
    });

    // Проверки
    if (elem.attr('id') == 'auth-check' && !elem.prop('checked')) {
      elem.parent().parent().parent().addClass('form-error');
      return false;
    } else {
      elem.parent().parent().parent().removeClass('form-error');
      return true;
    }
  }

  ///// API /////
  // init - запуск валидации
  // result - итог валидации (успешно или нет)
  return {
    init: _init,
    result: _onResult,
  };
}());