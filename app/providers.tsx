"use client";

import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { store } from "@/store";
import i18n from "@/lib/i18n";
import Toast from "@/app/components/Toast";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      {children}
      <Toast />
    </I18nextProvider>
  </Provider>
);

export default Providers;
