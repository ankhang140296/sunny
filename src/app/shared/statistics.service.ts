import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  customersArray = [];
  constructor(private customerService: CustomerService) { }

  getCustomersList() {
    this.customerService.getSnapshotChanges().subscribe(
      list => {
        this.customersArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
      this.loading();
  }
  loading() {
    setTimeout(() => {}, 3000);
  }

}
