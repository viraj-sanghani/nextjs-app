import Image from "next/image";
import Link from "next/link";
import React from "react";

function page({ data }) {
  const handle = (id) => {
    router.push({
      pathname: `/property/${id}`,
      query: { data: "test" },
    });
  };

  return (
    <>
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
                  alt="property"
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
              <Link passHref onClick={() => handle(ele.id)}>
                <Image
                  src={
                    "https://trackerweblord.s3.ap-south-1.amazonaws.com/housingmagic/property/small/" +
                    ele.img
                  }
                  alt="property"
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
    </>
  );
}

export const getStaticProps = async () => {
  // Fetch products from your API
  const response = await fetch("http://localhost:5000/v1/property/home", {
    next: {
      revalidate: 60,
    },
  });
  const data = await response.json();

  return {
    props: {
      data: data.data,
    },
    revalidate: 60,
  };
};

export default page;
