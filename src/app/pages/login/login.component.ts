import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * LoginComponent handles user authentication and registration.
 * It provides functionality for both login and registration views.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  /** Determines whether to show login view (true) or registration view (false) */
  isLoginView: boolean = true;

  /** Object to store user registration data */
  userRegisterObj: any = {
    username: '',
    password: '',
    emailId: ''
  }

  /** Inject Router for navigation */
  router = inject(Router);

  /**
   * Handles user registration process
   * Stores user data in local storage
   */
  onRegister() {
    const isLocalData = localStorage.getItem('userData');
    if (isLocalData != null) {
      // If user data exists, parse it and add new user
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem('userData', JSON.stringify(localArray));
    } else {
      // If no user data exists, create new array with user
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem('userData', JSON.stringify([this.userRegisterObj]));
    }
    alert('User Registered Successfully');
    console.log(this.userRegisterObj);
  }
  
  /** Object to store user login data */
  userLogin: any = {
    username: '',
    password: ''
  }

  /**
   * Handles user login process
   * Checks credentials against stored user data
   * Navigates to dashboard on successful login
   */
  onLogin() {
    const isLocalData = localStorage.getItem('userData');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);
      const isUserFound = users.find((m : any)=> m.username === this.userLogin.username && m.password === this.userLogin.password);
  
      if(isUserFound != undefined){ 
        this.router.navigateByUrl('/dashboard');
      } else{
        alert('Username or Password is wrong')
      }
    }else {
      alert('User not found');
    }
  }
}