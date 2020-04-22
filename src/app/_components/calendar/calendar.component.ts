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
  month = ["Enero", "Febrero", "Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  currentDate; 
  days; 
  

  constructor(private calendarService: CalendarService,private userService: UserService,private matDialog: MatDialog,private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    }

    this.currentDate = new Date();    
    this.date =  "" + this.month[this.currentDate.getMonth()] +" "+ this.currentDate.getFullYear(); 
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

    var text  = "¿Desea faltar el día "+dayOfMonth + " de " +this.date+" por la "+ timeOfDay + "?";
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


            
            var text  = "¿Desea recuperar el día "+dayOfMonth + " de " +this.date+" por la "+ timeOfDay + "?";
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

  
}
