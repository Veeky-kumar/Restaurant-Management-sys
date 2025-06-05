import React from "react";
import TotalSalesCards from "../../components/RestaurantPanel/dashboard/TotalSalesCards";
import IncomeLineChart from "../../components/RestaurantPanel/dashboard/IncomeLineChart";
import TransactionPieChartComponent from "../../components/RestaurantPanel/dashboard/TransactionPieChartComponent";
import ProductQuantityBarChart from "../../components/RestaurantPanel/dashboard/ProductQuantityBarChart";
import ProductAmountBarChart from "../../components/RestaurantPanel/dashboard/ProductAmountBarChart";
import DepartmentPieChart from "../../components/RestaurantPanel/dashboard/DepartmentPieChart";
import OrderStatsCard from "../../components/RestaurantPanel/dashboard/OrderStatsCard";
import HourlySaleCard from "../../components/RestaurantPanel/dashboard/HourlySaleCard";
import SaleByDeviceTypeChart from "../../components/RestaurantPanel/dashboard/SaleByDeviceTypeChart";

const Dashboard: React.FC = () => {
  return (
    <div id="contentWrapper_RestaurantLayout" className="content-wrapper ">
      <div className="wrap_dashboard">
        <p className="p-1">Welcome Back!</p>
      </div>

      <div
        className="col-md-12 col-lg-12 col-sm-12"
        id="ddlFranchicse_RedirectOption_HeadOfficeDashboard"
      ></div>
      <div className="col-md-12 col-lg-12 col-sm-12">
        <div className="row">
          <TotalSalesCards />

          <IncomeLineChart />

          <TransactionPieChartComponent />

          <ProductQuantityBarChart />

          <ProductAmountBarChart />

          <DepartmentPieChart />

          <OrderStatsCard />

          <HourlySaleCard />

          <SaleByDeviceTypeChart />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
