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

const RentalYeildCalculator = () => {
  const [grossYeild, setGrossYeild] = useState(0);
  const [totalRate, setTotalRate] = useState(0);
  const [formData, setFormData] = useState({
    propertyPrice: 5000000,
    rent: 380000,
    vacancyRate: 6,
    expense: 10000,
  });

  const { propertyPrice, rent, vacancyRate, expense } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [faqs, setFaqs] = useState([
    {
      question: "Q. How to Calculate Rental Yield?",
      answer:
        "There are two forms of rental yield: gross rental yield and net rental yield. Gross rental yield is a simpler metric that doesn’t take the property’s expenses into account, while net rental yield does. Net rental yield is usually a better metric to look at because expenses don’t always scale linearly with income, meaning that as you earn one dollar in income, the expenses associated with that income are not always the same for different properties.",
      open: true,
    },
    {
      question: "Q. What is Gross Rental Yield?",
      answer:
        "Gross rental yield is simply the annual rental income of the property divided by the value of the property. [ Gross Rental Yield = Annual Rent / Property Value ].",
      open: false,
    },
    {
      question: "Q. What is Net Rental Yield?",
      answer:
        "Now on to the slightly more complicated rental yield formula. The premise is the same as gross rental yield, but this time we will subtract out expenses in order to get a truer metric for comparison. The expenses can include taxes, insurance, repairs, vacancy costs, or really anything that it takes to maintain the property. One thing to note is that here, debt expenses, like mortgage repayments and interest, are not usually included as expenses since they are related to the investor’s finances and not related to the property; however, you may include them as expenses if you feel it gives a better way to compare potential investments.",
      open: false,
    },
    {
      question: "Q. Formula for Net Rental Yield?",
      answer:
        "Net Rental Yield = [(Annual Rent * ( 1 - Vacancy Rent )) / Annual Expenses ] / Property Value.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  const [userValues, setUserValues] = useState({
    PropertyPrice: "",
    Rent: "",
    rate: "",
    expenses: "",
  });

  // state to storage the results of the calculation

  // state to storage error message

  useEffect(() => {
    // alert('eo')
    calculateResults();
  }, [propertyPrice, rent, vacancyRate, expense]);

  // Calculation
  const calculateResults = () => {
    const userPropertyPrice = Number(propertyPrice);
    const userRent = Number(rent);
    const calculatedrate = Number(vacancyRate) / 100;
    const calculatedPayments = Number(expense);
    const userAnnualRent = Number(rent) * 12;

    const monthly = (userAnnualRent / userPropertyPrice) * 100;

    if (isFinite(monthly)) {
      const grossYeildCalculated = monthly.toFixed(2);
      const totalrateCalculated = (
        ((userAnnualRent * (1 - calculatedrate) - calculatedPayments) /
          userPropertyPrice) *
        100
      ).toFixed(2);

      // Set up results to the state to be displayed to the user

      setGrossYeild(grossYeildCalculated);
      setTotalRate(totalrateCalculated);
    }
    return;
  };

  const pieChartData = {
    labels: ["Gross Yiels", "Net Yield"],
    datasets: [
      {
        label: "Ratio of Principle and Interest",
        data: [totalRate, grossYeild],
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
    <>
      <section className="bg-section-emi">
        <div className="clac-con">
          <div className="clac-wrap">
            <div className="ag-calculator-block">
              <div className="ag-calculator_title">Rental Yeild Calculator</div>

              <SliderInput
                initial={500000}
                start={2500000}
                limit={20000000}
                increment={25 * 100000}
                name={"propertyPrice"}
                label={"Property Price"}
                AdornmentStart={"₹"}
                onInput={handleInputChange}
                value={propertyPrice}
                typeIs="price"
              />
              <SliderInput
                initial={100000}
                start={5 * 100000}
                limit={100 * 100000}
                increment={10 * 100000}
                name={"rent"}
                label={"Rent"}
                AdornmentStart={"₹"}
                value={rent}
                onInput={handleInputChange}
                typeIs="price"
              />
              <SliderInput
                initial={0.1}
                start={0}
                limit={20}
                increment={5}
                name={"vacancyRate"}
                label={"Vacancy Rate"}
                AdornmentEnd={"%"}
                value={vacancyRate}
                onInput={handleInputChange}
                typeIs="percent"
              />
              <SliderInput
                initial={5000}
                start={10 * 1000}
                limit={10 * 10000}
                increment={10000}
                name={"expense"}
                label={"Expense"}
                AdornmentEnd={"₹"}
                value={expense}
                onInput={handleInputChange}
                typeIs="price"
              />

              <div
                className="ag-calculator_results-box"
                style={{ flexDirection: "column" }}
              >
                <div className="ag-calculator_results-info">
                  <div
                    id="affiliate-result"
                    className="ag-calculator_results-sum"
                    style={{ marginTop: "5px" }}
                  >
                    <div>
                      <p className="ag-calculator_results-title">Net Yield</p>
                      {toCSString(totalRate)}
                      <span className="ag-calculator_results-currency">%</span>
                    </div>
                    <div>
                      <p className="ag-calculator_results-title">Gross Yield</p>
                      {toCSString(grossYeild)}
                      <span className="ag-calculator_results-currency">%</span>
                    </div>
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
      </section>

      <div className="faq-title">Rental Yeild FAQs</div>
      <div className="faq-body">
        <div className="faqs">
          {faqs.map((faq, index) => (
            // <EmiFaq faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
            <div
              className={"faq " + (faq.open ? "open" : "")}
              key={index}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RentalYeildCalculator;
