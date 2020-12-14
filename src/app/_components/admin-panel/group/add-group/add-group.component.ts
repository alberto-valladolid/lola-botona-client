import { Component, OnInit , HostBinding} from '@angular/core';
import { GroupService } from '../../../../_services/group.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  @HostBinding ('class') classes = 'row'; 

  errorMsg = null; 

  optionSelected: string;
  options: string[] = ["Si", "No"];
  
  dayofweek : string; 

  //Teachers
  teachers:any [];

  group  = {

    id:null,
    capacity: null,
    description : "",
    active:false,
    dayofweek : null,    
    showorder  : "" ,
    startTimeHours:null,
    startTimeMins:null,
    teacherId:null
    
  }; 

  constructor(private groupService: GroupService,private router: Router,private userService: UserService) { }
  
  ngOnInit(): void {
    this.retrieveTeachers(); 
  }

  onSubmit() {

    if (this.optionSelected == "Si"){
      this.group.active = true;
    }else{
      this.group.active = false;
    }
    this.group.dayofweek = Number(this.dayofweek); 
    this.group.teacherId = Number(this.group.teacherId); 

    this.errorMsg = null;  


    this.groupService.addGroup(this.group).subscribe(
      res =>{
        this.router.navigate(['/admin/group']);
      },
      err =>{
        this.errorMsg = err.error.message; 
      } 
    )
  }
  retrieveTeachers(){

    this.userService.getAllTeachers()
    .subscribe(
      data => {
        this.teachers = data;

 /*     this.teachers.forEach(function (teacher) {
          teacher.teacherString = teacher.username + " - " + teacher.name;        
        }); */

      },
      error => {
        console.log(error);
        
    });
  }
}
