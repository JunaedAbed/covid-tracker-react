import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          displayFormats: {
            quarter: "MMM YYYY",
          },
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType, country, ...props }) {
  // console.log("graph country>>", country);

  const [data, setData] = useState({});

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    // console.log("data timeline>>>", data.cases);
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    // console.log("chart data>>>", chartData);
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (country === "worldwide") {
        const url = `https://disease.sh/v3/covid-19/historical/all?lastdays=90`;

        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            let chartData = buildChartData(data, casesType);
            setData(chartData);
            // console.log("Data>>>", data);
          });
      } else {
        try {
          const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=90`;

          await fetch(url)
            .then((res) => res.json())
            .then((data) => {
              let chartData = buildChartData(data.timeline, casesType);
              setData(chartData);
              // console.log("Data>>>", data.timeline);
            });
        } catch (error) {
          setData(0);
        }
      }
    };

    fetchData();
  }, [casesType, country]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: "#BCC3DD",
                borderColor: "#191D5C",
                borderWidth: 1.5,
                fill: false,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
