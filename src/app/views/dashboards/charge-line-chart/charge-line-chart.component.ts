import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'charge-line-chart',
  templateUrl: './charge-line-chart.component.html',
  styleUrls: ['./charge-line-chart.component.scss']
})
export class ChargeLineChartComponent implements OnInit {

    @Input() week: string[] = [];
    @Input() datasets1: number[] = [];
    @Input() datasets2: number[] = [];

  constructor() { }

  ngOnInit() {
      const lineChart = new Chart('chargeLineChart', {
          type: 'line',
          data: {
              labels: this.week,
              datasets: [{
                  label: 'Charge',
                  data: this.datasets1,
                  borderColor: '#3333ff',
                  fill: true,
              }, {
                  label: 'Marge Nette',
                  data: this.datasets2,
                  borderColor: 'red',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  fill: true,
              }
              ]
          },
          options: {
              scales: {
                  yAxes: [{
                      stacked: true
                  }]
              }
          }
      });
  }

}
