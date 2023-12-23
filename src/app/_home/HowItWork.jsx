import Image from "next/image";
import React from "react";

const HowItWork = () => {
  return (
    <div className="demo-design-container max-width">
      <div className="main-container">
        <p className="demo-header">How it works-</p>
        <div className="inner-container">
          <div className="main-content main-content1">
            <div className="image">
              <Image
                height={200}
                width={200}
                src="/img/home/image1.svg"
                alt="Step 1"
              />
            </div>
            <div className="message">
              <p className="highlight">LOOKING FOR A HOUSE?</p>
              <p className="tet">Just get one of our Assisted Plans</p>
              <p className="tet"> and make your lives simpler.</p>
            </div>
          </div>
          <div className="main-content main-content2">
            <div className="image">
              <Image
                height={200}
                width={200}
                src="/img/home/image2.svg"
                alt="Step 2"
              />
            </div>
            <div className="message">
              <p className="tet">Say HELLO to your</p>
              <p className="highlight">HOUSINGMAGIC ASSISTANT</p>
            </div>
          </div>
          <div className="main-content main-content3">
            <div className="image">
              <Image
                height={200}
                width={200}
                src="/img/home/image3.svg"
                alt="Step 3"
              />
            </div>
            <div className="message">
              <p className="highlight">Contact Owners,</p>
              <p className="highlight">Schedule property visits,</p>
              <p className="highlight"> and Negotiates Rent*</p>
            </div>
          </div>
          <div className="main-content main-content4">
            <div className="image">
              <Image
                height={200}
                width={200}
                src="/img/home/image4.svg"
                alt="Step 4"
              />
            </div>

            <div className="message">
              <p className="tet">Helping you find best</p>
              <p className="highlight">HOUSE FOR YOUR NEEDS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
