import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar, Doughnut } from 'react-chartjs-2';
import { Base } from '../../core';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export class Chart extends Base {
    constructor(props) {
        super(props)

        this.state = {
            labelsArr: '',
            hiddedVar: false
        }
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.requests.getRequest(`facebookhome/request/test3`)
            .then(e => {
                console.log(e.data)
                this.setState({
                    labelsArr: Object.keys(e.data),
                    valuesArr: Object.values(e.data)
                })

            })
    }
    render() {

        const state = {
            labels: this.state.labelsArr,
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: 'rgba(243, 6, 10)',
                    data: this.state.valuesArr
                }
            ]
        }

        const options = {
            options: {
                scales: {
                    xAxes: [{
                        barThickness: 6,  // number (pixels) or 'flex'
                        maxBarThickness: 8 // number (pixels)
                    }],
                    yAxes: [{
                        barThickness: 6,  // number (pixels) or 'flex'
                        maxBarThickness: 8 // number (pixels)
                    }]
                }
            },
          };

        return <Bar
            data={state}
            options={options}
        />
    }
}