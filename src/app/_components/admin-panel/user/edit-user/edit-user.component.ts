import { Component, OnInit, HostBinding } from '@angular/core';

import { UserService } from '../../../../_services/user.service';
import {Router, ActivatedRoute} from '@angular/router'; 



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  errorMsg = null; 
  
  asdf = null; 
  user  = {

    id:null,
    username: "",
    role : "ROLE_USER",
    name:"",
    password : "",        
    
  }; 

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    
    const params = this.activatedRoute.snapshot.params; 

    this.user.id = params.id;      

    this.userService.getUserById(params.id).subscribe(
      res =>{

        this.user = res; 
               
      },
      err => console.log(err)
    )



  }


  onSubmit() {

    this.errorMsg = null;   
    this.userService.editUser(this.user).subscribe(
      res =>{
        this.router.navigate(['/admin']);
      },
      err =>{
        console.log(err);
        this.errorMsg = err.error.message; 
      } 
    )
  }



}
