import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AOS from 'aos';
import { Observable } from 'rxjs';
import { AppState } from './state/app.state';
import { selectIsAuth } from './state/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAuth$: Observable<boolean> = new Observable();

  constructor( private store: Store<AppState>) {
    this.isAuth$ = this.store.select(selectIsAuth);
  }

  ngOnInit ():void {
    AOS.init()                
  }
}
