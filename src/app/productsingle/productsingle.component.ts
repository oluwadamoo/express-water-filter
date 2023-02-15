import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css'],
})
export class ProductsingleComponent implements OnInit {
  priceForm!: FormGroup;
  price: number = 1;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.priceForm = this.formBuilder.group({
      price: [1, [Validators.required]],
    });

    console.log(this.price);
  }

  valueChanged(val: any) {
    console.log(val);
    this.price = val.data || 1;

    console.log(this.price);
  }
  checkValue() {}
}
