import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/_services/calendar.service';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../_dialogs/delete-user-dialog/dialog.component';
import { InfoDialogComponent } from '../_dialogs/info-dialog/info-dialog.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  date:string; 
  month = ["Enero", "Febrero", "Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  days; 
  

  constructor(private calendarService: CalendarService,private userService: UserService,private matDialog: MatDialog) { }


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


  reRenderCalendar(){

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

  //SIN TERMINAR
  createAbsence(idGroup:number, dayOfMonth: number,date:any, timeOfDay : string ){

    var text  = "¿Desea ausentarse el día "+dayOfMonth + " de " +this.date+" por la "+ timeOfDay + "?";
    const dialogRef = this.matDialog.open(DialogComponent, {
      height: '',
      width: '',
      data: {text:text , successButtonString:"Confirmar" }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      
        // this.groupService.deleteGroup(id).subscribe(
        //   res =>{
        //     console.log(res); 

        //     this.reRenderTable();
        //   },
        //   err => console.log(err)
        // )

      }
    });


  }


  createRetrieve(idGroup:number, dayOfMonth: number,date:any, timeOfDay : string ){

    this.userService.getPendingRetrieves()
      .subscribe(
        data => {

          if(data.count > 0){


            
            var text  = "¿Desea asistir el día "+dayOfMonth + " de " +this.date+" por la "+ timeOfDay + "?";
            const dialogRef = this.matDialog.open(DialogComponent, {
              height: '',
              width: '',
              data: {text:text , successButtonString:"Confirmar" }
            });

            dialogRef.afterClosed().subscribe(result => {
              if(result){

                console.log("fecha"+date);
                this.calendarService.createRetrieve(date, idGroup ).subscribe(
                  res =>{

                    console.log(res.message);
                    this.reRenderCalendar();
                  },
                  err => {

                    var text  = err.error.message;
                    const dialogRef = this.matDialog.open(InfoDialogComponent, {
                      height: '',
                      width: '',
                      data: {text:text , button:"Aceptar" }
                    });

                    console.log(err); 

                  }
                )

              }
            });


          }else{

            var text  = "No tienes clases pendientes";
            const dialogRef = this.matDialog.open(InfoDialogComponent, {
              height: '',
              width: '',
              data: {text:text , button:"Aceptar" }
            });
          }

        },
        error => {
          console.log(error);
          
    });


  }

  
}
