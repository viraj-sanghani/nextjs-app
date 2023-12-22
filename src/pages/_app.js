import "@/styles/app.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import store from "@/redux/store";
import Bot from "@/Bot/Bot";
import Authentication from "@/app/auth/Authentication";
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
        <Authentication />
        <ToastContainer />
        <Bot />
      </Provider>
    </QueryClientProvider>
  );
}
