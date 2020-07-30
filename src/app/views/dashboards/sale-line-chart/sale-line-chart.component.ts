import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'sale-line-chart',
  templateUrl: './sale-line-chart.component.html',
  styleUrls: ['./sale-line-chart.component.scss']
})
export class SaleLineChartComponent implements OnInit {

    @Input() months: string[] = [];
    @Input() dataset: number[] = [];

  constructor() { }

  ngOnInit() {
      const saleLineChart = new Chart('saleLineChart', {
          type: 'line',
          data: {
              labels: this.months,
              datasets: [{
                  label: 'Montant',
                  data: this.dataset,
                  borderColor: '#3333ff',
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
