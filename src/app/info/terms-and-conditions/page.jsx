import Image from "next/image";

const Terms = () => {
  return (
    <div>
      <div className="page-title">
        <Image
          height={100}
          width={100}
          src="/img/terms-condition.png"
          alt="Terms & Conditions"
        />
        <h1>Terms & Conditions</h1>
      </div>
      <div className="max-width page-content">
        <h1 style={{ fontSize: "20px" }}>
          <u>Introduction</u>
        </h1>
        <p>
          This Privacy policy is subject to the terms of the Site Policy (User
          agreement) of <b>housingmagic</b>. This policy is effective from the
          date and time a user registers with <b>housingmagic</b> by filling up
          the Registration form and accepting the terms and conditions laid out
          in the Site Policy.
        </p>
        <p>
          In order to provide a personalised browsing experience,{" "}
          <b>housingmagic</b>
          may collect personal information from you. Additionally some of our
          websites may require you to complete a registration form or seek some
          information from you. When you let us have your preferences, we will
          be able to deliver or allow you to access the most relevant
          information that meets your end.
        </p>
        <p>
          To extend this personalized experience <b>housingmagic</b> may track
          the IP address of a user's computer and save certain information on
          your system in the form of cookies. A user has the option of accepting
          or declining the cookies of this website by changing the settings of
          your browser
        </p>
        <p>
          Every effort will be made to keep the information provided by users in
          a safe manner, the information will be displayed on the website will
          be done so only after obtaining consent from the users. Any user
          browsing the site generally is not required to disclose his identity
          or provide any information about him/her, it is only at the time of
          registration you will be required to furnish the details in the
          registration form.
        </p>
        <h1 style={{ fontSize: "20px" }}>
          <u>Defination</u>
        </h1>
        <p>
          A full user always has the option of not providing the information
          which is not mandatory. You are solely responsible for maintaining
          confidentiality of the User password and user identification and all
          activities and transmission performed by the User through his user
          identification and shall be solely responsible for carrying out any
          online or off-line transaction involving credit cards / debit cards or
          such other forms of instruments or documents for making such
          transactions and IEIL assumes no responsibility or liability for their
          improper use of information relating to such usage of credit cards /
          debit cards used by the subscriber online / off-line.
        </p>
        <b>
          {" "}
          * IEIL provides you the ability to keep your personal information
          accurate and up-to-date. If at any time you would like to -{" "}
        </b>{" "}
        <p>
          <b>a) </b>rectify, update, correct or delete your personal
          information;
        </p>{" "}
        <p>
          <b>b) </b>obtain confirmation on whether or not your personal
          information is processed by it;
        </p>{" "}
        <p>
          <b>c)</b> access your personal information or exercise your right to
          data portability; or{" "}
        </p>
        <p>
          <b>d)</b> exercise your right to restrict the continuing disclosure of
          your personal information to any third party by IEIL in certain
          circumstances, you are requested to contact us at
          <b>feedback@housingmagic.com</b>.
        </p>
        <b>
          {" "}
          * We will require you to provide a valid proof of your identity, in
          order to ensure that your rights are respected.
        </b>
        <p>
          You agree that IEIL may use personal information about you to improve
          its marketing and promotional efforts, to analyze site usage, improve
          the Site's content and product offerings, and customise the Site's
          content, layout, and services. These uses improve the Site and better
          tailor it to meet your needs, so as to provide you with a smooth,
          efficient, safe and customised experience while using the Site.
        </p>
        <p>
          You agree that IEIL may use your personal information to contact you
          and deliver information to you that, in some cases, are targeted to
          your interests, such as targeted banner advertisements, administrative
          notices, product offerings, and communications relevant to your use of
          the Site. By accepting the User Agreement and Privacy Policy, you
          expressly agree to receive this information. If you do not wish to
          receive these communications, we encourage you to opt out of the
          receipt of certain communications in your profile. You may make
          changes to your profile at any time, if you wish to delete your
          account on <b>housingmagic.com</b>, you may do so by writing an email
          to
          <b> feedback@housingmagic.com</b> or by using the settings available
          in your account. It is the belief of IEIL that privacy of a person can
          be best guaranteed by working in conjunction with the Law enforcement
          authorities.
        </p>
        <p>
          All IEIL websites including <b>housingmagic</b> fully comply with all
          Indian Laws applicable. IEIL has always cooperated with all law
          enforcement inquires. IEIL may disclose all or part of your personal
          details in response to a request from the law enforcement authorities
          or in a case of bonafide requirement to prevent an imminent breach of
          the law.
        </p>
      </div>
    </div>
  );
};

export default Terms;
