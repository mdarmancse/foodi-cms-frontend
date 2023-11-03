import React from "react";
import { Spinner } from "react-bootstrap";

export function CustomLoader({ variant = "warning" }) {
  return <Spinner variant={"primary"} />;
}
