// src/components/Header.tsx

import Link from "next/link"; // Renomeei a importação para evitar conflitos
import React from "react";
import { Nav, Navbar } from "reactstrap";

const Header : React.FC = () => {
  return (
    <Navbar container="md" color="dark" dark>
      <Link href="/" legacyBehavior>
        <a className="navbar-brand">Início</a>
      </Link>
      <Nav className="flex-row" navbar>
        <Link href="/products" legacyBehavior>
          <a className="nav-link me-2">Produtos</a>
        </Link>
        <Link href="/cart" legacyBehavior>
          <a className="nav-link">Carrinho</a>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
