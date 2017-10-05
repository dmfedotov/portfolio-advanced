export default (function () {
  var _form = null;
  var _result = false;
  var _resultArray = [];

  function _init(form) {
    _form = form;
    _addListeners();
  }

  function _addListeners() {
    _form.submit(function (ev) {
      ev.preventDefault();
      _resultArray = [];
      _validate(_form, _onEmptyVariant);
      _validate(_form, _onCheckVariant);
      _validate(_form, _onRobotVariant);
      _isResult(_resultArray);
      console.log(_result);
    });
  }

  function _validate(form, method) {
    _result = true;
    let _formElems = form.find('input').add('textarea');

    _formElems.each((i, elem) => {
      if ($(elem).attr('type') == 'text'
             ||
          $(elem).attr('type') == 'password'
             ||
          $(elem).attr('type') == 'email'
             ||
          $(elem).is('textarea')) {
        if (!method($(elem))) {
          _result = false;
        }
      }

      if ($(elem).attr('type') == 'checkbox') {
        if (!method($(elem))) {
          _result = false;
        }
      }

      if ($(elem).attr('type') == 'radio') {
        if (!method($(elem))) {
          _result = false;
        }
      }

      if ($(elem).attr('type') == 'email') {
        if (!method($(elem))) {
          _result = false;
        }
      }
    });
    _resultArray.push(_result);
  }

  function _isResult(resArray) {
    for (var i = 0; i < resArray.length; i++) {
      if (!resArray[i]) {
        _result = false;
        break;
      } else {
        _result = true;
      }
    }
  }

  function _clearError(form) {
    var _formChildren = form.children();
    form.on('reset', () => {
      _formChildren.each((i, item) => {
        $(item).removeClass('form-error');
      });
    });
  }

  function _onResult() {
    return _result;
  }

  function _onEmptyVariant(elem) {
    elem.keyup(() => {
      elem.parent().removeClass('form-error');
    });

    if (elem.attr('name') == 'login' && elem.val() == ''
          ||
        elem.attr('name') == 'name' && elem.val() == ''
          ||
        elem.attr('name') == 'password' && elem.val() == ''
          ||
        elem.attr('name') == 'message' && elem.val() == ''
          ||
        elem.attr('name') == 'email' && elem.val() == ''
    ) {
      elem.parent().addClass('form-error');
      return false;
    } else {
      // elem.parent().removeClass('form-error');
      elem.parent().addClass('form-success');
      return true;
    }
  }

  // function _onLengthVariant(elem) {
  //   return elem.value == '' ? false : true;
  // }

  function _onRobotVariant(elem) {
    elem.click(() => {
      if (elem.attr('id') == 'auth-radio-yes') {
        if (elem.is(':checked')) {
          $('.form').find('.form__line-title').removeClass('form-error');
        }     
      }
    });

    if (elem.attr('id') == 'auth-radio-yes' && !elem.prop('checked')
                              ||
        elem.attr('id') == 'auth-radio-no' && elem.prop('checked')) {
      $('.form').find('.form__line-title').addClass('form-error');
      return false;
    } else {
      $('.form').find('.form__line-title').removeClass('form-error');
      return true;
    }
  }

  function _onCheckVariant(elem) {
    elem.click(() => {
      if (elem.is(':checked')) {
        elem.parent().parent().parent().removeClass('form-error');
      }
    });

    if (elem.attr('id') == 'auth-check' && !elem.prop('checked')) {
      elem.parent().parent().parent().addClass('form-error');
      return false;
    } else {
      elem.parent().parent().parent().removeClass('form-error');
      return true;
    }
  }

  return {
    init: _init,
    result: _onResult,
    clearError: _clearError,
  };
}());