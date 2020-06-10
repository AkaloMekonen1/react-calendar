import React from 'react';
import moment from 'moment'
import './styles.css';

export default class Calendar extends React.Component {
 constructor(){
   super();
   this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
   this.daysInMonth = this.daysInMonth.bind(this);
   this.currentDay = this.currentDay.bind(this);
   this.month = this.month.bind(this);
   this.monthList = this.monthList.bind(this);
   this.setMonth = this.setMonth.bind(this);
   this.showMonth = this.showMonth.bind(this);
   this.yearList = this.yearList.bind(this)
   this.year = this.year.bind(this);
   this.yearTable = this.yearTable.bind(this);
   this.showYear = this.showYear.bind(this)
   this.setYear = this.setYear.bind(this)
   this.state = {
    dateObject: moment(),
    monthObject: moment.months(),
    showMonthTable: false,
    showYearTable: false,
   } 
 }
//returns which day in week the month start  
    firstDayOfMonth(){
      let dateObject = this.state.dateObject;
      let firstDay = moment(dateObject).startOf('month').format('d');
      return firstDay
    };
//returns the numbers of day in a given month
    daysInMonth(){
      return this.state.dateObject.daysInMonth();
    }
//returns the current day
    currentDay(){
      return this.state.dateObject.format("D");
    }
//returns the current month
    month(){
      return this.state.dateObject.format("MMMM");
    }
//return the current year
year(){
  return this.state.dateObject.format("Y")
}    
//return array with all of the months
    monthList(){ 
      let months = []
      let news = this.state.monthObject 
      news.map(data=>{
        months.push(<td key = {data} onClick={e => {
          this.setMonth(data);
        }} className="month-list">{data}</td>)
      })
      return months
    }
// a function that returns the clicked month 
    setMonth(month){
      let monthNo = this.state.monthObject.indexOf(month)//get month number
      let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo); // change month value
    this.setState({
      dateObject: dateObject, // add to state
      showMonthTable: !this.state.showMonthTable
      });
    }
//toggles the month's bar from false to true and versa vise
    showMonth(){
      this.setState({
        showMonthTable: !this.state.showMonthTable
      })
    }
// return array of 12 years
yearList(){
  const years = [];
  const dateStart = moment()
  const dateEnd = moment().add(11,'y')
  while(dateEnd.diff(dateStart,"years")>=0){
    years.push(dateStart.format("YYYY"))
    dateStart.add(1, 'year')
  }
  return years
}    
//a function that returns table of the years
yearTable(){
  const arrayYears = this.yearList()
  const newYears = [];
  arrayYears.map((year)=>{
    newYears.push(<td key={year} onClick={e=>{
      this.setYear(year)}} className="year-list"  
    >{year}</td>)
  })
  return newYears
}
//toggles the years' bar from false to true and versa vise
showYear(){
  this.setState({
    showYearTable: !this.state.showYearTable
  })
}
//returns the clicked year
setYear(year){
   let dateObject = Object.assign({}, this.state.dateObject);
   dateObject = moment(dateObject).set("year", year)
   this.setState({
     dateObject: dateObject,
     showYearTable: !this.state.showYearTable,
     showMonthTable: !this.state.showMonthTable
   })
}

    render(){
       const weekDayShort = moment.weekdaysShort();//return the name of days 
        let weekDayShortName = weekDayShort.map(day => {
            return (
              <th key={day}>
               {day}
              </th>
            ); 
         });
//leave the days that comes before the first day of month empty
         let blanks = []
         for(let i=0; i < this.firstDayOfMonth(); i++){
           blanks.push(
             <td  className = "week-day empty">{""}</td>
             )
         }
//arranging the days in giving month
         let daysInMonth = []
         for(let d=1; d <= this.daysInMonth(); d++){
           let currentDay = d == this.currentDay() ? 'today' : ''
           daysInMonth.push(
             <td key={d} className={`week-day ${currentDay}`}>{d}</td>
           );
         }
//arranging the empty days and the number of month days on week days  <th>
         var totalSlots =[...blanks, ...daysInMonth];
         let rows = []; //rows hold </td> while going to a new row
         let cells = []; //cells contain each </td> to assign to each row
         totalSlots.forEach((row,i)=>{
           if(i % 7 !==0){
             cells.push(row); // if index not equal 7 that means not go to next week
           }else {
             rows.push(cells); // when reach next week we contain all td in last week to rows 
             cells = [];
             cells.push(row); // in current loop we still push current row to new container
           }
           if(i===totalSlots.length-1){
             rows.push(cells) // when end loop we add remain date
           }
         });
         let rowDays = rows.map((d, i)=>{
           return <tr>{d}</tr>
         });
//arranging the months on 3 different lines
         let monthsList = this.monthList()
         let monthCells = [];
         let monthRows = [];
         monthsList.forEach((element,i) => {
           if(i % 3 !==0){
             monthCells.push(element)
           }else{
             monthRows.push(monthCells)
             monthCells = []
             monthCells.push(element)
           }
           });
           monthRows.push(monthCells)
           const listMonth = monthRows.map((m)=>{
             return <tr>{m}</tr>
           })
           
//arranging the years on 3 different lines   
           let yearsList = this.yearTable(); 
           let yearsCells = [];
           let yearsRow = [];
           yearsList.forEach((number,i)=>{
             if(i%3 !==0 || i==0){
               yearsCells.push(number)
             }else{
               yearsRow.push(yearsCells)
               yearsCells = []
               yearsCells.push(number)
             }
           })
           yearsRow.push(yearsCells)
           const listYears = yearsRow.map((y)=>{
            return <tr>{y}</tr>
           })
        
         return(
             <div>
               <div className="calendar-month">
                  <div>
                    <span className="calendar-month__label-month" onClick={e=>{this.showMonth()}}>{this.month()}</span>
                    <span className="calendar-month__label-year" onClick={e=>{this.showYear()}}>{this.year()}</span>
                  </div>
               </div>{this.state.showYearTable&&(
                     <table>
                        <thead>
                          <tr>
                            <th colSpan="4">Select a Year</th>
                          </tr>
                        </thead>
                        <tbody>{listYears}</tbody>
                      </table>)}
                     {this.state.showMonthTable&&(
                       <table className="month-list">
                        <thead>
                         <tr>
                           <th colSpan="4">Select a month</th>
                         </tr>
                        </thead>
                       <tbody>{listMonth}</tbody>
                     </table>)}
               {!this.state.showMonthTable && !this.state.showYearTable &&(
                <div className="calendar-date"> 
                 <table className="week-day">
                 <thead>
                   <tr>
                     {weekDayShortName}
                   </tr>
                 </thead>
                 <tbody>{rowDays}</tbody>
               </table>
               </div>)}
             </div>
             
         )
    }

}
