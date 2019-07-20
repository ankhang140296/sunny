import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { StatisticsService } from 'src/app/shared/statistics.service';

@Component({
  selector: 'app-type-of-tickets',
  templateUrl: './type-of-tickets.component.html',
  styleUrls: ['./type-of-tickets.component.css']
})
export class TypeOfTicketsComponent implements OnInit {
  dataSource: Object;
  chartConfig: Object;
  dataSourceOfPrice: Object;

  customersArray = [];
  statistics = { standard: 0, vip: 0, vvip: 0 };
  constructor(private statisticsService: StatisticsService) { 
    this.getChart();
  }

  ngOnInit() {
    this.loading();
  }

  loading() {
    setTimeout(() => {
      this.customersArray = this.statisticsService.customersArray;
      this.getStatistics();
      this.getChart();
    }, 3000);
  }

  getChart() {
    this.chartConfig = {
      width: '700',
      height: '400',
      type: 'column2d',
      dataFormat: 'json',
    };
    this.dataSource = {
      "chart": {
        "caption": "Biểu đồ thể hiện số lượng theo loại vé",
        "xAxisName": "Loại vé",
        "yAxisName": "Đơn vị (vé)",
        "numberSuffix": " vé",
        "theme": "umber"
      },
      "data": [{
        "label": "Standard",
        "value": this.statistics.standard
      }, {
        "label": "VIP",
        "value": this.statistics.vip
      }, {
        "label": "VVIP",
        "value": this.statistics.vvip
      }]
    };
    this.dataSourceOfPrice = {
      "chart": {
        "caption": "Biểu đồ thể hiện số tiền theo loại vé",
        "xAxisName": "Loại vé",
        "yAxisName": "Đơn vị (VNĐ)",
        "numberSuffix": " VNĐ",
        "theme": "umber",
      },
      "data": [{
        "label": "Standard",
        "value": this.statistics.standard*200000
      }, {
        "label": "VIP",
        "value": this.statistics.vip*250000
      }, {
        "label": "VVIP",
        "value": this.statistics.vvip*300000
      }]
    };
  }

  getStatistics() {
    this.customersArray.forEach(element => {
      this.statistics.standard = this.statistics.standard + Number(element.ticketType.standard);
      this.statistics.vip = this.statistics.vip + Number(element.ticketType.vip);
      this.statistics.vvip = this.statistics.vvip + Number(element.ticketType.vvip);
    });
  }

  getTotalTicket() {
    return this.statistics.standard + this.statistics.vip + this.statistics.vvip;
  }

  getTotalPrice() {
    return this.statistics.standard * 200000 + this.statistics.vip * 250000 + this.statistics.vvip * 300000;
  }
}
