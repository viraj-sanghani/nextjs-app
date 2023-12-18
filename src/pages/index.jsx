import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <Link href={"/faq"}>Test</Link>
      <h1>Home</h1>
    </Layout>
  );
}
