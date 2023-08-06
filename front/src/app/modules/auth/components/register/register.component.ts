import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { onLogin, onToggleSignIn } from 'src/app/state/actions/auth.actions';
import { AppState } from 'src/app/state/app.state';
import { selectIsLoading, selectIsSignIn } from 'src/app/state/selectors/auth.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$: Observable<boolean> = new Observable();
  isSignIn$: Observable<boolean> = new Observable();

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isSignIn$ = this.store.select(selectIsSignIn);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  toggleSignIn(): void {
    this.store.dispatch(onToggleSignIn());
  }

  onSubmit(): void {
    this.store.dispatch(onLogin(this.loginForm.value));
  }
}
