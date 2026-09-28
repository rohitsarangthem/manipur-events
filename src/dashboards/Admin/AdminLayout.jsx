import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />


      {/* MAIN CONTENT */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;