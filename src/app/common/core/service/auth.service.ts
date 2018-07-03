import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state: any;

  constructor(private fire: AngularFireAuth) {
    fire.authState.subscribe((state) => {
      // console.clear();
      console.log(state);
    });

    this.state = fire.authState;
  }

  test() {
    console.log('test');
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.fire.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.fire.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.fire.auth.signOut();
  }

}
