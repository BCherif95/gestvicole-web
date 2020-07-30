import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'charge-bar-chart',
  templateUrl: './charge-bar-chart.component.html',
  styleUrls: ['./charge-bar-chart.component.scss']
})
export class ChargeBarchartComponent implements OnInit {

    @Input() value1: number = 0;
    @Input() value2: number = 0;
    @Input() value3: number = 0;

  constructor() { }

  ngOnInit() {
      const barchart = new Chart('chargeBarChart', {
          type: 'bar',
          data: {
              labels: ['Montant Production', 'Charge Totale', 'Marge net'],
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
