import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { onToggleSignIn } from 'src/app/state/actions/auth.actions';
import { onCreateUser } from 'src/app/state/actions/users.actions';
import { AppState } from 'src/app/state/app.state';
import { selectIsLoading, selectIsSignIn } from 'src/app/state/selectors/auth.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading$: Observable<boolean> = new Observable();
  isSignIn$: Observable<boolean> = new Observable();
  passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isSignIn$ = this.store.select(selectIsSignIn);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    })
  }

  toggleSignIn(): void {
    this.store.dispatch(onToggleSignIn());
  }

  onSubmit(): void {
    this.store.dispatch(onCreateUser({user:this.registerForm.value}));
  }
}
