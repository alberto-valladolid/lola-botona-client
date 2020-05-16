import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AssistService } from 'src/app/_services/assist.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { GroupService } from 'src/app/_services/group.service';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/_components/_dialogs/delete-user-dialog/dialog.component';




@Component({
  selector: 'app-assists',
  templateUrl: './assists.component.html',
  styleUrls: ['./assists.component.css']
})




export class AssistsComponent implements OnInit {

 
  currentDate = new Date();
  dateInOneMonth =  new Date(); 


  errorMsg = null; 
  groups:any; 
  users:any; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  
  

  dtGroups :any;
  userGroups:any; 

  selectedSort: any = {
    type:null,
    userId: null,
    groupId : null,
    fromDate : null,
    toDate: null
  
  };


  userGroupTypes = {recurrent:"Recurrente", retrieve:"Recuperación", absence:"Ausencia"}; 

  options: any = {
    types: 
    [
      {value: 'recurrent', viewValue: 'Asistencia'},
      {value: 'absence', viewValue: 'Ausencia'},
      {value: 'retrieve', viewValue: 'Recuperación'},
      
    ],
    userIds: [],
    groupIds : [],
    fromDate: new FormControl( new Date() ),
    toDate :  new FormControl(this.dateInOneMonth)
 
  };

  


  constructor(private assistService: AssistService,private router: Router ,private chRef : ChangeDetectorRef,private groupService: GroupService,private userService: UserService,private matDialog: MatDialog) { }




  ngOnInit(): void {

    this.dateInOneMonth.setMonth(this.dateInOneMonth.getMonth()+1)

    this.retrieveGroups(); 
    this.retrieveUsers(); 
    





    this.dtOptions = {
      language: {
        "decimal":        "",
        "emptyTable":     "La tabla está vacía",
        "info":           "Mostrando de _START_ a _END_ de _TOTAL_  registros",
        "infoEmpty":      "Mostrando 0 de 0 registros",
        // "infoFiltered":   "(Registros totales  _MAX_ )",
        "infoFiltered":   "",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Registros por página _MENU_ ",
        "loadingRecords": "Cargando...",
        "processing":     "Procesando...",
        "search":         "Filtrar:",
        "zeroRecords":    "No se han encontrado registros",
        "paginate": {
            "first":      "Primero",
            "last":       "Último",
            "next":       "Sig",
            "previous":   "Ant"
        },
        "aria": {
            "sortAscending":  ": Ordenar ascendentemente",
            "sortDescending": ": Ordenar descendentemente"
        }
      },

    };

    if(this.options.fromDate.value != null)
    this.selectedSort.fromDate =  formatDate(this.options.fromDate.value)  ;

    if(this.options.toDate.value != null)
      this.selectedSort.toDate =     formatDate(this.options.toDate.value);
    
    this.getData(); 
   

  }

  getData(){
    this.assistService.getAssistData(this.selectedSort)
      .subscribe(
        data => { 
          this.userGroups = data;
          this.chRef.detectChanges();
          this.dtTrigger.next();
        
          var userObject, groupObject;
          var options = this.options; 
          
          this.userGroups.forEach(function (userGroup) {
            
            var userObject =      options.userIds.filter(obj => {
              return obj.id === userGroup.userid
            });         
            userGroup.userString = userObject[0].userString; 

            var groupObject =      options.groupIds.filter(obj => {
              return obj.id === userGroup.groupid
            });         
            userGroup.groupString = groupObject[0].groupString; 
  
          });


        },
        error => {
          console.log(error);
          
          
    }); 
  }

  updateData(){
    this.dtElement.dtInstance.then((dtInstance : DataTables.Api) =>  {

    
        // Destroy the table first in the current context
        dtInstance.destroy();

        this.assistService.getAssistData(this.selectedSort)
        .subscribe(
          data => {
            this.userGroups = data;
            this.chRef.detectChanges();
            this.dtTrigger.next();

            var userObject, groupObject;
            var options = this.options; 
            
            this.userGroups.forEach(function (userGroup) {
              
              var userObject =      options.userIds.filter(obj => {
                return obj.id === userGroup.userid
              });         
              userGroup.userString = userObject[0].userString; 
  
              var groupObject =      options.groupIds.filter(obj => {
                return obj.id === userGroup.groupid
              });         
              userGroup.groupString = groupObject[0].groupString; 
    
            });

          },
          error => {
            console.log(error);
        });

    });
  }

  saveFilters(){

    if(this.options.fromDate.value != null)
      this.selectedSort.fromDate =  formatDate(this.options.fromDate.value)  ;

    if(this.options.toDate.value != null)
      this.selectedSort.toDate =     formatDate(this.options.toDate.value);
    
    this.updateData(); 

    
  }



  resetFilters(){

    this.selectedSort = {
      type:null,
      userId: null,
      groupId : null,
      fromDate :  new FormControl( new Date() ),
      toDate: new FormControl(this.dateInOneMonth)
    };

    this.options.fromDate =  new FormControl( new Date() ),
    this.options.fromDatetoDate = new FormControl(this.dateInOneMonth)
 



  }

  generateRow(){
    this.router.navigate(['admin/event/add']);
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

  deleteUserGroup(userGroup){

    console.log(userGroup); 

    if(userGroup.type == "recurrent")
      var text  = "¿Desea eliminar el registro del tipo '"+ this.userGroupTypes[userGroup.type] + "' para el usuario '" + userGroup.userString + "' y el grupo '" + userGroup.groupString + "' ?";
    else
      var text  = "¿Desea eliminar el registro del tipo '"+ this.userGroupTypes[userGroup.type] + "' para el usuario '" + userGroup.userString + "' ,  grupo '" + userGroup.groupString + "' y fecha '"+ userGroup.dateat.substr(0, 10) +"' ?";

    const dialogRef = this.matDialog.open(DialogComponent, {
      height: '',
      width: '',
      data: {text:text , successButtonString:"Eliminar" }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){

        this.assistService.deleteUserGroup(userGroup.id).subscribe(
          res =>{
            console.log(res); 

            this.saveFilters();
          },
          err => console.log(err)
        )

      }
    });




  }


}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
