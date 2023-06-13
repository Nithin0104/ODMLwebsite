import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import websiteDataService from "../services/website.js";
var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveData: [],
      dataPoints: []
    };
  }

  componentDidMount() {
    this.fetchLeaveData();
  }

  fetchLeaveData() {
    websiteDataService.getAllLeaves()
      .then(response => {
        const leaveData = response.data;
        this.setState({ leaveData }, () => {
          this.generateDataPoints();
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateDataPoints() {
    const { leaveData } = this.state;
    const presentMonth = new Date().getMonth();

    // Filter leaves for the present month
    const leavesThisMonth = leaveData.filter(leave => {
      const leaveMonth = new Date(leave.from).getMonth();
      return leaveMonth === presentMonth;
    });

    // Count the number of leaves for each date
    const leaveCountByDate = {};
    leavesThisMonth.forEach(leave => {
      const leaveDate = new Date(leave.from).toDateString();
      leaveCountByDate[leaveDate] = (leaveCountByDate[leaveDate] || 0) + 1;
    });

    // Generate data points in ascending order of dates
    const dataPoints = Object.keys(leaveCountByDate).sort().map(date => ({
      x: new Date(date),
      y: leaveCountByDate[date]
    }));

    this.setState({ dataPoints });
  }

  render() {
    const { dataPoints } = this.state;

    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Leave Count for the Month"
      },
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Leave Count",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function (e) {
            return "€" + CanvasJS.formatNumber(e.value, "##0.00");
          }
        }
      },
      data: [{
        type: "area",
        dataPoints: dataPoints
      }]
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default Chart1;
