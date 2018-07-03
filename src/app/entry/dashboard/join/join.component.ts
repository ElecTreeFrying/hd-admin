import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  @Input() isPatient: boolean;
  @Input() isDoctor: boolean;

  form: FormGroup;

  constructor(@Inject(FormBuilder) public fb: FormBuilder) {
    this.form = fb.group({
      'patient': [ '' ],
      'doctor': [ '' ],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
