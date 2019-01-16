import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    console.log(form.value);
    const name = form.value['name'];
    const email = form.value['email'];
    const matos = form.value['matos'];
    const message = form.value['message'];
    console.log(name + " a comme mail " + email + ", veut réserver " + matos + " parce que " + message);
  }

}
