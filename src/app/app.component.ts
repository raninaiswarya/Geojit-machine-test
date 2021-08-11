import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  receiveddata: any = [];

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
    this.receiveddata = localStorage.getItem('datas');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log('value', this.registerForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.receiveddata = localStorage.getItem('datas');
    let data = [];
    data = JSON.parse(this.receiveddata);
    console.log('test', data);
    debugger;
    if (data == null || data.length == 0) {
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
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
