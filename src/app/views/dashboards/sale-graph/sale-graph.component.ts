import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-sale-graph',
    templateUrl: './sale-graph.component.html',
    styleUrls: ['./sale-graph.component.scss']
})
export class SaleGraphComponent implements OnInit {

    @Input() months: any = [];
    @Input() amounts: any = [];

    constructor() { }
    ngOnInit() {
        let options: any = {
            Chart: {
                type: 'bar',
                height: 700
            },
            title: {
                text: 'Evolution de la facturation'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title: {
                    text: 'Mois'
                },
                categories: this.months
            },
            yAxis: {
                title: {
                    text: 'Montant (F CFA)'
                }
            },
            tooltip: {
                formatter: function() {
                    return '<strong>' + this.x + ' : </strong>' + this.y;
                }
            },
            series: [{
                name: 'Facture',
                data: this.amounts
            }]
        };
        Highcharts.chart('sale', options);
    }


}
