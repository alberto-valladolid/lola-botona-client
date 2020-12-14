import { Component, OnInit, HostBinding } from '@angular/core';

import { UserService } from '../../../../_services/user.service';
import {Router, ActivatedRoute} from '@angular/router'; 
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  errorMsg = null; 

  optionSelected: string;
  options: any[] = [
    {value: 'alumn', viewValue: 'Alumno'},
    {value: 'teacher', viewValue: 'Profesor'},
  ];
  
  teacherMultiSelect = new FormControl();
  teachers: any[] = [];
  idTeachersAsigned: any[] = [];

  user  = {

    id:null,
    username: "",
    role : "ROLE_USER",
    name:"",
    password : "",     
    type:"",  
    teachers:[],
    
  }; 

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,private router: Router) { }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params; 
    this.user.id = params.id;      

    this.userService.getAllTeachers().subscribe(
      res =>{      
        this.teachers = res;  
      },
      err => console.log(err)
    )

    this.userService.getUserById(params.id).subscribe(

      res =>{

        this.user.id = res.user.id; 
        this.user.username = res.user.username; 
        this.user.role = res.user.role; 
        this.user.name = res.user.name; 
        this.user.type = res.user.type; 
       

        if(res.user.type == "alumn"){
          this.optionSelected = "alumn"; 
        }else if(res.user.type == "teacher"){
          this.optionSelected = "teacher"; 
        }
       
      console.log(this.optionSelected); 

        res.UserTeachers.forEach(teacher => 
          this.idTeachersAsigned.push(teacher)
         
        );
 
        this.teacherMultiSelect.setValue(this.idTeachersAsigned); 
 
      },
      err => console.log(err)
    )
  }


  onSubmit() {

    this.user.type=this.optionSelected;
    this.user.teachers=this.teacherMultiSelect.value;
    
    this.errorMsg = null;   
    this.userService.editUser(this.user).subscribe(
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
