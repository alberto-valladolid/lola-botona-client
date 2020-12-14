import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/_services/group.service';
import { UserService } from 'src/app/_services/user.service';
import { FormControl } from '@angular/forms';
import { AssistService } from 'src/app/_services/assist.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from 'src/app/_components/_dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-add-assist',
  templateUrl: './add-assist.component.html',
  styleUrls: ['./add-assist.component.css']
})
export class AddAssistComponent implements OnInit {

  assist = {

    id:null,
    date: null,
    type :null,
    groupId:null,
    userId:null,
    addDeleteRetrieve:null
    
  }; 

  disableButtons : boolean = false; 

  options: any = {
    types: 
    [
      {value: 'recurrent', viewValue: 'Asistencia'},
      {value: 'absence', viewValue: 'Ausencia'},
      {value: 'retrieve', viewValue: 'Recuperación'},
      
    ],
    userIds: [],
    groupIds : [],
    date : new FormControl()

 
  };

  errorMsg = null; 

  constructor(private groupService: GroupService,private userService: UserService,private assistService: AssistService,private router: Router,private matDialog: MatDialog) { }

  ngOnInit(): void {

    this.retrieveGroups();
    this.retrieveUsers(); 

    //console.log(this.options); 




  }

  onSubmit() {

    this.assist.date = this.options.date.value; 
    //this.assist.addDeleteRetrieve = this.options.addDeleteRetrieve.value; 





   

    if((this.assist.type == "absence" || this.assist.type == "retrieve")   && this.options.date.value == null ){

      var text  = "Es necesario seleccionar una fecha para las ausencias o las recuperaciones";
      this.matDialog.open(InfoDialogComponent, {
        height: '',
        width: '',
        data: {text:text , button:"Aceptar" }
      });

    }else if((this.assist.type == "absence" || this.assist.type == "retrieve")   &&  this.assist.addDeleteRetrieve == null){

      var text  = "Es necesario seleccionar una opción en el desplegable 'Generar falta/consumir falta' cuando se quiere crear una una ausencia o una recuperación";
      this.matDialog.open(InfoDialogComponent, {
        height: '',
        width: '',
        data: {text:text , button:"Aceptar" }
      });

    }else{

      //console.log(this.assist); 
        
      this.assistService.addAssist(this.assist).subscribe(
        res =>{
          this.router.navigate(['/admin/event']);
        },
        err =>{
          this.errorMsg = err.error.message; 
        } 
      ) 
    }
    // console.log(this.assist);
    // console.log(this.options);

  }

  retrieveGroups(){

    this.groupService.getAllGroups()
    .subscribe(
      data => {
        this.options.groupIds = data.groups;
        var dias = ["ERROR","7 Domingo","1 Lunes","2 Martes","3 Miércoles","4 Jueves","5 Viernes","6 Sabado"];
        this.options.groupIds.forEach(function (group) {
        
          group.groupString = dias[group.dayofweek] + " - " + group.description; 

        });
        this.options.groupIds.sort((a,b) => a.groupString.localeCompare(b.groupString));
      },
      error => {
        console.log(error);
        
    });
  }


/*   onChangeTypeSelect(value:string){
    
    if(value=="absence" || value=="retrieve" )
      this.options['date'].enable();
    else{
      this.options['date'].disable();

    }
  } */

  
  retrieveUsers(){

    this.userService.getAllUsers()
    .subscribe(
      data => {
        this.options.userIds = data;


        this.options.userIds.forEach(function (user) {

          user.userString = user.username + " - " + user.name; 
       
        });
        this.options.userIds.sort((a,b) => a.userString.localeCompare(b.userString));
      },
      error => {
        console.log(error);
        
    });
  }


}
