import React from "react";
import "./Logo.css";
import { PageHeader } from "antd";

const Logo = () => {
  return (
    <div data-testid="logo">
      <PageHeader
        className="logo-container"
        title="Scrum Poker"
        backIcon={false}
      />
    </div>
  );
};

export default Logo;
