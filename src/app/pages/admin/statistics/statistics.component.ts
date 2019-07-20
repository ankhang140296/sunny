import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/shared/statistics.service';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {
  }

  show = true;

  ngOnInit() {
    this.statisticsService.getCustomersList();
    this.loading();    
  }

  loading() {
    setTimeout(() => {
      this.showPage();
    }, 3000);
  }

  showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }
}
