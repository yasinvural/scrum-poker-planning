import React from "react";
import "./Logo.css";
import { PageHeader } from "antd";

const Logo = () => {
  return (
    <PageHeader
      className="logo-container"
      title="Scrum Poker"
      backIcon={false}
    />
  );
};

export default Logo;
