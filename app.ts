import { Component, OnInit , inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  loginForm: any
  http = inject(HttpClient);
  users: any[] = [];  

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.http.get<{users : any[] }>('users.json').subscribe({ next: data =>
      
      this.users = data.users 
    
    });
    
  }
  authenticate(): void {
  const { email, password } = this.loginForm.value;  const user = this.users.find(u => u.email === email && u.password === password)
  console.log(user ? 'login successfully' : 'Invalid email or password');
  alert(user ? 'login successfully': 'Invalid email or password');
  }
  onlogin(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }
  this.authenticate();
}
}
