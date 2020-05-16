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
    userId:null
    
  }; 


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

    console.log(this.options); 

  }

  onSubmit() {

    this.assist.date = this.options.date.value; 


    if((this.assist.type == "absence" || this.assist.type == "retrieve")  && this.options.date.value == null ){

      var text  = "Es necesario seleccionar una fecha para las ausencias o las recuperaciones";
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
        this.options.groupIds = data;
        var dias = ["ERROR","Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sabado"];
        this.options.groupIds.forEach(function (group) {
        
          group.groupString = dias[group.dayofweek] + " - " + group.description; 

        });

      },
      error => {
        console.log(error);
        
    });
  }


  
  retrieveUsers(){

    this.userService.getAllUsers()
    .subscribe(
      data => {
        this.options.userIds = data;


        this.options.userIds.forEach(function (user) {

          user.userString = user.username + " - " + user.name; 
       
        });

      },
      error => {
        console.log(error);
        
    });
  }


}
