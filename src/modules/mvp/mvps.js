import React, { useState, useEffect } from "react";
import Integration from "../integration/Integration";
import HelpTab from "./Help/HelpTab";
import MvpsHeader from "./mvpsHeader";
import Setting from "./Setting/Setting";
import ThreadDashboard from "./threadDashboard";
const Mvps = () => {
  const [selectedTab, setselectedHeader] = useState("threadDashboard");

  return (
    <div>
      <MvpsHeader
        setselectedHeader={setselectedHeader}
        selectedTab={selectedTab}
      />
      <div className="mvps_content_right">
        <div class="tab-content">
          <div
            class={
              selectedTab === "threadDashboard"
                ? "tab-pane active"
                : "tab-pane fade"
            }
            id="threadDashboard"
          >
            <ThreadDashboard />
          </div>

          <div
            class={
              selectedTab === "integrations"
                ? "tab-pane active"
                : "tab-pane fade"
            }
            id="integrations"
          >
            <Integration />
          </div>
          <div
            class={
              selectedTab === "settings" ? "tab-pane active" : "tab-pane fade"
            }
            id="settings"
          >
            <Setting />
          </div>
          <div
            class={selectedTab === "help" ? "tab-pane active" : "tab-pane fade"}
            id="help"
          >
            <HelpTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mvps;
