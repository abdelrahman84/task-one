import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent implements OnInit {
  title = 'taskOne';
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  $data;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      mobile: [''],
      password: ['']
    });

  }

  get mobile() { return this.loginForm.get('mobile'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
  
    this.submitted = true;
    this.authService.login(this.mobile.value, this.password.value).subscribe((data) => {
    },	
    error => this.error = error	
  );
  }
}


