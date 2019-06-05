$(function () {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50){  
        $('.border_duble').addClass("shrink");
    }
    else{
        $('.border_duble').removeClass("shrink");
    }
});
// мобильное меню

var navigation = {
  // Variables
  $nav: document.querySelector('.nav'),
  $navTrigger: document.querySelector('.nav__trigger, .nav'),
  $navContent: document.querySelector('.nav__content'),
  $navList: document.querySelector('.nav__list'),
  transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

  init: function init() {
      var self = this;

      // Handle the transitions
      self.$navTrigger.addEventListener('click', function () {
          if (!self.$navTrigger.classList.contains('is-active')) {
              // .nav--trigger active
              self.$navTrigger.classList.add('is-active');

              // .nav active
              if (!self.$nav.classList.contains('is-active')) {
                  self.$nav.classList.add('is-active');
                  self.$nav.addEventListener('transitionend', function (e) {
                      if (e.propertyName == 'width' && self.$navTrigger.classList.contains('is-active')) {
                          // .nav__content active
                          self.$navContent.classList.add('is-active');
                      }
                  });
              } else {
                  self.$navContent.classList.add('is-active');
              }

              // no-csstransitions fallback
              if (document.documentElement.classList.contains('no-csstransitions')) {
                  self.$navContent.classList.add('is-active');
              }
          } else {
              // .nav--trigger inactive
              self.$navTrigger.classList.remove('is-active');

              // .nav__content inactive
              if (self.$navContent.classList.contains('is-active')) {
                  self.$navContent.classList.remove('is-active');
                  self.$navContent.addEventListener('transitionend', function (e) {
                      if (e.propertyName == 'opacity' && !self.$navTrigger.classList.contains('is-active')) {
                          // .nav inactive
                          self.$nav.classList.remove('is-active');
                      }
                  });
              } else {
                  self.$nav.classList.remove('is-active');
              }

              // no-csstransitions fallback
              if (document.documentElement.classList.contains('no-csstransitions')) {
                  self.$nav.classList.remove('is-active');
              }
          }
      });
  }
};

navigation.init();

// первый слайдер
  $('.autoplay').slick({
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // второй слайдер
  $('.autopl-lending').slick({
    dots: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // слайдер отзывов 

  $('.reviews-slaid').slick({
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  });






  
  //Передача инфо о кнопке в модальное окно
$(function() {
  $('button.btn').click(function() {
      var parent = $(this).attr('data-parent');
      var modal = $(this).attr('data-target')
      $(modal).find('input[name=target]').val(parent);
  })
});

//Валидация и отправка формы

$(document).ready(function() {
  $('[data-submit]').on('click', function(e) {
      e.preventDefault();
      $(this).parent('form').submit();
  })
  $.validator.addMethod(
      "regex",
      function(value, element, regexp) {
          var re = new RegExp(regexp);
          return this.optional(element) || re.test(value);
      },
      "Please check your input."
  );

  // Функция валидации и вывода сообщений
  function valEl(el) {

      el.validate({
          rules: {
              tel: {
                  required: true,
                  regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
              },
              name: {
                  required: true
              },
              email: {
                  required: true,
                  email: true
              },
              comment: {
                required: false
              },
              target: {
                required: false
              }
          },
          messages: {
              tel: {
                  required: 'Поле обязательно для заполнения',
                  regex: 'Телефон может содержать символы + - ()'
              },
              name: {
                  required: 'Поле обязательно для заполнения',
              },
              email: {
                  required: 'Поле обязательно для заполнения',
                  email: 'Неверный формат E-mail'
              }
          },

          // Начинаем проверку id="" формы
          submitHandler: function(form) {
              $('#loader').fadeIn();
              var $form = $(form);
              var $formId = $(form).attr('id');
              switch ($formId) {
                  // Если у формы id="goToNewPage" - делаем:
                  case 'goToNewPage':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize(),
                          })
                          .always(function(response) {
                            //ссылка на страницу "спасибо" - редирект
                            location.href = 'https://web-des.ru';
                            //отправка целей в Я.Метрику и Google Analytics
                            ga('send', 'event', 'zakaz', 'register');
                            yaCounter51454033.reachGoal('zakaz');
                        });
                      break;
                  // Если у формы id="popupResult" - делаем:
                  case 'popupResult':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize(),
                          })
                          .always(function(response) {
                              setTimeout(function() {
                                  $('#myModal, #myModal-reviews, #myModal-question').modal('hide');
                                  $('#loader').fadeOut();
                              }, 800);
                              setTimeout(function() {
                                  $('#overlay').fadeIn();
                                  $form.trigger('reset');
                                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                              }, 1100);
                              $('#overlay').on('click', function(e) {
                                  $(this).fadeOut();
                              });

                          });
                      break;
              }
              return false;
          }
      })
  }

  // Запускаем механизм валидации форм, если у них есть класс .js-form
  $('.js-form').each(function() {
      valEl($(this));
  });
  
});


});