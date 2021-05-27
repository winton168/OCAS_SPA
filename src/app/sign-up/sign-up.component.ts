import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { userInsertDTO } from '../models/userInsertDTO';
import { ActivityService} from '../services/activity.service';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { activityDTO } from '../models/activityDTO';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  successMessage: string = "";
  failedMessage: string = "";

  activityDTOList: activityDTO[] = [];
  userForm: FormGroup;

  constructor(private httpClient : HttpClient, private route : Router,
    private activityService: ActivityService, private userService : UsersService) { 
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      activityId: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.maxLength(1000)])
    });

  }

  ngOnInit(): void {

    this.activityService.getAllActivities().subscribe( response => {
      this.activityDTOList = [ { activityId : 0, activityName :"Please select activity" }, ... response];
    }, error => {
      console.log(error);
    });
    
  }


   save() {

      let firtNameVal = this.userForm.value.firstName;
      let lastNameVal = this.userForm.value.lastName;
      let emailAddressVal = this.userForm.value.emailAddress;
      let activityIdVal = this.userForm.value.activityId;
      let commentsVal = this.userForm.value.comments;

      if ( activityIdVal == "" || activityIdVal == null || activityIdVal == 0)
      {
        this.userForm.controls['activityId'].setErrors( {'incorrect' : true });
        return;
      }

      let userInsertDTO : userInsertDTO = {
          firstName : firtNameVal,
          lastName: lastNameVal,
          emailAddress: emailAddressVal,
          activityId: activityIdVal,
          comments: commentsVal
      }

      this.userService.Insert(userInsertDTO).subscribe( response =>{
        this.successMessage =  response.actionMessage
        this.failedMessage = "";
        this.waitForPageRedirect();
      }, error => {
        console.log(error);
        this.successMessage = "";

      });
    
   }


    waitForPageRedirect(){
      setTimeout(()=>{                         
        this.route.navigate(['/userlistview']);
        }, 3000);
    }



}
