import {flipper} from './common/flipper';
import {parallax} from './common/parallax';
import {hamburger} from './common/hamburger';
import {initMap} from './common/google-map';
import Validation from './common/validation';
import getData from './common/getData';


if ($('#auth-form')) { 
  var authForm = $('#auth-form');
  Validation.init(authForm);
  Validation.clearError(authForm);

  authForm.submit(() => {
    if(Validation.result()) {
      getData('http://localhost:3000').then(function(response) {
        console.log('Success!', response);
      }, function(error) {
        console.error('Failed!', error);
      });
    }
  });
}

if (!document.querySelector('#auth-form')) { 
  var feedbackForm = $('#feedback-form');
  Validation.init(feedbackForm);
  Validation.clearError(feedbackForm);

  feedbackForm.submit(() => {
    if(Validation.result()) {
      getData('http://localhost:3000').then(function(response) {
        console.log('Success!', response);
      }, function(error) {
        console.error('Failed!', error);
      });
    }
  });
}




if (document.querySelector('#google-map')) {
  initMap();
}




