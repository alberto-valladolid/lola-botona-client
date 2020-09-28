import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from '../../../../_services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @HostBinding ('class') classes = 'row'; 

  errorMsg = null; 

  teacherMultiSelect = new FormControl();
  teachers: any[];
  

  options: any[] = [
    {value: 'alumn', viewValue: 'Alumno'},
    {value: 'teacher', viewValue: 'Profesor'},


  ];
  optionSelected: any;

  user  = {

    id:null,
    username: "",
    role : "ROLE_USER",
    name:"",
    password : "temporal",
    type:null    ,
    teachers: []
    
  }; 

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {

    this.userService.getAllTeachers().subscribe(
      res =>{
      
        this.teachers = res;   
        //console.log(this.teachers); 
      },
      err => console.log(err)
    )
 
  }


  onSubmit() {

    this.errorMsg = null;   

    this.user.type=this.optionSelected;

    this.user.teachers=this.teacherMultiSelect.value;

    this.userService.addUser(this.user).subscribe(
      res =>{
        this.router.navigate(['/admin/user']);
      },
      err =>{
        console.log(err);
        this.errorMsg = err.error.message; 
      } 
    ) 


    
  }


}
