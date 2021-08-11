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

    let receiveddata = localStorage.getItem('datas');
    let data = [];
    debugger;
    data = JSON.parse(receiveddata);
    console.log('test', receiveddata);
    if (data.length != 0) {
      console.log('datas', data);
      localStorage.setItem('datas', JSON.stringify(data));
      // this.registerForm.patchValue(this.clearing);
      this.submitted = false;
      this.registerForm.reset();
      alert('Saved Successfully');
    } else {
      let senddata = [];
      senddata.push(this.registerForm.value);
      localStorage.setItem('datas', JSON.stringify(senddata));
      this.submitted = false;
      this.registerForm.reset();
      // this.intermediateForm.patchValue(this.clearing);
      alert('Saved Successfully');
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
