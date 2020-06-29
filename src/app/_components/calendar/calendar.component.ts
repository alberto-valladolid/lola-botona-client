import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/_services/calendar.service';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../_dialogs/delete-user-dialog/dialog.component';
import { InfoDialogComponent } from '../_dialogs/info-dialog/info-dialog.component';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;

  date:string; 
  monthNumber;  //0 para el actual, -1 para el anterior etc. 
  month = ["Enero", "Febrero", "Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre","Enero"];
  currentDate: Date; 
  days; 
  minsEditEvents;
  pendingRecieveCount; 

  constructor(private calendarService: CalendarService,private userService: UserService,private matDialog: MatDialog,private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {

    this.monthNumber = 0; 

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    }

    this.currentDate = new Date(); 

    this.date =  "" + this.month[this.currentDate.getMonth()] +" "+ this.currentDate.getFullYear(); 
    this.calendarService.getCalendarData(this.monthNumber)
      .subscribe(
        data => {
          this.days = data.days;
          this.minsEditEvents = data.minsEditEvents;
          this.pendingRecieveCount = data.dataPendingRecieveCount;  
          //console.log(data);

        },
        error => {
          console.log(error);
          if(error.status == 401)
            this.logout();  
          
    });

  }


  reRenderCalendar(){

    this.calendarService.getCalendarData(this.monthNumber)
      .subscribe(
        data => {
          this.days = data.days;
          this.minsEditEvents = data.minsEditEvents;
          this.pendingRecieveCount = data.dataPendingRecieveCount;  
          //console.log(this.days);

        },
        error => {
          console.log(error);
          
    });

  }



  previousMonth(){
  

    
    this.monthNumber --; 

    var nexMonthDate = new Date();

    nexMonthDate.setMonth(nexMonthDate.getMonth() + this.monthNumber); 

    if(nexMonthDate.getDate() != this.currentDate.getDate()) nexMonthDate.setDate(0);


    this.date =  " " + this.month[nexMonthDate.getMonth()] +" "+ nexMonthDate.getFullYear(); 


    

    this.days = null; 
    this.reRenderCalendar();

  }

  nextMonth(){

    this.monthNumber ++; 

    var nexMonthDate = new Date();

    nexMonthDate.setMonth(nexMonthDate.getMonth() + this.monthNumber); 

    if(nexMonthDate.getDate() != this.currentDate.getDate()) nexMonthDate.setDate(0);


    this.date =  " " + this.month[nexMonthDate.getMonth()] +" "+ nexMonthDate.getFullYear(); 

    this.days = null; 
    this.reRenderCalendar();

  }

  createAbsence(idGroup:number, dayOfMonth: number,date:any, desc : string ){

    var text  = "¿Desea anular la clase "+ desc + " del "+dayOfMonth + " de " +this.date+ "?";
    const dialogRef = this.matDialog.open(DialogComponent, {
      height: '',
      width: '',
      data: {text:text , successButtonString:"Confirmar" }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       
        this.calendarService.createAbsence(date, idGroup ).subscribe(
          res =>{

            console.log(res.message);
            this.reRenderCalendar();
          },
          err => {

            var text  = err.error.message;
            this.matDialog.open(InfoDialogComponent, {
              height: '',
              width: '',
              data: {text:text , button:"Aceptar" }
            });

            console.log(err); 

          }
        )
      }
    });


  }


  createRetrieve(idGroup:number, dayOfMonth: number,date:any, timeOfDay : string ){

    this.userService.getPendingRetrieves()
      .subscribe(
        data => {

          if(data.count > 0){            
            var text  = "¿Desea recuperar una falta en la clase " +this.date+ " del día "+dayOfMonth + " de " +this.date+" ?";
            const dialogRef = this.matDialog.open(DialogComponent, {
              height: '',
              width: '',
              data: {text:text , successButtonString:"Confirmar" }
            });

            dialogRef.afterClosed().subscribe(result => {
              if(result){

                this.calendarService.createRetrieve(date, idGroup ).subscribe(
                  res =>{

                    console.log(res.message);
                    this.reRenderCalendar();
                  },
                  err => {

                    var text  = err.error.message;
                    this.matDialog.open(InfoDialogComponent, {
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

  showFeastAlert(){

    var text  = "No es posible modificar clases en días festivos."
    this.matDialog.open(InfoDialogComponent, {
      height: '',
      width: '',
      data: {text:text , button:"Aceptar" }
    });

  }

  timeOutEventAlert(){

    var text  = "La clase ya ha comenzado o faltan menos de " + this.minsEditEvents + " minutos para que comience";
    this.matDialog.open(InfoDialogComponent, {
      height: '',
      width: '',
      data: {text:text , button:"Aceptar" }
    });

  }

  checkIfCurrentDateIsGreaterThanDate(eventStartAt:string){

    var eventDate : Date = new Date(Date.parse(eventStartAt));   

    if(this.currentDate > eventDate){
      return 1;
    }else{
      return 0; 
    }  

  }

  checkIfCurrentDateIsLowerthanDateSubtracted(eventStartAt:string){

    var eventDate : Date = new Date(Date.parse(eventStartAt));   
    eventDate.setTime(eventDate.getTime() - this.minsEditEvents*60000);

    if( this.currentDate < eventDate){
      return 1;
    }else{
      return 0; 
    }    

  }


  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  
}
