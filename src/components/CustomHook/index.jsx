import { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { getDevice } from "@/utils/helper";
import { useRouter } from "next/router";

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback && callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
}

export function useForm({
  initial,
  schema,
  OnChange,
  OnBlur,
  callback = null,
}) {
  const formik = useFormik({
    initialValues: initial,
    validateOnChange: OnChange || false,
    validateOnBlur: OnBlur || false,
    validationSchema: schema,
    onSubmit: callback,
  });
  return formik;
}

export const useFindVisibility = (invalidPath) => {
  const { pathname } = useRouter();

  const shouldShow = !invalidPath.some((substring) =>
    pathname.includes(substring)
  );

  return shouldShow;
};

export const useModalBackPress = ({ open, hide, url }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handlePopstate = () => {
    if (isOpen) {
      setShow(false);
      hide();
    }
  };

  useEffect(() => {
    const device = getDevice();
    if (["MOBILE", "TABLET"].includes(device)) {
      if (isOpen) {
        router.push({
          pathname: router.pathname,
          search: router.asPath.split("?")[1] || "",
        });
        setShow(true);
      } else if (show) {
        setShow(false);
        router.back();
      }

      window.onpopstate = handlePopstate;
    }

    return () => {
      window.onpopstate = null;
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setShow(false);
  }, [router.pathname]);

  return;
};
