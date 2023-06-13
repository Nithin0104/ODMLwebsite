import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import websiteDataService from "../services/website.js";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsData: [],
      leavesData: [],
      dataPoints: []
    };
  }

  componentDidMount() {
    this.fetchEventsData();
    this.fetchLeavesData();
  }

  fetchEventsData() {
    websiteDataService.getEvents()
      .then(response => {
        const eventsData = response.data;
        this.setState({ eventsData }, () => {
          this.processChartData();
        });
      })
      .catch(error => {
        console.log('Error fetching events data:', error);
      });
  }

  fetchLeavesData() {
    websiteDataService.getAllLeaves()
      .then(response => {
        const leavesData = response.data;
        this.setState({ leavesData }, () => {
          this.processChartData();
        });
      })
      .catch(error => {
        console.log('Error fetching leaves data:', error);
      });
  }

  processChartData() {
    const { eventsData, leavesData } = this.state;
    if (eventsData.length > 0 && leavesData.length > 0) {
      const eventDataMap = new Map();
      const dataPoints = [];

      // Calculate event counts
      for (const event of eventsData) {
        if (!eventDataMap.has(event.title)) {
          eventDataMap.set(event.title, event.count);
        } else {
          eventDataMap.set(event.title, eventDataMap.get(event.title) + event.count);
        }
      }

      // Calculate leave counts
      for (const leave of leavesData) {
        const title = leave.title;
        if (!eventDataMap.has(title)) {
          eventDataMap.set(title, 1);
        } else {
          eventDataMap.set(title, eventDataMap.get(title) + 1);
        }
      }

      // Create data points
      eventDataMap.forEach((count, title) => {
        dataPoints.push({ label: title, y: count });
      });

      this.setState({ dataPoints });
    }
  }

  render() {
    const options = {
      animationEnabled: true,
      theme: 'dark2',
      title: {
        text: 'Events OD count'
      },
      axisY: {
        title: 'Students Applied',
        scaleBreaks: {
          autoCalculate: true,
          type: 'wavy',
          lineColor: 'white'
        }
      },
      data: [
        {
          type: 'column',
          indexLabel: '{y}',
          indexLabelFontColor: 'white',
          dataPoints: this.state.dataPoints
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default App;
