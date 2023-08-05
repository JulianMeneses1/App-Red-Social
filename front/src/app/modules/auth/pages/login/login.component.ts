import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor (private formBuilder: FormBuilder ) {

  }

  
  ngOnInit ():void {
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit (): void {
    console.log("hola")
  }
}
