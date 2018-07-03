import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppProviderModule } from "./app-provider.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './common/core/service/auth.service';



import { Router, NavigationStart } from '@angular/router';
import { map } from 'rxjs/operators'



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppProviderModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthService
  ]
})
export class AppModule {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.state.pipe(
      map((user: any) => user !== null)
    ).subscribe((state) => {
      state ? 0 : this.router.navigate(['/']);
    });
  }

}
