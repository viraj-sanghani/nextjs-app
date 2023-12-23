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

const EmiCalculator = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "Q. What is the formula for calculating Home Loan EMI?",
      answer:
        "The formula below can be used to calculate home loan EMI:EMI = [P x R x (1+R)^T]/[(1+R)^ (T-1)].The variables used here stand for:P- Principal Amount of the LoanEMI - Equated Monthly InstallmentsR - Monthly Rate of Interest on the Loan (Annual rate of interest divided by 12)T - Tenure of the Loan (in months) or the no. of installments to be paid",
      open: true,
    },
    {
      question: "Q. What is Home Loan Pre-EMI?",
      answer:
        "When a lender disburses a loan in installments, you do not have to pay EMIs until you get the full amount disbursed. However, till the time you get full loan amount, you have to pay the applicable interest on whatever amount is disbursed to you. That amount is known as pre-EMI.",
      open: false,
    },
    {
      question: "Q. Are there any tax benefits on paying Home loan EMIs?",
      answer:
        "Yes, according to the Income Tax Act, 1961, you can avail the following tax benefits on your Home loan EMIs:Section 80C - Upto Rs 1.5 lakhs can be claimed every year on the principal amount paid towards loan.Section 24 - Upto Rs 2 lakhs can be claimed as deduction on the interest you pay every year.Section 80EE - An extra deduction of upto Rs 50,000 on interest paid can be claimed, subject to certain terms and conditions.",
      open: false,
    },
    {
      question: "Q. What if I fail to pay my Home Loan EMI on time?",
      answer:
        "If you fail to pay your home loan EMI on time, the lender will charge you a late payment fee. In addition, the lender may also charge you some extra interest as penalty. Further, if you continue to default on your payments, the lender may send you a legal notice to recover the dues. Remember, any default on EMI payment will also impact your credit score.",
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
  const [formData, setFormData] = useState({
    amount: 5000000,
    interest: 9,
    years: 20,
  });

  const { amount, interest, years } = formData;

  // state to storage the results of the calculation

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateResults();
  }, [amount, interest, years]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Calculation
  const calculateResults = () => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;

    const monthly =
      (userAmount *
        calculatedInterest *
        (1 + calculatedInterest) ** calculatedPayments) /
      ((1 + calculatedInterest) ** calculatedPayments - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      setMonthlyPayment(monthlyPaymentCalculated);

      setTotalPayment(totalPaymentCalculated);

      setTotalInterest(totalInterestCalculated);
    }
    return;
  };

  const pieChartData = {
    labels: ["Principal Loan Amount", "Total Interest"],
    datasets: [
      {
        label: "Ratio of Total Payable Amount and Interest",
        data: [amount, totalInterest],
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
      <div className="clac-con">
        <div className="clac-wrap">
          <div className="ag-calculator-block">
            <div className="ag-calculator_title">EMI Calculator</div>

            <SliderInput
              initial={500000}
              start={2500000}
              limit={20000000}
              increment={25 * 100000}
              name={"amount"}
              label={"Amount"}
              AdornmentStart={"₹"}
              onInput={handleInputChange}
              value={amount}
              typeIs="price"
            />

            <SliderInput
              initial={0.1}
              start={0}
              limit={20}
              increment={5}
              name={"interest"}
              label={"InterestRate"}
              AdornmentEnd={"%"}
              value={interest}
              onInput={handleInputChange}
              typeIs="percent"
            />
            <SliderInput
              initial={1}
              start={0}
              limit={30}
              increment={5}
              name={"years"}
              label={"Loan Duration"}
              AdornmentEnd={"yrs"}
              value={years}
              onInput={handleInputChange}
              typeIs="year"
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
                  <div className="emi_result">
                    <p className="ag-calculator_results-title">
                      Monthly Payment
                    </p>
                    <span className="ag-calculator_results-currency">
                      ₹ {toCSString(Math.round(monthlyPayment))}
                    </span>
                  </div>
                  <div className="emi_result">
                    <p className="ag-calculator_results-title">
                      Total Interest
                    </p>
                    <span className="ag-calculator_results-currency">
                      ₹ {toCSString(Math.round(totalInterest))}
                    </span>
                  </div>
                  <div className="emi_result">
                    <p className="ag-calculator_results-title">Total Payable</p>
                    <span className="ag-calculator_results-currency">
                      ₹ {toCSString(Math.round(totalPayment))}
                    </span>
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

      <div className="maincontainer-emi">
        <div className="emi-info">
          <h2 className="emi-heading">Home Loan EMI Calculator</h2>
          <p>
            A home loan EMI calculator is a tool that helps you calculate your
            monthly instalments (EMIs) with just one click. Home loan calculator
            is really helpful and can be used easily by any individual who wants
            to know their Home Loan EMIs in advance.
          </p>
          <p>
            To calculate your Home loan EMI, you need to enter the loan amount,
            interest rate, and the tenure of the loan.
          </p>

          <h2 className="emi-heading">How to use Home Loan EMI Calculator</h2>
          <p>
            HousingMagic Home loan calculator is very easy to use. Any
            individual who is looking to get a home loan or has already taken a
            loan can use it to check their EMIs. Take the following steps to
            check EMIs using this calculator:
          </p>
          <p>
            <strong>Step 1:</strong> Enter the amount you want to borrow
          </p>
          <p>
            <strong>Step 2:</strong> Enter the rate of interest
          </p>
          <p>
            <strong>Step 3:</strong> Enter the tenure (in years) for which you
            want to borrow
          </p>

          <p>
            <strong>Step 4:</strong> Click on “Calculate Your EMI”
          </p>
          <p>
            After you take all these steps, you will be able to view your
            monthly instalment on your home loan.
          </p>
          <h2 className="emi-heading">
            How the Home Loan Calculator Helps You
          </h2>
          <p>
            Using the EMI calculator to know your EMIs in advance can be helpful
            in many ways. Check out some of the reasons why you should use it:
          </p>
          <p>
            <strong>How much should you borrow? </strong>The calculator can help
            you decide the home loan amount, based on how much EMI you can
            afford to pay from your income. In other words, you can plan your
            finances better.
          </p>
          <p>
            <strong>How long should the tenure be?</strong> Knowing the EMI you
            can afford to pay every month, you can determine the right tenure
            for your loan.
          </p>
          <p>
            <strong>How much down payment should you make?</strong> Using the
            home loan EMI calculator, you can figure out how much you should pay
            as the down payment, in order to save maximum on your interest while
            keeping your EMIs to minimum.
          </p>

          <h3>Factors Affecting Home Loan EMI</h3>
          <p>
            There are multiple factors that can affect your home loan EMI. Check
            out some of the key factors below:
          </p>
          <p>
            <strong>Loan amount:</strong> The loan amount your borrow affects
            your EMI. Higher the amount you borrow, the higher your EMI.
          </p>
          <p>
            <strong>Interest rate:</strong> In case of floating interest rate
            loans, your EMI will change in line with the fluctuations in
            interest rates. If the rate goes up, your EMI also goes up.
          </p>
          <p>
            <strong>Loan tenure:</strong> The tenure for which you take a home
            loan also affects your instalments. If the tenure is longer, your
            EMI will be lower. Remember, longer tenure also means you pay more
            interest over the period as compared to a shorter tenure loan.
          </p>

          <h2 className="emi-heading">How to Reduce Your Home Loan EMI</h2>
          <p>
            if you are looking to get a new home loan or if you already have
            one, here are some tips to help you reduce your home loan EMI:
          </p>
          <ul>
            <li>
              <strong>
                You may disable cookies in your browser using the following
                instructions:
              </strong>
            </li>
          </ul>
          <ul>
            <li>
              Check with multiple lenders before finalizing your loan. Choose
              the one that offers you the best deal.
            </li>
            <li>
              Don’t borrow more than you can afford. If you can’t afford to
              repay on time, don’t borrow.
            </li>
            <li>
              Make a higher down payment. Lower the amount you borrow, lower the
              EMI.
            </li>
            <li>
              Choose a longer tenure (but this also means you will be paying
              more interest over the period).
            </li>
            <li>Make a prepayment on your loan, if and when possible.</li>
            <li>
              Apply for a balance transfer home loan to get a better deal.
            </li>
          </ul>
        </div>
      </div>
      <div className="faq-title">Home Loan FAQs</div>
      <div className="faq-body">
        <div className="faqs">
          {faqs.map((faq, index) => (
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

export default EmiCalculator;
