import { ImageResponse } from "@vercel/og";
import * as React from "react";

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function handler(req: Request) {
  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          fontFamily: "Inter, sans-serif",
          padding: "40px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1e293b",
            border: "2px solid #334155",
            borderRadius: "24px",
            padding: "80px 100px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#f8fafc",
              marginBottom: 30,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            },
          },
          React.createElement(
            "svg",
            {
              width: "80",
              height: "80",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "#38bdf8",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              style: { marginRight: "24px" },
            },
            React.createElement("path", {
              d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
            }),
            React.createElement("polyline", {
              points: "3.27 6.96 12 12.01 20.73 6.96",
            }),
            React.createElement("line", {
              x1: "12",
              y1: "22.08",
              x2: "12",
              y2: "12",
            }),
          ),
          "Padeye Calculator",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: 40,
              color: "#94a3b8",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
            },
          },
          "Calculate and verify padeye designs seamlessly.",
        ),
      ),
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
