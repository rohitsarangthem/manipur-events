import { Outlet } from "react-router-dom";
import OrganizerSidebar from "./OrganizerSidebar";
import "./OrganizerLayout.css";

function OrganizerLayout() {
  return (
    <div className="organizer-layout">

      <OrganizerSidebar />

      <div className="organizer-main">
        <Outlet />
      </div>

    </div>
  );
}

export default OrganizerLayout;