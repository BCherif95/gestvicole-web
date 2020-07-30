import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'prod-bar-chart',
  templateUrl: './prod-bar-chart.component.html',
  styleUrls: ['./prod-bar-chart.component.scss']
})
export class ProdBarChartComponent implements OnInit {

    @Input() value1: number = 0;
    @Input() value2: number = 0;
    @Input() value3: number = 0;

  constructor() { }

  ngOnInit() {
      const prodBarChart = new Chart('prodBarChart', {
          type: 'bar',
          data: {
              labels: ['Production Totale', 'Effectif Total', 'Mortalité Totale'],
              datasets: [{
                  label: 'Nombre',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [this.value1, this.value2, this.value3],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
  }

}
