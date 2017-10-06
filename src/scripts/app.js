import {flipper} from './common/flipper';
import {parallax} from './common/parallax';
import {hamburger} from './common/hamburger';
import {initMap} from './common/google-map';
import Validation from './common/validation';
import getData from './common/getData';
import Preloader from './common/preloader';
import Sidebar from './common/sidebar';
import ScrollArrow from './common/scroll-arrow';

// Валидация форм
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

// Прелоадер
Preloader.init();

/*** Скрол к секциям **/
// Страница - Блог
if (document.querySelector('.blog')) {
  const firstArticle = $('.blog__article').first();
  ScrollArrow.bottom(firstArticle);
} 

// Страница - Мои работы
if (document.querySelector('.portfolio')) {
  const portfolioSection = $('#portfolio');
  const headerSection = $('.header_my-works');
  ScrollArrow.bottom(portfolioSection);
  ScrollArrow.top();
}

// Страница - Обо мне
if (document.querySelector('.about')) {
  const aboutSection = $('#about');
  ScrollArrow.bottom(aboutSection);
}

if (document.querySelector('#google-map')) {
  initMap();
}




