function DatePicker(){
    const date = new Date();
    const MONTHS = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
    ];
    const DAYOFWEEK = [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
    ];
    const ABBDAYOFWEEK = [
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб",
        "вс",
    ];

    let months = ``;
    const self = this;
    for(let i = 0; i < MONTHS.length; i++){
        months += `<div data-id="${i}">${MONTHS[i]}</div>`;
    }
    let abbDaysOfWeek = ``;
    for(let i = 0; i < ABBDAYOFWEEK.length; i++){
        abbDaysOfWeek += `<div>${ABBDAYOFWEEK[i]}</div>`;
    }
    this.minYear = 1950;
    let years = "";
    for(let i = this.minYear; i <= new Date().getFullYear(); i++){
        years += `<div>${i}</div>`;
    }

    const TEMPLATE = `<div class="datepicker__background"></div>
                        <div class="datepicker__container">
                            <div class="datepicker__calendar">
                                <div class="datepicker__calendar-day-of-week"></div>
                                <div class="datepicker__calendar-picker">
                                    <div class="datepicker__calendar-picker-month">
                                        <div class="datepicker__calendar-picker-month-cur"></div>
                                        <div class="datepicker__calendar-picker-month-list">`+months+`</div>
                                    </div>
                                    <div class="datepicker__calendar-picker-day">
                                        <div></div>
                                    </div>
                                    <div class="datepicker__calendar-picker-year">
                                        <div class="datepicker__calendar-picker-year-cur"></div>
                                        <div class="datepicker__calendar-picker-year-list">`+years+`</div>
                                    </div>
                                </div>
                                <div class="datepicker__calendar-mandy">
                                    <div><span class="datepicker__calendar-mandy-month"></span>&nbsp;<span class="datepicker__calendar-mandy-year"></span></div>
                                </div>
                                <div class="datepicker__calendar-weekdays">`+abbDaysOfWeek+`</div>
                                <div class="datepicker__calendar-days"></div>
                                <div class="datepicker__calendar-buttons">
                                    <div class="datepicker__calendar-cancel">отмена</div>
                                    <div class="datepicker__calendar-accept">ок</div>
                                </div>
                            </div>
                        </div>`;

    this.dateInputWichTriggerPicker = null;

    this.datePickerDiv = document.createElement("div");
    this.datePickerDiv.classList.add("datepicker");
    this.datePickerDiv.innerHTML = TEMPLATE;

    this.initElements = function(){
        let yearList = self.datePickerDiv.querySelector(".datepicker__calendar-picker-year-list");
        let monthList = self.datePickerDiv.querySelector(".datepicker__calendar-picker-month-list");

        let divYearList = this.datePickerDiv.querySelector(".datepicker__calendar-picker-year > div");
        divYearList.addEventListener("click", function(e){
            yearList.classList.add("datepicker__calendar-picker-year-list--show");
            document.addEventListener("mouseup", function(e){
                if (!yearList.contains(e.target) && yearList != e.target) {
                    yearList.classList.remove("datepicker__calendar-picker-year-list--show");
                }
            }, {once: true});
        });

        let divMonthList = this.datePickerDiv.querySelector(".datepicker__calendar-picker-month > div");
        divMonthList.addEventListener("click", function(e){
            monthList.classList.add("datepicker__calendar-picker-month-list--show");
            document.addEventListener("mouseup", function(e){
                if (!monthList.contains(e.target) && monthList != e.target) {
                    monthList.classList.remove("datepicker__calendar-picker-month-list--show");
                }
            }, {once: true});
        });

        let selectorsMonthList = this.datePickerDiv.querySelectorAll(".datepicker__calendar-picker-month-list div");
        selectorsMonthList.forEach(function(el){
            el.addEventListener("click", function (){
                monthList.classList.remove("datepicker__calendar-picker-month-list--show");
                date.setMonth(+el.getAttribute("data-id"));
                console.log(date, date.getDay(), "<---");
                self.datePickerDiv.querySelector(".datepicker__calendar-day-of-week").textContent = DAYOFWEEK[date.getDay()];
                self.rebuildCalendar();
            })
        });

        // let datePickers = document.querySelectorAll(".date__picker");
        // console.log("datePickers", datePickers);
        // datePickers.forEach(function(el){
        //     el.addEventListener("click", function (e){
        //         e.preventDefault();
        //         self.dateInputWichTriggerPicker = el.parentElement.querySelector("input");
        //         self.rebuildCalendar();
        //         self.datePickerDiv.classList.add("datepicker--show");
        //     })
        // });

        this.showDatePicker = function(el){
            if(!el){
                console.log("Не удалось определить поле-триггер.");
                return;
            }
            self.dateInputWichTriggerPicker = el.parentElement.querySelector("input");
            self.rebuildCalendar();
            self.datePickerDiv.classList.add("datepicker--show");
            self.datePickerDiv.querySelector(".datepicker__calendar-day-of-week").textContent = DAYOFWEEK[date.getDay()];
        }
    }

    this.rebuildCalendar = function(){
        const month = date.getMonth();

        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        const firstDayIndex = new Date(date);
        const nextDays = 7 - lastDayIndex - 1;

        const monthDays = this.datePickerDiv.querySelector(".datepicker__calendar-days");
        firstDayIndex.setDate(1);
        // document.querySelector(".datepicker__calendar-mandy .datepicker__calendar-mandy-year").innerHTML = MONTHS[month];
        self.datePickerDiv.querySelector(".datepicker__calendar-picker-month > div").textContent = MONTHS[date.getMonth()].slice(0,3);
        self.datePickerDiv.querySelector(".datepicker__calendar-picker-year > div").textContent = date.getFullYear();
        self.datePickerDiv.querySelector(".datepicker__calendar-picker-day > div").textContent = date.getDate();
        self.datePickerDiv.querySelector(".datepicker__calendar-mandy .datepicker__calendar-mandy-month").innerHTML = MONTHS[date.getMonth()];
        self.datePickerDiv.querySelector(".datepicker__calendar-mandy .datepicker__calendar-mandy-year").innerHTML = date.getFullYear();
        self.datePickerDiv.querySelector(".datepicker__calendar-day-of-week").textContent = DAYOFWEEK[date.getDay()];
        let days = "";
        console.log(firstDayIndex.getDay(), "firstDayIndex");
        if(firstDayIndex.getDay() === 0){
            for(let i = 0; i < 6; i++){
                days = `<div class="prev-date">${prevLastDay-i}</div>`+days;
            }
        }else{
            for(let i = firstDayIndex.getDay(), j = 0; i > 1; i--, j++){
                days = `<div class="prev-date">${prevLastDay-j}</div>`+days;
            }
        }

        for(let i = 1; i <= lastDay; i++){
            if(i == date.getDate() && date.getMonth() === date.getMonth() && date.getFullYear() === date.getFullYear()){
                days += `<div class="today">${i}</div>`;
            }else{
                days += `<div>${i}</div>`;
            }
            monthDays.innerHTML = days;
        }

        for(let i = 1; i <= nextDays+1; i++){
            days += `<div class="next-date">${i}</div>`;
            monthDays.innerHTML = days;
        }

        let selectorDays = this.datePickerDiv.querySelectorAll(".datepicker__calendar-days div");
        selectorDays.forEach((el)=>{
            el.addEventListener("click", function (){
                selectorDays.forEach((el)=>{
                    el.classList.remove("today");
                });
                el.classList.add("today");
                date.setDate(+el.textContent);
                self.datePickerDiv.querySelector(".datepicker__calendar-day-of-week").textContent = DAYOFWEEK[date.getDay()];
                self.datePickerDiv.querySelector(".datepicker__calendar-picker-day > div").textContent = date.getDate();
            })
        });

        self.datePickerDiv.querySelectorAll(".datepicker__calendar-picker-month-list div").forEach(el=>{
            el.classList.remove("today");
        })
        self.datePickerDiv.querySelectorAll(".datepicker__calendar-picker-month-list div")[month].classList.add("today");
        self.datePickerDiv.querySelectorAll(".datepicker__calendar-picker-year-list div").forEach(el=>{
            el.textContent == date.getFullYear() ? el.classList.add("today") : el.classList.remove("today");
        });

        let yearList = self.datePickerDiv.querySelector(".datepicker__calendar-picker-year-list");
        let selectorsYearList = this.datePickerDiv.querySelectorAll(".datepicker__calendar-picker-year-list div");
        selectorsYearList.forEach(function(el){
            el.addEventListener("click", function (){
                yearList.classList.remove("datepicker__calendar-picker-year-list--show");
                date.setFullYear(+el.textContent);
                self.datePickerDiv.querySelector(".datepicker__calendar-day-of-week").textContent = DAYOFWEEK[date.getDay()];
                self.rebuildCalendar();
            })
        });

        let calendarAccept = this.datePickerDiv.querySelector(".datepicker__calendar-accept");
        calendarAccept.addEventListener("click", function (){
            let day = date.getDate() < 10 ? "0"+date.getDate():date.getDate();
            let month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1):date.getMonth()+1;
            let year = (date.getFullYear() + "").slice(2);
            let id = self.datePickerDiv.getAttribute("data-id");
            if(self.dateInputWichTriggerPicker.type = "date"){
                self.dateInputWichTriggerPicker.value = date.getFullYear()+"-"+month+"-"+day;
            }else{
                self.dateInputWichTriggerPicker.value = day+"."+month+"."+year;
            }
            self.datePickerDiv.classList.remove("datepicker--show");
            self.remove();
        })

        let calendarCancel = this.datePickerDiv.querySelector(".datepicker__calendar-cancel");
        calendarCancel.addEventListener("click", function (){
            self.datePickerDiv.classList.remove("datepicker--show");
            self.remove();
        })
    }

    this.render = function(){
        document.body.append(this.datePickerDiv);
        self.rebuildCalendar();
        self.initElements();
    }

    this.remove = function(){
        this.datePickerDiv.remove();
    }
}


let datePicker = new DatePicker();

emitter.subscribe("inputdate", (el)=>{
    datePicker.render();
    datePicker.showDatePicker(el);
});
