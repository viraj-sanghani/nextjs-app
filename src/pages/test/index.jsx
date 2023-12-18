import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page({ data }) {
  return (
    <Layout>
      <Link href={"/faq"}>FAQ</Link>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {data?.sale &&
          data.sale.map((ele, i) => (
            <div
              key={ele.id}
              style={{ width: 200, border: "1px solid lightgray" }}
            >
              <Link href={`/property/${ele.id}`}>
                <Image
                  src={
                    "https://trackerweblord.s3.ap-south-1.amazonaws.com/housingmagic/property/small/" +
                    ele.img
                  }
                  alt=""
                  width="200"
                  height="200"
                  // fit="cover"
                  // placeholder="blur"
                />
                <h4>{ele.project_name}</h4>
              </Link>
            </div>
          ))}
        {data?.rent &&
          data.rent.map((ele, i) => (
            <div
              key={ele.id}
              style={{ width: 200, border: "1px solid lightgray" }}
            >
              <Link href={`/property/${ele.id}`}>
                <Image
                  src={
                    "https://trackerweblord.s3.ap-south-1.amazonaws.com/housingmagic/property/small/" +
                    ele.img
                  }
                  alt=""
                  width="200"
                  height="200"
                  // fit="cover"
                  // placeholder="blur"
                />
                <h4>{ele.project_name}</h4>
              </Link>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  // Fetch products from your API
  const response = await fetch("https://api.housingmagic.com/v1/property/home");
  const data = await response.json();

  return {
    props: {
      data: data.data,
    },
    revalidate: 60,
  };
};

export default page;
