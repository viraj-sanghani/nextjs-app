import { call, getFAQ } from "@/services/api";
import Data from "./Data";

/* export const getServerSideProps = async () => {
  try {
    const res = await call(getFAQ());

    return {
      props: {
        data: res.data,
      },
      // revalidate: 60,
    };
  } catch (err) {
    return {
      props: {
        data: [],
      },
      // revalidate: 60,
    };
  }
}; */

async function fetchFAQData() {
  try {
    const res = await call(getFAQ());
    return res.data;
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return []; // Re-throw the error to handle it elsewhere if needed
  }
}

async function FAQ() {
  const data = await fetchFAQData();

  return (
    <div>
      <div className="page-title">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="max-width page-content">
        <div className="faq-question-container">
          <Data data={data} />
        </div>
        <h3 className="page-con-title faq-section">
          How can housingmagic FAQ help users?
        </h3>
        <p className="faq-detail">
          Welcome to the housingmagic FAQ (Frequently Asked Questions) page,
          where buyers and owners can find answers to their questions related to
          login or registration, property search, property advertisement
          posting, account management and other related topics. Start your
          search by simply entering keywords in the search-bar, located at the
          top of the page or you can browse through questions under the
          categories given below. Alternatively, you can also reach out to us at
          1234-56-7890 (Monday to Saturday, 9 AM to 7 PM) to talk to our
          customer support executive.
        </p>
      </div>
    </div>
  );
}

export default FAQ;
