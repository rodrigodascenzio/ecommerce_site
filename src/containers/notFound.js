import React, { useEffect } from "react";
import { NotFound } from "../components";
import { BiMehBlank } from "react-icons/bi";

export function NotFoundContainer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <NotFound>
      <NotFound.Card>
        <BiMehBlank size="180" color="white" style={{ marginTop: "50px" }} />
      </NotFound.Card>
    </NotFound>
  );
}
