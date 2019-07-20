import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  submitted = false;
  customer;
  dateOrder="";
  dateReceive="";

  ngOnInit() {
    this.dateOrder = this.datePipe.transform(new Date(),"dd-MMM-yy"); //output - 14-Feb-19
    // Passing in MD_Bootstrap form validation 
    this.contactForm = this.formBuilder.group({
      contactFormFullName: ['', Validators.required],
      contactFormEmail: ['', [Validators.required, Validators.email]],
      contactFormMobile: ['', [Validators.required, Validators.minLength(10)]],
      contactFormAddress: ['', Validators.required],
      contactFormStandard: [''],
      contactFormVIP: [''],
      contactFormVVIP: ['']
    });
    this.onSubmit();
  }
  // Adding variables
  fullName = '';
  email = '';
  mobile = '';
  address = '';
  standard = 0;
  vip = 0;
  vvip = 0;
  price = 0;
  status = '';

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe,
    private router: Router, private customerService: CustomerService) { }
  get f() { return this.contactForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      alert('Thank you for contacting us, your message has gone through!');
      this.customer = this.customerService.createCustomer(this.fullName, this.email, this.mobile, this.address, { standard: this.standard, vip: this.vip, vvip: this.vvip }, this.price, this.status,this.dateOrder,this.dateReceive);
      this.customerService.addCustomer(this.customer);
      this.clearForm();
    }
  }
  clearForm() {
    this.contactForm.reset();
    this.router.navigateByUrl('/ticket-detail');
  }

  caculatePricesOfTickets() {
    this.status = "New";
    return this.price = this.standard * 200000 + this.vip * 250000 + this.vvip * 300000;
  }
}