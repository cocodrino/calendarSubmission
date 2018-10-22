/** @jsx React.DOM */

/* 
THIS IS THE CODE BEFORE COMPILE THE TEMPLATES...IS MUCH MORE READABLE
     var CalendarManager = React.createClass({
      //manage what date render the calendar, arrows for time and point for year
      getInitialState: function () {
            var dateNow = new MyCalendar()
            return ({
                  CalendarData: dateNow,
                  highlightDay: true,
                  activateChangeYear: false

            })
      },


      changeMonth: function (att) {
            var _prevCalendarData = this.state.CalendarData;
            var _newCalendarData;

            //need a big refactor
            if (att === "up") {
                  //if is not Dicember add 1 month to actual date, else start in january (0) next year
                  if (_prevCalendarData._date.getMonth() < 11) {
                        _newCalendarData = new MyCalendar(
                           _prevCalendarData._date.getMonth() + 1,
                           _prevCalendarData.fullDate.year);
                  } else {
                        _newCalendarData = new MyCalendar(
                           0,
                           _prevCalendarData.fullDate.year + 1);
                  }

            } else if (att === "down") {
                  //if is not january remove 1 month to actual date, else start in dicember (11) prev year
                  if (_prevCalendarData._date.getMonth() >= 1) {
                        _newCalendarData = new MyCalendar(
                           _prevCalendarData._date.getMonth() - 1,
                           _prevCalendarData.fullDate.year);
                  } else {
                        _newCalendarData = new MyCalendar(
                           11,
                           _prevCalendarData.fullDate.year - 1);
                  }
            }

            var thisMonth = new Date().getMonth() === _newCalendarData._date.getMonth()
            this.setState({CalendarData: _newCalendarData, highlightDay: thisMonth});


      },

      handleYearChange : function (e) {
          if(e.target.value.length==4){
                var _newCalendarData=new MyCalendar(
                   this.state.CalendarData._date.getMonth(),
                   e.target.value);

                this.setState({CalendarData:_newCalendarData})
          }
      },

      render: function () {
            var fullWidth = {width: "100%"};
            var InlineIt = {display: "inline"};
            var Inline = {display: "inline", opacity: 0.3};


            var labelOrInputChanger =( function () {
                  this.setState({activateChangeYear: !this.state.activateChangeYear});
                  if(this.state.activateChangeYear) $('.inputYear').focus();

                  return false
            }).bind(this);

            var labelOrInpt = this.state.activateChangeYear ?
               <input type="text" className="inputYear"
               onChange={this.handleYearChange}/>:
               <p style={Inline}
               className="yearLabel"
               onClick ={labelOrInputChanger}
               >{this.state.CalendarData.fullDate.year}</p>

            return(
               <div>
                     <div style={fullWidth}>
                           <div className="uk-container-center" id="centerIT">
                                 <div className="alertMessage uk-alert uk-alert-danger">
                                 If the calendar  doesn't fix well when resize please reload the page..</div>
                                 <div className="calendar-header uk-grid">
                                       <div className="uk-width-1-5">
                                             <i className="uk-icon-arrow-left uk-icon-medium"
                                             onClick ={this.changeMonth.bind(null, "down")}
                                             id="leftArrow">Prev
                                             </i>
                                       </div>

                                       <div className="uk-width-3-5">


                                             <p style={InlineIt}
                                             className="MonthLabel"
                                             >{this.state.CalendarData.fullDate.month + "   "}</p>


                                             <div style={Inline}
                                                onClick ={labelOrInputChanger}
                                             >{labelOrInpt}</div>


                                       </div>

                                       <div className="uk-width-1-5">
                                             <i className="uk-icon-arrow-right uk-icon-medium"
                                             onClick = {this.changeMonth.bind(null, "up")}
                                             id="rigthArrow">Next</i>
                                       </div>
                                 </div>
                           </div>

                     </div>

                     <Calendar ref="CalendarTable" calendarData={this.state.CalendarData}
                     isToday={this.state.highlightDay}/>


               </div>
               )
      }
});


var Calendar = React.createClass({
      getInitialState: function () {
            return ({
                  change: true
            })
      },

      //I need check the problem in the size of th latest element...just now this method fix the problem
      fixHeightLatest: function () {
            var fixH = $("tbody tr:first").height();
            $("tbody tr:last").height(fixH);
      },

      hoverEffect: function () {
            $('tbody td').mouseenter(function () {
                  $(this).velocity({backgroundColorBlue: '80%'})
            })
      },
      componentDidMount: function () {
            this.hoverEffect()
            this.runAnimation();
            this.setState({change: true})

      },

      runAnimation: function () {
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
                              opacity: 0.9,
                              backgroundColorAlpha: 0.1,
                              backgroundAlpha: 0.6,
                              top: 10
                        }, {
                              duration: 500,
                              delay: (200 * (0.5 * j + i))

                        })
                  })


            })
            this.setState({change: true});
      },

      componentDidUpdate: function () {
            console.log("updating")
            if (!this.state.change) {
                  this.fixHeightLatest();
                  this.runAnimation();
            }
      },

      componentWillReceiveProps: function () {
            this.setState({change: false});
      },

      highlightElem: function (e, b) {
          var message = b==true? "entra" : "sale"
            console.log(message);
      },

      render: function () {


            // style={applyChangeStyle(0.5 * j + i)}
            var highLightToday = (function (day) {

                  if(this.props.isToday && day == this.props.calendarData._date.getDate()) {
                       return {color: "#ff4136"}
                  }else{
                        return {}
                  }
            }).bind(this)

            var daysArr = this.props.calendarData.daysFormated().map(function (row, j) {
                  var eachDay = row.map(function (e, i) {

                        return(
                           <td  key={i + "." + j}
                           className="dayTable">
                                 <div className="resizableText" style = {highLightToday(e)}>{e}</div>
                           </td>)
                  })
                  return(

                     <tr key ={j}> {eachDay} </tr>
                     )
            })

            var daysLabel = MyCalendar().dayNames.map(function (name, i) {
                  return(
                     <th key={"daysLabel" + (i + 1)}>{name}</th>
                     )
            })


            return(
               <div>
                     <LineLoad state={this.state.change}/>
                     <table className="uk-container-center ">

                           <thead>
                                 <tr className="daysLabl">{daysLabel}</tr>
                           </thead>
                           <tbody> {daysArr}</tbody>


                     </table>
               </div>

               )
      }
});

var LineLoad = React.createClass({
      animateBlinkLine: function () {
            var lineElement = this.getDOMNode();
            $(lineElement).velocity({
                  opacity: 0
            }, {
                  duration: 800,
                  easing: "easeInSine"
            })
            $(lineElement).velocity("reverse");
      },

      componentDidUpdate: function () {
            if (!this.props.state) {
                  this.animateBlinkLine();
            }
      },

      render: function () {
            var lineStyle = {opacity: 0.5, width: "100%", height: 2, backgroundColor: "#3d9970"};
            return(
               <div style={lineStyle}></div>
               )
      }
});


React.renderComponent(<CalendarManager/>,
   document.getElementById("calendarPlace"));
*/

/** @jsx React.DOM */

var If = React.createClass({displayName: 'If',
      render: function () {
            var _show = this.props.condition ? this.props.children : React.DOM.div(null);
            return(

               _show

               )
      }
});

var YearInpt = React.createClass({displayName: 'YearInpt',
         getInitialState: function () {
               return ({currentValue: this.props.year, showYearOrInput: "year", showArrows: false})
         },

         componentDidUpdate : function () {

         },

      shouldComponentUpdate : function (ns,np){
            return ((ns!==this.state) || np)
      } ,

         handleChange: function (event) {
               this.setState({currentValue: event.target.value});

               this.props.onYearChange(this.state.currentValue)
               return false
         },

         showArrowsHandler: function (boolShow) {
               this.setState({showArrows: boolShow})
               return false
         },

         plusOneYear: function () {
               this.setState({currentValue: this.state.currentValue + 1})
               this.props.onYearChange(this.state.currentValue)

         },

         minOneYear: function () {
               this.setState({currentValue: this.state.currentValue - 1})
               this.props.onYearChange(this.state.currentValue)

         },

         render: function () {
               var alternateComponent = (function (value) {
                     this.setState({showYearOrInput: value});
                     return false;
               }).bind(this)

               var enableLabel = function (e) {
                     if (e.keyCode == '13') alternateComponent("year")
                     return false
               };

               var alternableComponent = this.state.showYearOrInput === "year" ?
                  React.DOM.div(
                  {onClick:alternateComponent.bind(this, "input")}, 
                        React.DOM.p(null, this.state.currentValue)
                  ) :

                  React.DOM.input(

                  {value:this.state.currentValue,
                  onChange:this.handleChange,
                  min:4,
                  onKeyUp:enableLabel}
                  );


               return(
                  React.DOM.div( {className:"Componentalternable uk-grid",
                  onMouseEnter:this.showArrowsHandler.bind(this, true),
                  onMouseLeave:this.showArrowsHandler.bind(this, false)}
                  , 
                        React.DOM.div( {className:"ArrowContainer uk-width-1-1"}, 
                              If( {condition:this.state.showArrows}, 


                                    React.DOM.div( {className: " arrows", onClick:this.plusOneYear}, 
                                          React.DOM.i( {className:"fa fa-angle-up flechau  uk-animation-slide-top"})
                                    )

                              )
                        ),

                        React.DOM.div( {className:"uk-width-1-1 yearLabel"}, 
                              alternableComponent
                        ),
                        React.DOM.div( {className:"ArrowContainer uk-width-1-1 " }, 
                              If( {condition:this.state.showArrows}, 


                                    React.DOM.div( {className: " arrows", onClick: this.minOneYear}, 
                                          React.DOM.i( {className:"fa fa-angle-down flechad uk-animation-slide-bottom"})
                                    )

                              )
                        )
                  )
                  )
         }
   })
   ;


var CalendarManager = React.createClass({displayName: 'CalendarManager',
      //manage what date render the calendar, arrows for time and point for year
      getInitialState: function () {
            var dateNow = new MyCalendar()
            return ({
                  CalendarData: dateNow,
                  highlightDay: true

            })
      },


      changeMonth: function (att) {
            var _prevCalendarData = this.state.CalendarData;
            var _newCalendarData;

            //need a big refactor
            if (att === "up") {
                  //if is not Dicember add 1 month to actual date, else start in january (0) next year
                  if (_prevCalendarData._date.getMonth() < 11) {
                        _newCalendarData = new MyCalendar(
                           _prevCalendarData._date.getMonth() + 1,
                           _prevCalendarData.fullDate.year);
                  } else {
                        _newCalendarData = new MyCalendar(
                           0,
                           _prevCalendarData.fullDate.year + 1);
                  }

            } else if (att === "down") {
                  //if is not january remove 1 month to actual date, else start in dicember (11) prev year
                  if (_prevCalendarData._date.getMonth() >= 1) {
                        _newCalendarData = new MyCalendar(
                           _prevCalendarData._date.getMonth() - 1,
                           _prevCalendarData.fullDate.year);
                  } else {
                        _newCalendarData = new MyCalendar(
                           11,
                           _prevCalendarData.fullDate.year - 1);
                  }
            }

            var thisMonth = new Date().getMonth() === _newCalendarData._date.getMonth()
            this.setState({CalendarData: _newCalendarData, highlightDay: thisMonth});


      },

      render: function () {
            var fullWidth = {width: "100%"};
            var InlineIt = {display: "inline"};
            var InlineYear = {display: "inline", opacity: 0.3};

            return(
               React.DOM.div(null, 
                     React.DOM.div( {style:fullWidth}, 
                           React.DOM.div( {className:"uk-container-center", id:"centerIT"}, 
                                 React.DOM.div( {className:"alertMessage uk-alert uk-alert-danger"}, 
                                 " If the calendar  doesn't fix well when resize please reload the page.."),
                                 React.DOM.div( {className:"calendar-header uk-grid"}, 
                                       React.DOM.div( {className:"uk-width-1-5"}, 
                                             React.DOM.i( {className:"fa fa-chevron-circle-left",
                                             onClick: this.changeMonth.bind(null, "down"),
                                             id:"leftArrow"}, "  Prev  "
                                             )
                                       ),

                                       React.DOM.div( {className:"uk-width-3-5"}, 


                                             React.DOM.p( {style:InlineIt,
                                             className:"MonthLabel"}
                                             , this.state.CalendarData.fullDate.month + "   "),


                                             React.DOM.p( {style:InlineYear,
                                             className:"yearLabel"}
                                             , this.state.CalendarData.fullDate.year)


                                       ),

                                       React.DOM.div( {className:"uk-width-1-5"}, 
                                             React.DOM.i( {className:"fa fa-chevron-circle-right",
                                             onClick:  this.changeMonth.bind(null, "up"),
                                             id:"rigthArrow"}, "  Next")
                                       )
                                 )
                           )

                     ),

                     Calendar( {ref:"CalendarTable", calendarData:this.state.CalendarData,
                     isToday:this.state.highlightDay})


               )
               )
      }
});


var Calendar = React.createClass({displayName: 'Calendar',
      getInitialState: function () {
            return ({
                  change: true
            })
      },

      //I need check the problem in the size of th latest element...just now this method fix the problem
      fixHeightLatest: function () {
            var fixH = $("tbody tr:first").height();
            $("tbody tr:last").height(fixH);
      },

      hoverEffect: function () {
            $('tbody td').mouseenter(function () {
                  $(this).velocity({backgroundColorBlue: '80%'})
            })
      },
      componentDidMount: function () {
            this.hoverEffect()
            this.runAnimation();
            this.setState({change: true})

      },

      runAnimation: function () {
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
                              opacity: 0.9,
                              backgroundColorAlpha: 0.1,
                              backgroundAlpha: 0.6,
                              top: 10
                        }, {
                              duration: 500,
                              delay: (200 * (0.5 * j + i))

                        })
                  })


            })
            this.setState({change: true});
      },

      componentDidUpdate: function () {
            console.log("updating")
            if (!this.state.change) {
                  this.fixHeightLatest();
                  this.runAnimation();
            }
      },

      componentWillReceiveProps: function () {
            this.setState({change: false});
      },

      highlightElem: function (e, b) {
          var message = b==true? "entra" : "sale"
            console.log(message);
      },

      render: function () {


            // style={applyChangeStyle(0.5 * j + i)}
            var highLightToday = (function (day) {

                  if(this.props.isToday && day == this.props.calendarData._date.getDate()) {
                       return {color: "#ff4136"}
                  }else{
                        return {}
                  }
            }).bind(this)

            var daysArr = this.props.calendarData.daysFormated().map(function (row, j) {
                  var eachDay = row.map(function (e, i) {

                        return(
                           React.DOM.td(  {key:i + "." + j,
                           className:"dayTable"}, 
                                 React.DOM.div( {className:"resizableText", style:  highLightToday(e)}, e)
                           ))
                  })
                  return(

                     React.DOM.tr( {key: j},  eachDay )
                     )
            })

            var daysLabel = MyCalendar().dayNames.map(function (name, i) {
                  return(
                     React.DOM.th( {key:"daysLabel" + (i + 1)}, name)
                     )
            })


            return(
               React.DOM.div(null, 
                     LineLoad( {state:this.state.change}),
                     React.DOM.table( {className:"uk-container-center " }, 

                           React.DOM.thead(null, 
                                 React.DOM.tr( {className:"daysLabl"}, daysLabel)
                           ),
                           React.DOM.tbody(null,  daysArr)


                     )
               )

               )
      }
});

var LineLoad = React.createClass({displayName: 'LineLoad',
      animateBlinkLine: function () {
            var lineElement = this.getDOMNode();
            $(lineElement).velocity({
                  opacity: 0
            }, {
                  duration: 800,
                  easing: "easeInSine"
            })
            $(lineElement).velocity("reverse");
      },

      componentDidUpdate: function () {
            if (!this.props.state) {
                  this.animateBlinkLine();
            }
      },

      render: function () {
            var lineStyle = {opacity: 0.5, width: "100%", height: 2, backgroundColor: "#3d9970"};
            return(
               React.DOM.div( {style:lineStyle})
               )
      }
});


React.renderComponent(CalendarManager(null),
   document.getElementById("calendarPlace"));
/*React.renderComponent(<Shit/>, document.getElementById("shitPlace"));*/
/**
 * Created by yo on 4/30/14.
 */

