import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder, FormGroup, FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";

import { ReCaptcha2Component } from 'ngx-captcha';
import { timer, Subscription } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";
import { GeneralserviceService } from './../../../Services/generalservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  firststep: boolean = true
  secondstep: boolean = false;
  isResendcode: boolean = false;
  LoginForm: FormGroup;
  submitted = false;
  randomdigit: Number;
  //timer
  countDown: Subscription;
  counter = 100;
  tick = 1000;


  constructor(
    private configservice: GeneralserviceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //LoginForm : FormGroup
  ) {
    this.declareForm();
    this.captchrefresh();
    //this.LoginForm = LoginForm
  }
  get f() { return this.LoginForm.controls; }
  ngOnInit(): void {

  }
  ngOnDestroy() {
    // this.countDown.remove;
    // this.randomdigit = 0
    // alert("your Otp number is expired")
  }
  declareForm() {
    this.LoginForm = this.formBuilder.group({
      id: [0],
      mobileno: ['', Validators.required],
      recaptcha: ['', Validators.required], //, 
      otpcode: ['']
    });
  }
  //only number will be add
  public keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  mobilenumber: number;
  public submitmobile() {
    this.submitted = true;
    try {
      if (this.LoginForm.invalid) {
        return;
      }

      if (this.answerValidator()) {
        this.firststep = false;
        this.secondstep = true;
        this.mobilenumber = this.LoginForm.controls["mobileno"].value;
        this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
        this.generateotpcode();
      }


    } catch (error) {
    }
  }
  otpsessioncode: string;
  public generateotpcode() {
    this.randomdigit = Math.floor(1000 + Math.random() * 9000);
    if (this.LoginForm.controls["mobileno"].value != "") {
      this.configservice.getotpcodeapi(this.LoginForm.controls["mobileno"].value + "/" + this.randomdigit + "/anyhelp")
        .subscribe(
          data => {
            debugger
            var jsonData = JSON.parse(data.data)
            if (jsonData.Status == "Success") {
              this.otpsessioncode = jsonData.Details
            }
          });
    }
  }
  public submitotpverify() {
    if (this.LoginForm.controls["otpcode"].value == this.randomdigit) {
      this.generateToken();
      alert("successfully submited the Otp")
      return true;
    }
    else {
      alert("Please Enter Valid OTP Code");
      return false;
    }
  }
  apiName: string = "";
  tokenpassdata:any;
  public generateToken() {
    this.tokenpassdata=
      {
        phoneno: this.mobilenumber,
        sessionId: this.otpsessioncode,
        otp: this.randomdigit
      }
    debugger
    this.apiName = "User/CreateToken?phoneno=" + this.mobilenumber + "&sessionId=" + this.otpsessioncode + "&otp=" + this.randomdigit;
    this.configservice.postSaveservice(this.tokenpassdata,this.apiName)
      .subscribe(
        data => {
          debugger
          alert(data)
          var jsonData = JSON.parse(JSON.stringify(data.data));
          if (jsonData != null) {
          }
        });
  }
  handleSuccess(data: any) {
    console.log(data);
  }
  //Resend Code Logic 
  public ResendCode() {
    this.generateotpcode();
  }
  //captch code Logic
  randomNumber = (min = 1, max = 9) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  firstNumber: number;
  secondNumber: number;
  plusOrMinus: string;
  answer: number;

  public captchrefresh() {

    this.firstNumber = this.randomNumber();
    this.secondNumber = this.randomNumber();

    this.plusOrMinus = Math.random() < 0.5 ? '-' : '+';
  }

  public answerValidator() {
    this.answer = parseInt(this.LoginForm.controls['recaptcha'].value);
    //console.log(form.value);
    //const { firstNumber, secondNumber, answer } = form.value;
    if (this.plusOrMinus == "+") {
      if (this.answer === this.firstNumber + this.secondNumber) {
        return true;
      }
      else {
        alert("Please Enter valid Captcha Code");
        return false;
      }
    }
    if (this.plusOrMinus == "-") {
      if (this.answer === this.firstNumber - this.secondNumber) {
        return true;
      }
      else {
        alert("Please Enter valid Captcha Code");
        return false;
      }
    }

    return { math: true };
  }
  //public getRandom(){return Math.ceil(Math.random()* 20);}
}
@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
