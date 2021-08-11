import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  receiveddata: any;
  displayArray: any = [];
  data: any;
  showregister: boolean = true;
  editindex: any = -1;
  editflag: boolean = false;
  genderArray = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
    { id: 3, value: 'Others' }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        rollno: ['', [Validators.required]],
        age: ['', [Validators.required]],
        gender: [null, Validators.required]
      },
      {}
    );
    this.receiveddata = localStorage.getItem('datas');
    this.displayArray = JSON.parse(this.receiveddata);
    this.arraysort(this.displayArray);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {//register
    console.log('value', this.registerForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      if (
        this.displayArray != null &&
        this.displayArray.length != 0 &&
        this.displayArray.some(x => x.rollno == this.registerForm.value.rollno)
      ) {
        alert('Entered Roll no already exist');
      } else {
        let receiveddata = localStorage.getItem('datas');
        let data = [];
        data = JSON.parse(receiveddata);
        this.arraysort(data);
        console.log('datas', data);
        if (data != null && data.length != 0) {
          data.push(this.registerForm.value);
          this.arraysort(data);
          localStorage.setItem('datas', JSON.stringify(data));
          alert('Saved Successfully');
        } else {
          let senddata = [];
          senddata.push(this.registerForm.value);
          this.arraysort(senddata);
          localStorage.setItem('datas', JSON.stringify(senddata));
          alert('Saved Successfully');
        }
        this.onReset();
        this.receiveddata = localStorage.getItem('datas');
        this.displayArray = JSON.parse(this.receiveddata);
        this.arraysort(this.displayArray);

        // reset whole form back to initial state
      }
    }
  }

  onReset() {//reset of form
    this.submitted = false;
    this.registerForm.reset();
    this.showregister = true;
    this.editindex = -1;
    this.editflag = false;
  }
  viewData(index, item) {//during edit
    this.editindex = index;
    this.editflag = true;
    this.data = this.displayArray.filter(x => x.rollno == item.rollno);
    this.registerForm.controls.firstname.setValue(this.data[0].firstname);
    this.registerForm.controls.lastname.setValue(this.data[0].lastname);
    this.registerForm.controls.rollno.setValue(this.data[0].rollno);
    this.registerForm.controls.age.setValue(this.data[0].age);
    this.registerForm.controls.gender.setValue(this.data[0].gender);
    this.showregister = false;
  }
  onUpdate() {//update
    if (
      this.displayArray != null &&
      this.displayArray.length != 0 &&
      this.displayArray.some(
        (x, index) =>
          x.rollno == this.registerForm.value.rollno &&
          this.editindex == index &&
          this.editflag
      )
    ) {
      this.displayArray.splice(this.editindex, 1, this.registerForm.value);
      this.arraysort(this.displayArray);
      localStorage.setItem('datas', JSON.stringify(this.displayArray));
      this.onReset();
      this.receiveddata = localStorage.getItem('datas');
      this.displayArray = JSON.parse(this.receiveddata);
    } else {
      alert('Entered Roll no already exist');
    }
    // localStorage.removeItem('datas');
  }
  arraysort(data) {//sorting based on roll no
    if (data != null && data.length != 0) {
      data.sort(function(a, b) {
        return a.rollno - b.rollno;
      });
    }
  }
}
