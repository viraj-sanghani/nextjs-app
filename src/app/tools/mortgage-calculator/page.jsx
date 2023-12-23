"use client";

import "@/styles/tools.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import SliderInput from "../SliderInput";
import ToolsFotter from "../ToolsFooter";
import { toCSString } from "@/utils/helper";

ChartJS.register(ArcElement, Tooltip, Legend);
const Input = styled(MuiInput)`
  width: 42px;
`;

const MortgageCalculator = () => {
  const [monthlyPayment, setMonthlyPayment] = useState();
  const [loanAmount, setLoanAmount] = useState(1200000);
  const [formData, setFormData] = useState({
    homeValue: 5000000,
    downPayment: 3800000,
    interestRate: 6,
    loanDuration: 9,
  });

  const { homeValue, downPayment, interestRate, loanDuration } = formData;

  function calculateLoanAmount() {
    setLoanAmount(homeValue - downPayment);
    return loanAmount;
  }

  useEffect(() => {
    calculateLoanAmount();
  }, [homeValue, downPayment]);

  useEffect(() => {
    calculateMonthlyPayment();

    // if(downPayment > homeValue - 1){
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     downPayment: homeValue-1,
    //   }));
    // }
  }, [loanAmount, interestRate, loanDuration]);

  function calculateMonthlyPayment() {
    // Percentage conversion
    function percentageToDecimal(percent) {
      return percent / 12 / 100;
    }

    // years to month conversion
    function yearsToMonths(year) {
      return year * 12;
    }

    setMonthlyPayment(
      (percentageToDecimal(interestRate) * loanAmount) /
        (1 -
          Math.pow(
            1 + percentageToDecimal(interestRate),
            -yearsToMonths(loanDuration)
          ))
    );

    return monthlyPayment;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const totalLoanMonths = loanDuration * 12;
  const interestPerMonth = interestRate / 100 / 12;
  const monthlyPayment1 =
    (loanAmount *
      interestPerMonth *
      (1 + interestPerMonth) ** totalLoanMonths) /
    ((1 + interestPerMonth) ** totalLoanMonths - 1);

  const totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmount;
  const pieChartData = {
    labels: ["Principle", "Interest"],
    datasets: [
      {
        label: "Ratio of Principle and Interest",
        data: [homeValue, totalInterestGenerated],
        backgroundColor: ["rgba(255,0,0, 1)", "#36A2EB"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

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
    <div className="clac-con">
      <div className="clac-wrap">
        <div className="ag-calculator-block">
          <div className="ag-calculator_title">Calculate Mortagage</div>

          <SliderInput
            initial={500000}
            start={2500000}
            limit={20000000}
            increment={25 * 100000}
            name={"homeValue"}
            label={"House Value"}
            AdornmentStart={"₹"}
            onInput={handleInputChange}
            onkeyup={calculateLoanAmount}
            value={homeValue}
            typeIs="price"
          />
          <SliderInput
            initial={100000}
            start={5 * 100000}
            limit={100 * 100000}
            increment={10 * 100000}
            name={"downPayment"}
            label={"Down Payment"}
            AdornmentStart={"₹"}
            value={downPayment}
            onInput={handleInputChange}
            typeIs="price"
          />
          <SliderInput
            initial={0.1}
            start={0}
            limit={20}
            increment={5}
            name={"interestRate"}
            label={"Interest"}
            AdornmentEnd={"%"}
            value={interestRate}
            onInput={handleInputChange}
            typeIs="percent"
          />
          <SliderInput
            initial={1}
            start={0}
            limit={30}
            increment={5}
            name={"loanDuration"}
            label={"Loan Duration"}
            AdornmentEnd={"yrs"}
            value={loanDuration}
            onInput={handleInputChange}
            typeIs="year"
          />

          <div className="ag-calculator_results-box">
            <div className="ag-calculator_results-info">
              <div className="ag-calculator_results-title">
                Your total Loan Amount
              </div>
              <div id="affiliate-result" className="ag-calculator_results-sum">
                <span className="ag-calculator_results-currency">₹</span>
                {toCSString(loanAmount)}
              </div>
            </div>
            <div className="ag-base_btn-wrap">
              <a href="#" className="ag-base_btn">
                Lorem Epsum
              </a>
            </div>
          </div>
        </div>
        <div className="pie-chart">
          <Pie data={pieChartData} options={options} />
        </div>
      </div>

      <div>
        <ToolsFotter />
      </div>
    </div>
  );
};

export default MortgageCalculator;
