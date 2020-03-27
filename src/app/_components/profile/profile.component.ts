import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {Router, ActivatedRoute} from '@angular/router'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errorMsg = null;   
  asdf = null; 
  user  = {
    currentPassword: "",
    newPassword : "",
    
  }; 
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,private router: Router) { }

  ngOnInit(): void {    
  }

  onSubmit() {

    this.errorMsg = null;   
    this.userService.changePassword(this.user).subscribe(
      res =>{
        this.router.navigate(['/home']);
      },
      err =>{
        console.log(err);
        this.errorMsg = err.error.message; 
      } 
    )
  }

}
