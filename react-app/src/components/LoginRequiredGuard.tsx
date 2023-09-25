import { useCurrentUserDetailsQuery } from "../apis/backend/queries.ts";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginRequiredGuard = (props: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const currentUserDetailsQuery = useCurrentUserDetailsQuery();

  console.log(currentUserDetailsQuery);

  if (currentUserDetailsQuery.isError) {
    navigate("/login");
  }

  return <>{props.children}</>;
};
