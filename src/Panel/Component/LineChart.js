import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Base } from '../../core';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export class LineChart extends Base {
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
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    data: this.state.valuesArr,
                }
            ],
        }

        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Line Chart',
              },
            },
          };

        return <Line options={options} data={state} />
    }
}