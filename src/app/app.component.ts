import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        rollno: ['', [Validators.required]],
        age: ['', [Validators.required]],
        gender: ['', Validators.required]
      },
      {}
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let senddata = [];
    // display form values on success
    // + JSON.stringify(this.registerForm.value, null, 4));
    senddata.push(this.registerForm.value);
    localStorage.setItem('datas', JSON.stringify(senddata));
    alert('SUCCESS!!');
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
