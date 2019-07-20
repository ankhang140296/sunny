import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customersArray = [];
  updateSuccessfull: boolean;
  dateReceive="";
  constructor(private customerService: CustomerService, private datePipe: DatePipe) { }
  public searchText: string;

  ngOnInit() {
    this.dateReceive = this.datePipe.transform(new Date(),"dd-MMM-yy"); //output - 14-Feb-19
    this.customerService.getSnapshotChanges().subscribe(
      list => {
        this.customersArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onUpdatedStatus(customer,status) {
    if (confirm('Are you sure to update this record ?')) {
      if(status=="Completed"){
        this.customerService.updateDateReceive(customer,this.dateReceive);
      }else{
        this.customerService.updateDateReceive(customer,"");
      }
      this.customerService.updateStatus(customer,status);
      this.updateSuccessfull = true;
    }
  }
  
}
