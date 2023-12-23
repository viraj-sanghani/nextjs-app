import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";

export default function E404() {
  return (
    <div className="error-wrapper">
      <h1 className="title">Sorry, page not found!</h1>
      <Image
        src="/img/404.svg"
        alt="Page not found"
        className="img-404"
        height={300}
        width={400}
      />
      <Link href={{ pathname: "/" }}>
        <Button variant="contained">Go To Home</Button>
      </Link>
    </div>
  );
}
