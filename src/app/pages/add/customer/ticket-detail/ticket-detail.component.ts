import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  customerArray = [];
  showDeletedMessage: boolean;

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      list => {
        this.customerArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
}
