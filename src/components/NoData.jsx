import Image from "next/image";

function NoData() {
  return (
    <div className="no-data">
      <Image
        src="/img/no-data.png"
        height={300}
        width={300}
        alt="No Data Found"
      />
    </div>
  );
}

export default NoData;
