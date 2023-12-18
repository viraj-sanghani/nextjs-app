import "@/styles/app.css";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import Bot from "@/Bot/Bot";
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
        <Bot />
      </Provider>
    </QueryClientProvider>
  );
}
