import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'sale-bar-chart',
  templateUrl: './sale-bar-chart.component.html',
  styleUrls: ['./sale-bar-chart.component.scss']
})
export class SaleBarChartComponent implements OnInit {

    @Input() value1: number = 0;
    @Input() value2: number = 0;
    @Input() value3: number = 0;

  constructor() { }

  ngOnInit() {
      const saleBarChart = new Chart('saleBarChart', {
          type: 'bar',
          data: {
              labels: ['Total Payé', 'Reste à Payer', 'Commande Passée'],
              datasets: [{
                  label: 'Montant',
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
