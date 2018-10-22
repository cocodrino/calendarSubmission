/*
 var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

 // these are human-readable month name labels, in order
 var cal_months_labels = ['January', 'February', 'March', 'April',
 'May', 'June', 'July', 'August', 'September',
 'October', 'November', 'December'];

 // these are the days of the week for each month, in order
 var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

 var cal_current_date = new Date();

 function Calendar(month, year) {
 this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
 this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
 this.html = '';
 }

 Calendar.prototype.generates = function () {

 // get first day of month
 var firstDay = new Date(this.year, this.month, 1);
 var startingDay = firstDay.getDay();

 // find number of days in month
 var monthLength = cal_days_in_month[this.month];

 // compensate for leap year
 if (this.month == 1) { // February only!
 if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
 monthLength = 29;
 }
 }

 var generateArrayDays = function () {
 var startArray = Array.apply(null, Array(startingDay));

 _.range(1, monthLength).reduce(function (mem, day) {
 var _newArray
 if (mem.slice(-1)[0].length >= 7) {
 _newArray = mem.concat([
 [day]
 ]);
 } else {
 _newArray = mem.slice(0, -1).concat(mem.slice(-1)[0].concat(day))
 }

 return _newArray

 }, [startArray])

 }

 // do the header
 var monthName = cal_months_labels[this.month]
 var html = '<table class="calendar-table">';
 html += '<tr><th colspan="7">';
 html += monthName + "&nbsp;" + this.year;
 html += '</th></tr>';
 html += '<tr class="calendar-header">';
 for (var i = 0; i <= 6; i++) {
 html += '<td class="calendar-header-day">';
 html += cal_days_labels[i];
 html += '</td>';
 }
 html += '</tr><tr>';

 // fill in the days
 var day = 1;
 // this loop is for is weeks (rows)
 for (var i = 0; i < 9; i++) {
 // this loop is for weekdays (cells)
 for (var j = 0; j <= 6; j++) {
 html += '<td class="calendar-day">';
 if (day <= monthLength && (i > 0 || j >= startingDay)) {
 html += day;
 day++;
 }
 html += '</td>';
 }
 // stop making rows if we've run out of days
 if (day > monthLength) {
 break;
 } else {
 html += '</tr><tr>';
 }
 }
 html += '</tr></table>';

 this.html = html;
 }

 Calendar.prototype.getHTML = function () {
 return this.html;
 }

 Array.apply(null, Array(3))
 */
var prev_size = 0;

var animateTable = function () {
      $('.dayTable').velocity({
            perspective: 200,
            opacity: 0,
            PerspectiveOrigin: "top center",
            rotateX: 110,
            //padding: 20,
            top: -40

      })


      $.map($("tr").slice(1), function (row, j) {
            $.map($(row).children(), function (elem, i) {
                  $(elem).velocity({
                        rotateX: 0,
                        opacity: 1,
                        top: 10
                  }, {
                        duration: 500,
                        delay: (200 * (0.5 * j + i))

                  })
            })


      })
};


var windowResize = function () {
      _.throttle(animateTable, 2000);

      var height = $(window).height();
      var width = $(window).width();

      var showalertMessage = function () {
            if (width < prev_size) {

                  $(".alertMessage").css({visibility: "visible"})
                  _.delay(function () {
                        $(".alertMessage").css({visibility: "hidden"})
                  }, 3500);


            }

            prev_size = width

      }

      showalertMessage();


      if (width > (height + 200)) {
            $("table").width(height)
      }

      var size = $('td.dayTable').width();




      $("td.dayTable").height(size);


}
$(document).ready(function () {

      windowResize();

})


$(window).resize(windowResize);


var MyCalendar = function (_month, _year) {

      var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var cal_months_labels = ['January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'];

      var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      var cal_current_date = new Date();

      var month = (isNaN(_month)) ? cal_current_date.getMonth() : _month;
      var year = (isNaN(_year) || !_year) ? cal_current_date.getFullYear() : _year;

      var monthLength = cal_days_in_month[month];
      // compensate for leap year
      if (month == 1) { // February only!
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                  monthLength = 29;
            }
      }

      var date = new Date(year, month, 1);
      var startingDay = date.getDay();


      // this is the only complicate part
      var generateArrayDays = function () {
            var startArray = Array.apply(null, new Array(startingDay));

            //generate an array of arrays where every inner array has 7 elements and start filling those array
            //since the starting day i.e:  starting day 4 [null,null,null,1,2,3,4] would be the first inner array
            //algorithm elaborate by myself using lodash and functional concepts
            return _.range(1, monthLength + 1).reduce(function (mem, day) {
                  var _newArray;
                  var butlast = mem.slice(0, -1);
                  var last = mem.slice(-1)[0]
                  //if the last inner array is filled then append a new inner array with the current day in the loop
                  if (last.length >= 7) {
                        _newArray = mem.concat([
                              [day]
                        ]);
                        // if the last inner array is not filled with 7 numbers, then take all the arrays except the last inner one and append the las inner array with the number included
                        // [[...], [1,2,3,4,5,6]]  --> [ [...]] concat with [1,2,3,4,5,6,7]  the 7 was added to the last previously
                  } else {
                        _newArray = butlast.concat([last.concat(day)])
                  }

                  return _newArray

            }, [startArray])

      }

      return{

            fullDate: {
                  dayName: cal_days_labels[date.getDay()],
                  month: cal_months_labels[date.getMonth()],
                  day: date.getDate(),
                  year: date.getFullYear()},
            dayNames: cal_days_labels,
            _date: date,
            daysFormated: generateArrayDays
      }
}

var w = new MyCalendar(11, 2006);
var ww = new MyCalendar(7, 2003);