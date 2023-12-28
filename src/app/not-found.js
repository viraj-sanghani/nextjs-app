import Error from "@/components/Error";
import generateMeta from "@/utils/metadata";

export const metadata = generateMeta("404");

const Error404 = () => {
  return <Error />;
};

export default Error404;
