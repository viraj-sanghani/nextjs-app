import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Data from "./Data";

export const getServerSideProps = async () => {
  const response = await fetch("https://api.housingmagic.com/v1/support/faq");
  const data = await response.json();

  return {
    props: {
      data: data.data,
    },
  };
};

function FAQ({ data }) {
  return (
    <Layout>
      <Data d={data} />
    </Layout>
  );
}

export default FAQ;
