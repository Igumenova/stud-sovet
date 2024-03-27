function navMenuOpen() {
  var navMenu = document.getElementById('burger-menu');
  navMenu.style.right = '0';
}

function navMenuClose() {
  var navMenu = document.getElementById('burger-menu');
  navMenu.style.right = '-100%';
}


const eventDates = {
  '2024-03-25': true,
  '2024-03-26': true,
  '2024-03-27': true,
  '2024-03-28': true,
  '2024-03-29': true,
};

const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');

const month_names = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

let month_picker = document.querySelector('#month-picker');

let currentMonth = { value: 2 };
let currentYear = { value: 2024 };

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';

  let calendar_header_year = document.querySelector('#year');

  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);
  let first_weekday = first_day.getDay();

  let shift = first_weekday === 0 ? 6 : first_weekday - 1;

  for (let i = 0; i < shift; i++) {
    let emptyDay = document.createElement('div');
    emptyDay.classList.add('empty-day');
    calendar_days.appendChild(emptyDay);
  }
  for (let i = 1; i <= days_of_month[month]; i++) {
    let day = document.createElement('div');
    day.innerHTML = i;
    if (
      eventDates[
        `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${
          i < 10 ? '0' : ''
        }${i}`
      ]
    ) {
      day.classList.add('event-date');
    }
    calendar_days.appendChild(day);
  }
};

generateCalendar(currentMonth.value, currentYear.value);

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);

  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
  };
});

(function () {
  month_list.classList.add('hideonce');
})();

document.getElementById('pre-year').addEventListener('click', () => {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
  generateCalendar(currentMonth.value, currentYear.value);
});

document.getElementById('next-year').addEventListener('click', () => {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
  generateCalendar(currentMonth.value, currentYear.value);
});

generateCalendar(currentMonth.value, currentYear.value);

let calendarDays = document.querySelectorAll('.calendar-days div');

const updateEventInfo = (data) => {
  let sectionFirst = document.querySelector('.section-first');
  sectionFirst.innerHTML = '';
  let eventInfoDiv = document.createElement('div');
  eventInfoDiv.classList.add('eventInfo');
  sectionFirst.appendChild(eventInfoDiv);

  let eventInfo = document.createElement('div');
  eventInfo.innerHTML = `+eventInfo(${JSON.stringify(data)})`;
  eventInfoDiv.appendChild(eventInfo);
};
calendarDays.forEach((day) => {
  day.addEventListener('click', () => {
    let selectedDay = day.innerText;

    updateEventInfo({});
  });
});
