import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen.component';



@NgModule({
  declarations: [MainScreenComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MainScreenComponent
  ]
})
export class MainScreenModule { }
