import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { StatisticsService } from 'src/app/shared/statistics.service';

@Component({
  selector: 'app-type-of-status',
  templateUrl: './type-of-status.component.html',
  styleUrls: ['./type-of-status.component.css']
})
export class TypeOfStatusComponent implements OnInit {

  dataSource: Object;
  chartConfig: Object;
  dataSourceOfPrice: Object;

  customersArray = [];
  totalTicket = { new: 0, pending: 0, completed: 0 };
  totalPrice = { new: 0, pending: 0, completed: 0 };
  statistics = {
    new: { standard: 0, vip: 0, vvip: 0 },
    pending: { standard: 0, vip: 0, vvip: 0 },
    completed: { standard: 0, vip: 0, vvip: 0 }
  };
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
        "caption": "Biểu đồ thể hiện số lượng theo trạng thái vé",
        "xAxisName": "Trạng thái",
        "yAxisName": "Đơn vị (vé)",
        "numberSuffix": " vé",
        "theme": "umber",
      },
      "data": [{
        "label": "New",
        "value": this.totalTicket.new
      }, {
        "label": "Pending",
        "value": this.totalTicket.pending
      }, {
        "label": "Completed",
        "value": this.totalTicket.completed
      }]
    };

    this.dataSourceOfPrice = {
      "chart": {
        "caption": "Biểu đồ thể hiện số tiền theo tình trạng thái vé",
        "xAxisName": "Trạng thái",
        "yAxisName": "Đơn vị (VNĐ)",
        "numberSuffix": " VNĐ",
        "theme": "umber",
      },
      "data": [{
        "label": "New",
        "value": this.totalPrice.new
      }, {
        "label": "Pending",
        "value": this.totalPrice.pending
      }, {
        "label": "Completed",
        "value": this.totalPrice.completed
      }]
    };
  }

  getStatistics() {
    this.customersArray.forEach(element => {
      switch (element.status) {
        case "New": {
          this.statistics.new.standard = this.statistics.new.standard + Number(element.ticketType.standard);
          this.statistics.new.vip = this.statistics.new.vip + Number(element.ticketType.vip);
          this.statistics.new.vvip = this.statistics.new.vvip + Number(element.ticketType.vvip);
          this.totalTicket.new = this.statistics.new.standard + this.statistics.new.vip + this.statistics.new.vvip;
          this.totalPrice.new = this.statistics.new.standard * 200000 + this.statistics.new.vip * 250000 + this.statistics.new.vvip * 300000;
          break;
        }
        case "Pending": {
          this.statistics.pending.standard = this.statistics.pending.standard + Number(element.ticketType.standard);
          this.statistics.pending.vip = this.statistics.pending.vip + Number(element.ticketType.vip);
          this.statistics.pending.vvip = this.statistics.pending.vvip + Number(element.ticketType.vvip);
          this.totalTicket.pending = this.statistics.pending.standard + this.statistics.pending.vip + this.statistics.pending.vvip;
          this.totalPrice.pending = this.statistics.pending.standard * 200000 + this.statistics.pending.vip * 250000 + this.statistics.pending.vvip * 300000;
          break;
        }
        case "Completed": {
          this.statistics.completed.standard = this.statistics.completed.standard + Number(element.ticketType.standard);
          this.statistics.completed.vip = this.statistics.completed.vip + Number(element.ticketType.vip);
          this.statistics.completed.vvip = this.statistics.completed.vvip + Number(element.ticketType.vvip);
          this.totalTicket.completed = this.statistics.completed.standard + this.statistics.completed.vip + this.statistics.completed.vvip;
          this.totalPrice.completed = this.statistics.completed.standard * 200000 + this.statistics.completed.vip * 250000 + this.statistics.completed.vvip * 300000;
          break;
        }
      }
    });
  }
}
