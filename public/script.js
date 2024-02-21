var firstTable = document.getElementById('first-track');
var infoTable = document.getElementById('info-table');
infoTable.style.height = `${firstTable.offsetHeight}px`;

function handleIntersection0to500(entries, observer) {
  let counter = 0;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (counter < 150) {
        intervalId1 = setInterval(function () {
          counter++;
          prizeFund.innerHTML = counter;
          if (counter >= 150) {
            clearInterval(intervalId1);
          }
        }, 1);
      }
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersection0to24(entries, observer) {
  let counter = 0;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (counter < 24) {
        intervalId2 = setInterval(function () {
          counter++;
          workTime.innerHTML = counter;
          if (counter >= 24) {
            clearInterval(intervalId2);
          }
        }, 35);
      }
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersection0to150(entries, observer) {
  let counter = 0;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (counter < 30) {
        intervalId3 = setInterval(function () {
          counter++;
          firstPlace.innerHTML = counter;
          if (counter >= 30) {
            clearInterval(intervalId3);
          }
        }, 15);
      }
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersection0to500second(entries, observer) {
  let counter = 0;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (counter < 150) {
        intervalId5 = setInterval(function () {
          counter++;
          prizeFund2.innerHTML = counter;
          if (counter >= 150) {
            clearInterval(intervalId5);
          }
        }, 1);
      }
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersection0to50(entries, observer) {
  let counter = 0;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (counter < 30) {
        intervalId4 = setInterval(function () {
          counter++;
          specialPrize.innerHTML = counter;
          if (counter >= 30) {
            clearInterval(intervalId4);
          }
        }, 30);
      }
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersectionSlideRight1(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById('HakatonInfoBlock__block').style.transform =
        'translateX(0%)';
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersectionSlideRight2(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById('RegistrationInfoBlock__block').style.transform =
        'translateX(0%)';
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersectionSlideRight3(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById('HakatonBlock__block').style.transform =
        'translateX(0%)';
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersectionSlideRight4(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById('MainBlock__block').style.transform =
        'translateX(0%)';
      observer.unobserve(entry.target);
    }
  });
}

function handleIntersectionSlideLeft1(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById('ConditionInfoBlock__block').style.transform =
        'translateX(0%)';
      observer.unobserve(entry.target);
    }
  });
}

const options = {
  root: document,
  rootMargin: '0px',
  threshold: 0.5,
};

// new IntersectionObserver(handleIntersection0to500, options).observe(
//   document.getElementById('prizeFund'),
// );
// new IntersectionObserver(handleIntersection0to24, options).observe(
//   document.getElementById('workTime'),
// );
// new IntersectionObserver(handleIntersection0to150, options).observe(
//   document.getElementById('firstPlace'),
// );
new IntersectionObserver(handleIntersection0to500second, options).observe(
  document.getElementById('prizeFund2'),
);
//   new IntersectionObserver(handleIntersection0to50, options).observe(document.getElementById("specialPrize"));
new IntersectionObserver(handleIntersectionSlideRight1, options).observe(
  document.getElementById('HakatonInfoBlock'),
);
new IntersectionObserver(handleIntersectionSlideRight2, options).observe(
  document.getElementById('RegistrationInfoBlock'),
);
new IntersectionObserver(handleIntersectionSlideLeft1, options).observe(
  document.getElementById('ConditionInfoBlock'),
);
new IntersectionObserver(handleIntersectionSlideRight3, options).observe(
  document.getElementById('HakatonBlock'),
);
new IntersectionObserver(handleIntersectionSlideRight4, options).observe(
  document.getElementById('MainBlock'),
);

function navMenuOpen() {
  var navMenu = document.getElementById('nav-burger-menu');
  var nav = document.getElementById('nav');
  navMenu.style.marginLeft = `${nav.offsetWidth - navMenu.offsetWidth}px`;
}

function navMenuClose() {
  var navMenu = document.getElementById('nav-burger-menu');
  navMenu.style.marginLeft = '100%';
}

function firstDayButton() {
  var firstTable = document.getElementById('first-table');
  var secondTable = document.getElementById('second-table');
  var thirdTable = document.getElementById('third-table');

  var firstButton = document.getElementById('first-day');
  var secondButton = document.getElementById('second-day');
  var thtirdButton = document.getElementById('third-day');

  firstButton.style.opacity = '1';
  secondButton.style.opacity = '0.5';
  thtirdButton.style.opacity = '0.5';

  firstTable.style.display = 'block';
  firstTable.style.visibility = 'visible';
  firstTable.style.opacity = '1';

  secondTable.style.display = 'block';
  secondTable.style.visibility = 'none';
  secondTable.style.opacity = '0';

  thirdTable.style.display = 'block';
  thirdTable.style.visibility = 'none';
  thirdTable.style.opacity = '0';
}

function secondDayButton() {
  var firstTable = document.getElementById('first-table');
  var secondTable = document.getElementById('second-table');
  var thirdTable = document.getElementById('third-table');

  var firstButton = document.getElementById('first-day');
  var secondButton = document.getElementById('second-day');
  var thtirdButton = document.getElementById('third-day');

  firstButton.style.opacity = '0.5';
  secondButton.style.opacity = '1';
  thtirdButton.style.opacity = '0.5';

  firstTable.style.display = 'block';
  firstTable.style.visibility = 'none';
  firstTable.style.opacity = '0';

  secondTable.style.display = 'block';
  secondTable.style.visibility = 'visible';
  secondTable.style.opacity = '1';

  thirdTable.style.display = 'block';
  thirdTable.style.visibility = 'none';
  thirdTable.style.opacity = '0';
}

function thirdDayButton() {
  var firstTable = document.getElementById('first-table');
  var secondTable = document.getElementById('second-table');
  var thirdTable = document.getElementById('third-table');

  var firstButton = document.getElementById('first-day');
  var secondButton = document.getElementById('second-day');
  var thtirdButton = document.getElementById('third-day');

  firstButton.style.opacity = '0.5';
  secondButton.style.opacity = '0.5';
  thtirdButton.style.opacity = '1';

  firstTable.style.display = 'block';
  firstTable.style.visibility = 'none';
  firstTable.style.opacity = '0';

  secondTable.style.display = 'block';
  secondTable.style.visibility = 'none';
  secondTable.style.opacity = '0';

  thirdTable.style.display = 'block';
  thirdTable.style.visibility = 'visible';
  thirdTable.style.opacity = '1';
}

function firstFormButton() {
  var firstForm = document.getElementById('first-form');
  var secondForm = document.getElementById('second-form');

  var firstFormBlock = document.getElementById('first-form__block');
  var secondFormBlock = document.getElementById('second-form__block');

  firstForm.style.opacity = '1';
  secondForm.style.opacity = '0.5';

  firstFormBlock.classList.remove('form-hide');
  secondFormBlock.classList.add('form-hide');
}

function secondFormButton() {
  var firstForm = document.getElementById('first-form');
  var secondForm = document.getElementById('second-form');

  var firstFormBlock = document.getElementById('first-form__block');
  var secondFormBlock = document.getElementById('second-form__block');

  firstForm.style.opacity = '0.5';
  secondForm.style.opacity = '1';
  secondFormBlock.classList.remove('form-hide');
  firstFormBlock.classList.add('form-hide');
}

function copyToken() {
  var root = document.getElementById('token').firstChild;
  var rng, sel;
  if (document.createRange) {
    rng = document.createRange();
    rng.selectNode(root);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(rng);
  } else {
    var rng = document.body.createTextRange();
    rng.moveToElementText(root);
    rng.select();
  }
  document.execCommand('copy');
}

var root = document.getElementById('token').firstChild;
var rng, sel;
if (document.createRange) {
  rng = document.createRange();
  rng.selectNode(root);
  sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(rng);
} else {
  var rng = document.body.createTextRange();
  rng.moveToElementText(root);
  rng.select();
}
if (rng != '') {
  document.getElementById('copyButton').style = 'display:block';
}

function noDigits(event) {
  if ('1234567890-+=/.,<>[]{}();:"`!@#$%^&*№? '.indexOf(event.key) != -1)
    event.preventDefault();
}

$('.tel').mask('+7(999)999-9999');

function firstTrackButton() {
  var firstTable = document.getElementById('first-track');
  var secondTable = document.getElementById('second-track');
  var thirdTable = document.getElementById('third-track');

  var firstButton = document.getElementById('first-button');
  var secondButton = document.getElementById('second-button');
  var thtirdButton = document.getElementById('third-button');

  var infoTable = document.getElementById('info-table');

  firstButton.style.opacity = '1';
  secondButton.style.opacity = '0.5';
  thtirdButton.style.opacity = '0.5';

  firstTable.style.display = 'block';
  firstTable.style.visibility = 'visible';
  firstTable.style.opacity = '1';

  secondTable.style.display = 'block';
  secondTable.style.visibility = 'none';
  secondTable.style.opacity = '0';

  thirdTable.style.display = 'block';
  thirdTable.style.visibility = 'none';
  thirdTable.style.opacity = '0';

  infoTable.style.height = `${firstTable.offsetHeight}px`;
}

function secondTrackButton() {
  var firstTable = document.getElementById('first-track');
  var secondTable = document.getElementById('second-track');
  var thirdTable = document.getElementById('third-track');

  var firstButton = document.getElementById('first-button');
  var secondButton = document.getElementById('second-button');
  var thtirdButton = document.getElementById('third-button');

  var infoTable = document.getElementById('info-table');

  firstButton.style.opacity = '0.5';
  secondButton.style.opacity = '1';
  thtirdButton.style.opacity = '0.5';

  firstTable.style.display = 'block';
  firstTable.style.visibility = 'none';
  firstTable.style.opacity = '0';

  secondTable.style.display = 'block';
  secondTable.style.visibility = 'visible';
  secondTable.style.opacity = '1';

  thirdTable.style.display = 'block';
  thirdTable.style.visibility = 'none';
  thirdTable.style.opacity = '0';

  infoTable.style.height = `${secondTable.offsetHeight}px`;
}

function thirdTrackButton() {
  var firstTable = document.getElementById('first-track');
  var secondTable = document.getElementById('second-track');
  var thirdTable = document.getElementById('third-track');

  var firstButton = document.getElementById('first-button');
  var secondButton = document.getElementById('second-button');
  var thtirdButton = document.getElementById('third-button');

  var infoTable = document.getElementById('info-table');

  firstButton.style.opacity = '0.5';
  secondButton.style.opacity = '0.5';
  thtirdButton.style.opacity = '1';

  firstTable.style.display = 'block';
  firstTable.style.visibility = 'none';
  firstTable.style.opacity = '0';

  secondTable.style.display = 'block';
  secondTable.style.visibility = 'none';
  secondTable.style.opacity = '0';

  thirdTable.style.display = 'block';
  thirdTable.style.visibility = 'visible';
  thirdTable.style.opacity = '1';

  infoTable.style.height = `${thirdTable.offsetHeight}px`;
}
