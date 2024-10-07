import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  RegisterErrorMessage: string = '';   // Holds the error message from the backend
  RegisterSuccessMessage: string = '';
  LoginErrorMessage: string = '';
  LoginSuccessMessage: string = '';
  // constructor(private router: Router, private https: HttpClient) {


  //  }
  isSigndivVisible: boolean = true; 

  UserRegisterObj: any = {
    Username: '',
    Email: '',
    Password: '',
    Phoneno:'',

  }

  UserLoginObj: any = {
    Email: '',
    Password: '',
  }




   router= inject(Router);
    https= inject(HttpClient);


 async  onRegister() {
   debugger;
    this.RegisterErrorMessage = '';
    this.RegisterSuccessMessage = '';
    
    if (this.isEmptyFields(this.UserRegisterObj)) {
      this.RegisterErrorMessage = 'Please fill all the fields.';
      return;
    }

    else {
      // API call to register the user
      let registerData = {
        Username: this.UserRegisterObj.Username,
        Email: this.UserRegisterObj.Email,  // Assuming you're using email as username
        Password: this.UserRegisterObj.Password,
        Phoneno: this.UserRegisterObj.Phoneno,
        
    };
      this.https.post('https://localhost:7215/api/Users/Register', registerData)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.RegisterSuccessMessage = "User Registered Successfully";
           wait(2000); 
        },
        error: (error) => {
         console.error(error);
          this.RegisterErrorMessage = error.error.message || "Registration failed"; // Display backend error
          wait(2000);
        }
      });
      
    }

    //   else{
  //   const isLocalStorageDataAvailable = localStorage.getItem('AngularLocalStorageData');
  //   if(isLocalStorageDataAvailable!= null) {
  //     const LocalArray = JSON.parse(isLocalStorageDataAvailable);
  //     LocalArray.push(this.UserRegisterObj);
  //     localStorage.setItem('AngularLocalStorageData', JSON.stringify(LocalArray));
  //   }
    
  //   else{
  //     const LocalArray= []; 
  //     LocalArray.push(this.UserRegisterObj);
  //     localStorage.setItem('AngularLocalStorageData', JSON.stringify(LocalArray));
  //   }
  //   alert('User Registered Successfully');
  // }
}     

      private  isEmptyFields(obj: any): boolean {
      return Object.values(obj).some(value => value == " ");
      
  }
async OnLogin()
{ 
   
  debugger;
     this.LoginErrorMessage = '';   // Reset the error message
    this.  LoginSuccessMessage = '';
   
    if (this.isEmptyFields(this.UserRegisterObj)) {
      this.LoginErrorMessage = 'Please fill all the fields.';
      await wait(2000); // Wait for 2 seconds
    }

  const loginData = {
    Email: this.UserLoginObj.Email,  // The username is the email in your case
    Password: this.UserLoginObj.Password
  };
    
  this.https.post('https://localhost:7215/api/Users/login', loginData)
  .subscribe({
    next: async (response: any) => {
      
      if (response.Token != null) {
        // Store the JWT token in local storage or session storage
        localStorage.setItem('Token', response.Token);

        this.LoginSuccessMessage = "Login Successful"; // Set success message
      await wait(1000); // Wait for 2 seconds
        this.router.navigateByUrl('dashboard');  // Redirect to dashboard after successful login
      } 
      
      else {
        this.LoginErrorMessage = "Invalid credentials"; // Set error messag
        
      }
    },
   
    error: (error) => {
      console.error(error);
       this.RegisterErrorMessage = error.error.message || "Login failed. Please try again later."; // Display backend error
     }
  
  });

} 

//   let params = new HttpParams()
//   .set('username', this.UserLoginObj.Email)
//   .set('password',  this.UserLoginObj.Password);
 
//   this.https.post('https://localhost:7215/api/Users',{},{params}).subscribe({
//     next:(response:any)=>{
//       console.log(response);
//       alert("Login Successfull");
//       this.router.navigateByUrl('dashboard');
//     }
//   }
// );

//  const isLocalStorageDataAvailable = localStorage.getItem('AngularLocalStorageData');
//  if(isLocalStorageDataAvailable!= null) {
//   const UserDetail = JSON.parse(isLocalStorageDataAvailable);
//   const isUserExist = UserDetail.find((x:any)=>x.Email == this.UserLoginObj.Email && x.Password == this.UserLoginObj.Password);
//   if(isUserExist !== undefined){
//     alert("Login Successfull");
//     this.router.navigateByUrl('dashboard');
//   }
//   else{
//     alert("Invalid Email or Password");
//   }
//  }



}
     // Function to wait for a specified number of milliseconds
    function wait(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));

    }
