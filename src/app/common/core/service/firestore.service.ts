import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private userPatients: AngularFirestoreCollection<any>;
  private userDoctors: AngularFirestoreCollection<any>;
  private userAdmins: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private database: DatabaseService
  ) {
    this.userPatients = firestore.collection('user-patients');
    this.userDoctors = firestore.collection('user-doctors');
    this.userAdmins = firestore.collection('user-admins');
  }

  enableNetwork() {
    return this.firestore.firestore.enableNetwork();
  }

  disableNetwork() {
    return this.firestore.firestore.disableNetwork();
  }

  createUser(user: any, option: string) {
    return this.authService.createUserWithEmailAndPassword(user.email, user.password)
      .then((state: any) => {
        this.enableNetwork();

        switch(option) {
          case 'patient': this.createPatient(state.user.uid, user);   break;
          case 'doctor':  this.createDoctor(state.user.uid, user);    break;
          case 'admin':   this.createAdmin(user);                     break;
          default: break;
        }

        return user.fullname;
      });
  }

  getPatientDetails(isList: boolean = false) {
    return this.readCollection(this.userPatients, isList);
  }

  getDoctorDetails(isList: boolean = false) {
    return this.readCollection(this.userDoctors, isList);
  }

  getPatientDoctors(fullname: string) {
    return this.userPatients.snapshotChanges().pipe(
      map((values) => {
        let doc = [];
        values.map((value) => {
          value.payload.doc.ref.collection('doctors').onSnapshot(
            (data) => {
              fullname === value.payload.doc.data().fullname
                ? data.docChanges().forEach((data) => {
                  doc.push(data.doc.data());
                }) : 0;
            }
          )
        });
        return doc;
      })
    );
  }

  getDoctorPatients(fullname?: string) {
    return this.userDoctors.snapshotChanges().pipe(
      map((values) => {
        let doc = [];
        values.map((value) => {
          value.payload.doc.ref.collection('patients').onSnapshot(
            (data) => {
              fullname === value.payload.doc.data().fullname
              ? data.docChanges().forEach((data) => {
                  doc.push(data.doc.data());
                }) : 0;
            }
          )
        });
        return doc;
      })
    );
  }

  addPatientToDoctor(form: any) {
    const doctor = form.doctor;
    const patient = form.patient;

    this.userDoctors.snapshotChanges().pipe(
      map((values) => {
        return values.map((value) => {
          const data = value.payload.doc.data();

          data.doctorNo === doctor.doctorNo
            ? value.payload.doc.ref.collection('patients').add({ ...patient }) : 0;

          return data;
        })
      })
    ).subscribe((response) => { });
  }

  addDoctorToPatient(form: any) {
    const doctor = form.doctor;
    const patient = form.patient;

    this.userPatients.snapshotChanges().pipe(
      map((values) => {
        return values.map((value) => {
          const data = value.payload.doc.data();

          data.patientNo === patient.patientNo
            ? value.payload.doc.ref.collection('doctors').add({ ...doctor }) : 0;

          return data;
        })
      })
    ).subscribe((response) => { });
  }

  // helper functions

  private createPatient(uid: string, user: any) {
    const userDetails = { ...user, uid };
    this.userPatients.add(userDetails)
      .then(() => (this.database.createObject('user-patients', userDetails)));
  }

  private createDoctor(uid: string, user: any) {
    const userDetails = { ...user, uid };
    this.userDoctors.add(userDetails)
      .then(() => (this.database.createObject('user-doctors', userDetails)));
  }

  private createAdmin(user: any) {
    this.userAdmins.add(user)
      .then(() => (this.database.createObject('user-admins', user)));
  }

  private readCollection(collection: AngularFirestoreCollection, isList: boolean) {
    return collection.snapshotChanges().pipe(
      map((values) => {

        const isFalse = values.map((value) => {
          const data = value.payload.doc.data();
          delete data['email'];
          delete data['password'];
          return { ...data };
        });

        const isTrue = values.map((value) => {
          const data = value.payload.doc.data();
          const pushId = value.payload.doc.id;;
          return { ...data, pushId };
        });

        return isList ? isTrue : isFalse;
      })
    );
  }

}
