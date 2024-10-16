import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ReadyPc from "../pages/ReadyPc";
import QuickOrder from "../pages/Order/QuickOrder";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/ready-pc" element={<ReadyPc />} />
        <Route path="/quick-order/:product_code" element={<QuickOrder/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}