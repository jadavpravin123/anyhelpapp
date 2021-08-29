import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//import {HeaderComponent} from './header/header.component';
//import {FooterComponent} from './footer/footer.component';
import { PhonemaskDirective } from './../../directive/phonemask.directive';
import { MessagereuestComponent } from './../../modules/layout/messagereuest/messagereuest.component';
@NgModule({
  declarations: [
   // HeaderComponent,
    //FooterComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    PhonemaskDirective,
    MessagereuestComponent
  ]
})
export class LayoutModule { }
