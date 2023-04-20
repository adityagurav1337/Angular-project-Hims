import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata: any;

  apidata: any

  constructor(private main: MainService, private route: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("usertype") != null) {
      this.route.navigate(['/master/states'])
    }
    // else {
    //   this.route.navigate(['/']);
    // }


    this.logindata = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    })

  }

  login(data: any) {
    let x = this.main.post("authentication/login", data);
    x.subscribe((result:any) => {
      this.apidata = result;
      console.log(this.apidata);

      if (this.apidata.data.username != null && this.apidata.data.usertypename != null) {
        localStorage.setItem("username", this.apidata.data.username);
        localStorage.setItem("usertypename", this.apidata.data.usertypename);
        this.route.navigate(['/master/states'])
      }
      else {
        alert("Invalid Credentials");
      }

    })

  }


}
