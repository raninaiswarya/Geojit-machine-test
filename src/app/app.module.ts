import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, CommonModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
