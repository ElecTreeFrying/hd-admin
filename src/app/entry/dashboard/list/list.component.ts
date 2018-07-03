import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() isPatient: boolean;
  @Input() isDoctor: boolean;
  @Input() isAdmin: boolean;

  patientControl: FormControl;
  doctorControl: FormControl;

  constructor() { }

  ngOnInit() {
    this.patientControl = new FormControl('');
    this.doctorControl = new FormControl('');
  }

}
