import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={300}
    height={470}
    viewBox="0 0 300 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="1" y="305" rx="4" ry="4" width="280" height="90" />
    <circle cx="135" cy="119" r="116" />
    <rect x="162" y="406" rx="11" ry="11" width="115" height="36" />
    <rect x="1" y="263" rx="4" ry="4" width="280" height="27" />
    <rect x="1" y="414" rx="4" ry="4" width="137" height="27" />
  </ContentLoader>
);

export default Skeleton;
