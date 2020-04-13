import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/_services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  date:string; 
  month = ["Enero", "Febrero", "Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  days; 
  

  constructor(private calendarService: CalendarService) { }


  ngOnInit(): void {
    var currentDate = new Date();    
    this.date =  "" + this.month[currentDate.getMonth()] +" "+ currentDate.getFullYear(); 
    
    this.calendarService.getCalendarData()
      .subscribe(
        data => {
          this.days = data;
          console.log(this.days);

        },
        error => {
          console.log(error);
          
    });

  }



}
