function DatePicker(callback) {
  const date = new Date();
  const MONTHS = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  const DAYOFWEEK = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];
  const ABBDAYOFWEEK = [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
    'вс',
  ];

  const yearNow = date.getFullYear();
  const monthsNow = MONTHS[date.getMonth()];

  let years = '';
  let months = '';
  let abbDaysOfWeek = '';

  for (let i = 0; i < MONTHS.length; i++) {
    if (i === date.getMonth()) {
      months += `<option selected value="${i}" data-id="${i}">${MONTHS[i]}</option>`;
    } else {
      months += `<option value="${i}" data-id="${i}">${MONTHS[i]}</option>`;
    }
  }
  for (let i = 0; i < ABBDAYOFWEEK.length; i++) {
    abbDaysOfWeek += `<option>${ABBDAYOFWEEK[i]}</option>`;
  }
  for (let i = 1950; i <= yearNow; i++) {
    if (i === yearNow) {
      years += `<option selected value="${i}">${i}</option>`;
    } else {
      years += `<option value="${i}">${i}</option>`;
    }
  }

  const TEMPLATE = `<form class="calendar__form">
                       <div class="calendar__fields">
                          <!--Невидимый блок-->
                          <select id="select-year" name="year">
                              ${years}
                              <!--И так далее-->
                          </select>
                          <select id="select-month" name="month">
                              ${months}
                              <!--И так далее-->
                          </select>
                          <select class="calendar__field--hide" name="days">
                              <option value="01">1</option>
                              <option value="02">2</option>
                              <!--И так далее-->
                              <option value="31" disabled>31</option>
                              <!--Для дней, которых нет в месяце добавляется атрибут disabled-->
                          </select>
                      </div>
                      <div class="calendar__day"></div>
                      <div class="calendar__date-container">
                          <label for="select-month" class="calendar__month">${monthsNow}</label>
                          <div class="calendar__day-number"></div>
                          <label for="select-year" class="calendar__year-number">${yearNow}</label>
                      </div>
                      <div class="calendar__grid"> 
                        <div class="calendar__grid-title">${monthsNow} ${yearNow}</div>
                        <div class="calendar__grid-blocks">
                          <div class="calendar__grid-block calendar__grid-block--th">Пн</div>
                          <div class="calendar__grid-block calendar__grid-block--th">Вт</div>
                          <div class="calendar__grid-block calendar__grid-block--th">Ср</div>
                          <div class="calendar__grid-block calendar__grid-block--th">Чт</div>
                          <div class="calendar__grid-block calendar__grid-block--th">Пт</div>
                          <div class="calendar__grid-block calendar__grid-block--th">Сб</div>
                          <div class="calendar__grid-block calendar__grid-block--th">Вс</div>
                        </div>
                        <div class="calendar__grid-blocks calendar__grid-block-days"></div>
                        <div class="calendar__grid-buttons">
                            <div type="button" class="calendar__grid-skip-button">отмена</div>
                            <div type="submit" class="calendar__grid-submit-button">ок</div>
                        </div>
                      </div>     
                    </form>`;

  const calendar = document.createElement('div');
  calendar.classList.add('calendar');
  calendar.innerHTML = TEMPLATE;

  const calendarGridBlockDays = calendar.querySelector('.calendar__grid-block-days');
  const calendarGridTitle = calendar.querySelector('.calendar__grid-title');
  const calendarField = calendar.querySelector('.calendar__fields');
  const calendarDayNumber = calendar.querySelector('.calendar__day-number');
  const calendarYearNumber = calendar.querySelector('.calendar__year-number');
  const calendarDay = calendar.querySelector('.calendar__day');
  const calendarMonth = calendar.querySelector('.calendar__month');
  const selectDay = calendar.querySelector('select[name="days"]');
  const selectYear = calendar.querySelector('select[name="year"]');
  const selectMonth = calendar.querySelector('select[name="month"]');
  const calendarSubmitButton = calendar.querySelector('.calendar__grid-submit-button');
  const calendarSkipButton = calendar.querySelector('.calendar__grid-skip-button');

  this.initElements = () => {
    selectYear.addEventListener('change', (e) => {
      calendarYearNumber.textContent = e.target.value;
      const oldTitle = calendarGridTitle.textContent;
      const arrayDate = oldTitle.split(' ');
      const changedYear = arrayDate[1] = e.target.value;
      calendarGridTitle.textContent = `${arrayDate[0]} ${changedYear}`;
      date.setFullYear(+changedYear);
      this.rebuildCalendar();
    });

    selectMonth.addEventListener('change', (e) => {
      calendarMonth.textContent = MONTHS[e.target.value];
      const oldTitle = calendarGridTitle.textContent;
      const arrayDate = oldTitle.split(' ');
      const changedMonth = arrayDate[0] = e.target.value;
      calendarGridTitle.textContent = `${MONTHS[changedMonth]} ${arrayDate[1]}`;
      date.setMonth(+changedMonth);
      this.rebuildCalendar();
    });

    this.showDatePicker = () => {
      this.rebuildCalendar();
      calendar.classList.remove('calendar--hide');
      calendarDay.textContent = DAYOFWEEK[date.getDay()];
    };
  };

  this.rebuildCalendar = () => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = new Date(date);
    const nextDays = 7 - lastDayIndex - 1;


    firstDayIndex.setDate(1);
    calendarDayNumber.textContent = date.getDate();
    calendarDay.textContent = DAYOFWEEK[date.getDay()];
    let days = '';
    let daysOptionSelect = '';
    if (firstDayIndex.getDay() === 0) {
      for (let i = 0; i < 6; i++) {
        days = `<div class="calendar__day--hide">${prevLastDay - i}</div>${days}`;
      }
    } else {
      for (let i = firstDayIndex.getDay(), j = 0; i > 1; i--, j++) {
        days = `<div class="calendar__day--hide">${prevLastDay - j}</div>${days}`;
      }
    }

    for (let i = 1; i <= lastDay; i++) {
      if (i == date.getDate() && date.getMonth() === date.getMonth() && date.getFullYear() === date.getFullYear()) {
        days += `<div class="calendar__grid-block calendar__grid-block--td calendar__grid-block--active" data-day="${i}">${i}</div>`;
        daysOptionSelect += `<option selected value="${i}">${i}</option>`;
      } else {
        days += `<div class="calendar__grid-block calendar__grid-block--td" data-day="${i}">${i}</div>`;
        daysOptionSelect += `<option value="${i}">${i}</option>`;
      }
      calendarGridBlockDays.innerHTML = days;
      calendarField.querySelector('select[name="days"]').innerHTML = daysOptionSelect;
    }

    for (let i = 1; i <= nextDays + 1; i++) {
      days += `<div class="calendar__day--hide">${i}</div>`;
      calendarGridBlockDays.innerHTML = days;
    }

    const daysEl = calendar.querySelectorAll('.calendar__grid-block-days div');
    const optionsDays = calendar.querySelectorAll('select[name="days"] option');

    daysEl.forEach((dayEl) => {
      dayEl.addEventListener('click', () => {
        const activeDayEl = calendar.querySelector('.calendar__grid-block--active');
        activeDayEl.classList.remove('calendar__grid-block--active');

        [...optionsDays].forEach((item) => {
          const day = dayEl.getAttribute('data-day');
          if (item.value === day) {
            item.selected = true;
          }
        });

        dayEl.classList.add('calendar__grid-block--active');
        date.setDate(+dayEl.textContent);
        calendarDay.textContent = DAYOFWEEK[date.getDay()];
        calendarDayNumber.textContent = date.getDate();
      });
    });

    calendarSubmitButton.addEventListener('click', () => {
      // calendar.classList.add('calendar--hide');
      callback(`${selectDay.value}-${selectMonth.value + 1}-${selectYear.value}`);
    });


    calendarSkipButton.addEventListener('click', () => {
      calendar.classList.add('calendar--hide');
    });
  };

  this.render = () => {
    document.body.append(calendar);
    this.rebuildCalendar();
    this.initElements();
  };

  this.remove = () => {
    calendar.remove();
  };
}

const datePicker = new DatePicker(console.log);

/*datePicker.render();
datePicker.showDatePicker();*/
