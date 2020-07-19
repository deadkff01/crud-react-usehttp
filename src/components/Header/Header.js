import React from "react";
import styled from "@emotion/styled";
import { Link } from "@reach/router";

const HeaderStyle = styled.div`
  background: black;
  width: 100%;
  color: #fff;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
`;

export default function Header() {
  return (
    <HeaderStyle className="py-5 text-center">
      <Link to="/"> CRUD REACT</Link>{" "}
    </HeaderStyle>
  );
}
