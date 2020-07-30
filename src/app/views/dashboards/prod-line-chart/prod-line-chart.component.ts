import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'prod-line-chart',
  templateUrl: './prod-line-chart.component.html',
  styleUrls: ['./prod-line-chart.component.scss']
})
export class ProdLineChartComponent implements OnInit {

    @Input() week: string[] = [];
    @Input() datasets1: number[] = [];
    @Input() datasets2: number[] = [];

  constructor() { }

  ngOnInit() {
      const prodLineChart = new Chart('prodLineChart', {
          type: 'line',
          data: {
              labels: this.week,
              datasets: [{
                  label: 'Alvéole Total Produit',
                  data: this.datasets1,
                  borderColor: '#3333ff',
                  fill: true,
              }, {
                  label: 'Effectif Total',
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
