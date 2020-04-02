import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from '../../../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @HostBinding ('class') classes = 'row'; 

  errorMsg = null; 

  user  = {

    id:null,
    username: "",
    role : "ROLE_USER",
    name:"",
    password : "temporal",        
    
  }; 

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
 
  }


  onSubmit() {

    this.errorMsg = null;   
    //console.log(this.user); 
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
