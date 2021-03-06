import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/_services/group.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {


  @HostBinding ('class') classes = 'row'; 

  errorMsg = null; 
  

  //for radio buttons
  optionSelected: string;
  options: string[] = ["Si", "No"];  


  //Teachers
  teachers:any [];

  //for tittle
  dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sabado","Domingo"];


  tittle: string; 


  group  = {
    id:null,
    capacity: null,
    description : "",
    active:false,
    dayofweek : null,    
    showorder  : ""  ,
    startTimeHours:null,
    startTimeMins:null,
    teacherId:null
  }; 


  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,private router: Router, private groupService: GroupService ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params; 

    this.retrieveTeachers(); 
    this.group.id = params.id;      

    this.groupService.getGroupById(params.id).subscribe(
      res =>{

        this.group.capacity = res.capacity; 
        this.group.description = res.description; 
        this.group.active = res.active; 
        this.group.dayofweek = res.dayofweek; 
        this.group.showorder = res.showorder; 
        this.group.startTimeHours = res.startTime.substring(0,2); 
        this.group.startTimeMins = res.startTime.substring(3,5); 
        this.group.teacherId = res.teacherid;

        if(res.active){
          this.optionSelected = "Si"; 
        }else{
          this.optionSelected = "No"; 
        }


        if(this.group.dayofweek == 1){
          this.tittle = "Domingo - "+ this.group.showorder 
        }else{
          this.tittle = this.dias[this.group.dayofweek-2] + " - "+ this.group.showorder 
        }


      },
      err => console.log(err)
    )

  }

  onSubmit() {

    if (this.optionSelected == "Si"){
      this.group.active = true;
    }else{
      this.group.active = false;
    }

    this.errorMsg = null;   

    this.groupService.editGroup(this.group).subscribe(
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
        this.teachers.forEach(function (teacher) {
          teacher.teacherString = teacher.username + " - " + teacher.name;        
        });
      },
      error => {
        console.log(error);        
    });
  }
}
