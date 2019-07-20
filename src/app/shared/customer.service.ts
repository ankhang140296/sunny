import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customersObservable: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }

  createCustomer(fullName, email, mobile, address, ticketType, price, status,dateOrder,dateReceive) {
    return new Customer(fullName, email, mobile, address, ticketType, price, status,dateOrder,dateReceive);
  }

  getCustomers() {
    return this.customersObservable = this.getCustomersList('/customers');
  }

  getCustomersList(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  getSnapshotChanges(){
    return this.db.list('/customers').snapshotChanges();
  }

  addCustomer(customer) {
    var postsRef = this.db.database.ref("/customers");
    postsRef.push({
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      address: customer.address,
      ticketType: customer.ticketType,
      price: customer.price,
      status: customer.status,
      dateOrder: customer.dateOrder,
      dateReceive: customer.dateReceive
    });
  }

  updateStatus(customer, status) {
    var customersRef = this.db.database.ref("/customers");
    var hopperRef = customersRef.child(customer.$key);
    hopperRef.update({
      status: status
    });
  }

  updateDateReceive(customer, dateReceive) {
    var customersRef = this.db.database.ref("/customers");
    var hopperRef = customersRef.child(customer.$key);
    hopperRef.update({
      dateReceive: dateReceive
    });
  }

}
class Customer {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  ticketType: {
    standard: number;
    vip: number;
    vvip: number;
  }
  price: number;
  status: string;
  dateOrder: string;
  dateReceive: string;
  constructor(fullName, email, mobile, address, ticketType, price, status,dateOrder,dateReceive) {
    this.fullName = fullName;
    this.email = email;
    this.mobile = mobile;
    this.address = address;
    this.ticketType = ticketType;
    this.price = price;
    this.status = status;
    this.dateOrder=dateOrder;
    this.dateReceive=dateReceive;
  }
}
