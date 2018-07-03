import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import { startWith } from 'rxjs/operators';

import { LoginDialogComponent } from '../common/shared/component/login-dialog/login-dialog.component';

import { AuthService } from '../common/core/service/auth.service';
import { FirestoreService } from '../common/core/service/firestore.service';
import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  dialogRef: MatDialogRef<LoginDialogComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      startWith(this.router.url)
    ).subscribe((route: NavigationStart | string) => {
      route === '/' ? setTimeout(() => { this.openDialog() }) : 0;
      if (route instanceof NavigationStart) {
        const _route = route.url.split('/');
        _route[1] === ''
          ? this.openDialog()
          : this.dialog.closeAll();
      }
    });
  }

  openDialog() {
    this.dialog.closeAll();
    this.dialogRef = this.dialog.open(LoginDialogComponent, {
      closeOnNavigation: true,
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.openDialog();
      this.sharedService.snackbar('Invalid form.');
    });
  }

  onSignout() {
    this.authService.signOut().then(() => {
      this.firestoreService.disableNetwork().then(() => {
        this.router.navigate(['/']);
        this.sharedService.signOutSuccess();
      });
    });
  }

}
