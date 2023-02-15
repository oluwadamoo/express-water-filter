import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  nodeMailerForm!: FormGroup;
  loading: string = 'Place Order';
  message: string = '';
  timeLeft: number = 10;
  quantity!: number;
  interval: any;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private emailService: EmailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quantity = params['n'];
    });

    window.scrollTo(0, 0);
    this.nodeMailerForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      town: [null, [Validators.required]],
      state: [null, [Validators.required]],
    });
  }
  sendMail() {
    this.loading = 'Placing Order';
    let email = this.nodeMailerForm!.value.email;
    let first_name = this.nodeMailerForm!.value.first_name;
    let last_name = this.nodeMailerForm!.value.last_name;
    let city = this.nodeMailerForm!.value.town;
    let phone = this.nodeMailerForm!.value.phone;
    let state = this.nodeMailerForm!.value.state;

    if (email && first_name && last_name && city && phone && state) {
      let reqObj = {
        email: email,
        first_name,
        last_name,
        city,
        phone,
        state,
        price: '250,000',
        quantity: this.quantity,
      };
      let ourData;
      this.emailService.sendMessage(reqObj).subscribe((data) => {
        ourData = data;
      });

      // this.loading = false;
    }
    this.loading = 'loaded';
    this.showMessage();
  }

  showMessage() {
    this.loading = 'Place Order';
    this.message = 'Success!!! \n We will get back to you soonest';
    this.nodeMailerForm!.value.email = '';
    this.nodeMailerForm!.value.first_name = '';
    this.nodeMailerForm!.value.last_name = '';
    this.nodeMailerForm!.value.phone = '';
    this.nodeMailerForm!.value.state = '';
    this.nodeMailerForm!.value.town = '';
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft == 0) {
          this.message = '';
          this.location.back();
        }
      } else {
        this.timeLeft = 10;
      }
    }, 1000);
  }
}
