import { Component, OnInit, NgZone } from '@angular/core';
import { StatisticsService } from 'src/app/shared/statistics.service';
import * as FusionCharts from "fusioncharts";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  show = true;
  dataSource: any;
  data = new Array();
  customersArray = [];
  schema = [{
    "name": "Time",
    "type": "date",
    "format": "%-m/%-d/%Y"
  }, {
    "name": "Sales",
    "type": "number"
  }];
  constructor(private statisticsService: StatisticsService) {
    this.dataSource = {
      chart: {},
      caption: {
        text: "Sales Analysis"
      },
      subcaption: {
        text: "Standard, VIP & VVIP"
      },
      series: "Type",
      yaxis: [
        {
          plot: "Sales Value",
          title: "Sale Value",
          aggregation: "sum", //có thể thay đổi tùy theo yêu cầu https://www.fusioncharts.com/dev/fusiontime/getting-started/change-default-aggregation
          format: {
            prefix: ""
          }
        }
      ]
    };
  }

  fetchData() {
    var jsonify = res => res.json();
    var schemaFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json"
    ).then(jsonify);
    Promise.all([schemaFetch]).then(res => {
      const [schema] = res;
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(this.data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }

  ngOnInit() {
    this.statisticsService.getCustomersList();
    this.loading();
  }

  loading() {
    setTimeout(() => {
      this.customersArray = this.statisticsService.customersArray;
      this.getAnalysis();
      this.fetchData();
      this.showPage();
    }, 3000);
  }

  showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }
  getAnalysis() {
    this.customersArray.forEach(element => {
      this.data.push([element.dateOrder, "Standard", Number(element.ticketType.standard)]);
      this.data.push([element.dateOrder, "VIP", Number(element.ticketType.vip)]);
      this.data.push([element.dateOrder, "VVIP", Number(element.ticketType.vvip)]);
    });
  }

}
