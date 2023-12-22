"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/material";
import { call, accountVerify } from "@/services/api";
import { useRouter } from "next/navigation";

function AccountVerify() {
  const pathname = usePathname();
  const router = useRouter();
  const [verify, setVerify] = useState(null);

  const verifyAccount = async () => {
    try {
      const res = await call(accountVerify({ token: router.query?.token }));
      setVerify(true);
    } catch (err) {
      setVerify(false);
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: 500,
        fontSize: 30,
        color: "var(--color-2)",
      }}
    >
      {verify === null ? (
        "Verifying..."
      ) : verify === false ? (
        "Link is expired."
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            gap: 20,
          }}
        >
          <div>Verified successful, login to continue.</div>
          <Link
            href={{
              pathname: "/auth/login",
              state: { redirect: pathname },
            }}
          >
            <Button variant="contained">Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AccountVerify;
