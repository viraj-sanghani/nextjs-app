import { Line, Pie } from "react-chartjs-2";

export default function ChartCal({ pieChartData }) {
  var options = {
    legend: {
      position: "right",
      labels: {
        boxWidth: 10,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: { display: false },
        },
      ],
    },
  };

  return (
    <div className="pie-chart">
      <Pie data={pieChartData} options={options} />
    </div>
  );
}
