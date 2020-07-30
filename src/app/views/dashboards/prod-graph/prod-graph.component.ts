import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-prod-graph',
  templateUrl: './prod-graph.component.html',
  styleUrls: ['./prod-graph.component.scss']
})
export class ProdGraphComponent implements OnInit {

    @Input() days: any = [];
    @Input() data: any = [];

  constructor() { }

  ngOnInit() {
      let options: any = {
          Chart: {
              type: 'bar',
              height: 700
          },
          title: {
              text: 'Evolution de la Production'
          },
          credits: {
              enabled: false
          },
          xAxis: {
              title: {
                  text: 'Jour'
              },
              categories: this.days
          },
          yAxis: {
              title: {
                  text: 'Production d\'alvèole'
              }
          },
          tooltip: {
              formatter: function() {
                  return '<strong>' + this.x + ' : </strong>' + this.y;
              }
          },
          series: [{
              name: 'Semaine' +
                  '',
              data: this.data
          }]
      };
      Highcharts.chart('container', options);
  }

}
