import "@/styles/tools.css";
import Link from "next/link";
import Image from "next/image";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const FeaturedTools = () => {
  return (
    <div className="tool-container">
      <div className="tool-container-inner">
        <div className="tool-section-main-heading">
          <p>Our Tools to help you !</p>
        </div>
        <div className="tools-section">
          <div className="tool-section-inner">
            <div className="emi-tool">
              <Link href="/tools/emi-calculator" className="tool-img">
                <div className="tool-img-wrap">
                  <Image
                    height={200}
                    width={200}
                    src="/img/home/emi_calc.svg"
                    alt="EMI Calc"
                  />
                </div>
                <p className="tool-heading">
                  EMI <br /> CALCULATOR <ArrowRightAltIcon />
                </p>
                <p className="tool-description">
                  The EMI calculator will display the monthly installment amount
                  you need to repay, along with the total interest payable over
                  the loan tenure.
                </p>
              </Link>
            </div>
            <div className="rentalYeild-tool">
              <Link href="/tools/rental-yield-calculator" className="tool-img">
                <div className="tool-img-wrap">
                  <Image
                    height={200}
                    width={200}
                    src="/img/home/rental-calc.svg"
                    alt="Rental Calc"
                  />
                </div>
                <p className="tool-heading">
                  RENTAL <br /> CALCULATOR <ArrowRightAltIcon />{" "}
                </p>
                <p className="tool-description">
                  A rental calculator is a tool that helps you estimate the
                  potential rental income and expenses associated with a
                  property.
                </p>
              </Link>
            </div>
            <div className="mortgage-tool">
              <Link href="/tools/mortgage-calculator" className="tool-img">
                <div className="tool-img-wrap">
                  <Image
                    height={200}
                    width={200}
                    src="/img/home/mortgage-calc.svg"
                    alt="Mortgage Calc"
                  />
                </div>
                <p className="tool-heading">
                  MORTGAGE CALCULATOR <ArrowRightAltIcon />
                </p>
                <p className="tool-description">
                  A mortgage calculator is a handy tool that helps you estimate
                  your monthly mortgage payments.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTools;
