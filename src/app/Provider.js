"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "@/redux/store";
import Auth from "@/components/Auth";
import Authentication from "./auth/Authentication";
import Bot from "@/Bot/Bot";
import Logout from "@/components/Logout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ExtraDetailForm from "./auth/ExtraDetailForm";
import SpeechRecognition from "@/components/SpeechRecognition";
import SocialShare from "@/components/SocialShare";
import ScrollTop from "@/components/ScrollTop";
import ViewContact from "@/components/ViewContact";
import CompareSticky from "@/components/CompareSticky";
import NearByLocation from "@/components/NearByLocation";

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
