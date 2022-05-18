import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Base } from '../../core';

ChartJS.register(ArcElement, Tooltip, Legend);

export class PieChart extends Base {
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
                    labelsArr: ['Doughnut Chart Example'],
                    valuesArr: Object.values(e.data)
                })

            })
    }
    render() {
      
        const state = {
            labels: this.state.labelsArr,
            datasets: [
                {
                    backgroundColor: 'rgba(211, 84, 0)',
                    data: this.state.valuesArr,
                    radius:  "50%", 
                }
            ],
        }

        return <Doughnut 
            data={state}
        />
    }
}