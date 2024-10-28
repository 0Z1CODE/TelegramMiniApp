import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ReadyPc from "../pages/ReadyPc";
import QuickOrder from "../pages/Order/QuickOrder";
import OrderConfirmation from "../pages/Order/OrderConfirmation";
import ConfirmPayment from "../pages/Order/ConfirmPayment";
import ReadyPcPage from "../pages/PC/ReadyPcPage";
import WaitingPAge from "../pages/Common/WaitingPAge";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/ready-pc" element={<ReadyPc />} />
        <Route path="/ready-pc/:product_code" element={<ReadyPcPage />} />
        <Route path="/quick-order/:product_code" element={<QuickOrder/>} />
        <Route path="/order-cinfirm/:order_id" element={<OrderConfirmation/>} />
        <Route path="/confirm-payment/:_id" element={<ConfirmPayment/>} />
        <Route path="/waiting/:_id" element={<WaitingPAge />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}