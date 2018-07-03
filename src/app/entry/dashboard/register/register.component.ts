import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() isPatient: boolean;
  @Input() isDoctor: boolean;
  @Input() isAdmin: boolean;

  form: FormGroup;

  constructor(@Inject(FormBuilder) public fb: FormBuilder) {
    this.form = fb.group({
      'patientNo': [ '' ],
      'doctorNo': [ '' ],
      'fullname': [ '' ],
      'email': [ '' ],
      'password': [ '' ],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
