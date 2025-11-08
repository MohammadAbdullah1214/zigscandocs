"use client";

import React from "react";

const BlurCircle: React.FC = () => {
  return (
    <>
      <div
        className="absolute top-0 left-0 pointer-events-none -z-20"  
        style={{
          width: "80vw",
          height: "5.5rem",
          background:
            "radial-gradient(#49CAED 0%, rgba(73, 202, 237, 0) 70%)",
          filter: "blur(80px)",
        }}
      />
    </>
  );
};

export default BlurCircle;
