"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import store from "@/redux/store";
import Auth from "@/components/Auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Authentication from "./auth/Authentication";
const Bot = dynamic(() => import("@/Bot/Bot"), { ssr: false });
const Logout = dynamic(() => import("@/components/Logout"));
const GoogleAnalytics = dynamic(() => import("@/components/GoogleAnalytics"), {
  ssr: false,
});
const ExtraDetailForm = dynamic(() => import("./auth/ExtraDetailForm"));
const SpeechRecognition = dynamic(
  () => import("@/components/SpeechRecognition"),
  { ssr: false }
);
const SocialShare = dynamic(() => import("@/components/SocialShare"));
const ScrollTop = dynamic(() => import("@/components/ScrollTop"));
const ViewContact = dynamic(() => import("@/components/ViewContact"));
const CompareSticky = dynamic(() => import("@/components/CompareSticky"));
const NearByLocation = dynamic(() => import("@/components/NearByLocation"), {
  ssr: false,
});

const queryClient = new QueryClient();

const RootProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navbar />
        {children}
        <Footer />

        <Auth />
        <Authentication />
        <Logout />
        <ToastContainer />
        <GoogleAnalytics />
        <ViewContact />
        <NearByLocation />
        <SpeechRecognition />
        <SocialShare />
        <ExtraDetailForm />
        <CompareSticky />
        <ScrollTop />
        <Bot />
      </Provider>
    </QueryClientProvider>
  );
};

export default RootProvider;
