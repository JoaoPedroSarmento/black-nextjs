// src/components/CartTable.tsx

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../services/products";

type CartEntry = {
  product: ProductType;
  quantity: number;
};

const CartTableRow: React.FC<{ entry: CartEntry }> = ({ entry }) => {
  const { addProduct, removeProduct } = useCart();

  return (
    <tr>
      <td>
        <Col xs={8} md={10} lg={20}>
          {entry.product.name}
        </Col>
        <Col xs={4} md={2} lg={10}>
          <Image
            src={entry.product.imageUrl}
            alt={entry.product.name}
            height={200}
            width={200}
          />
        </Col>
      </td>

      <td>R$ {entry.product.price}</td>
      <td>{entry.quantity}</td>
      <td>R$ {entry.product.price * entry.quantity}</td>
      <td>
        <Button
          color="primary"
          size="sm"
          onClick={() => addProduct(entry.product)}
        >
          +
        </Button>{" "}
        <Button
          color="danger"
          size="sm"
          onClick={() => removeProduct(entry.product.id)}
        >
          –
        </Button>
      </td>
    </tr>
  );
};
export default function CartTable() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
  const { products } = useCart();

  useEffect(() => {
    const entriesList = products.reduce((list, product) => {
      const entryIndex = list.findIndex(
        (entry) => entry.product.id === product.id
      );

      if (entryIndex === -1) {
        return [
          ...list,
          {
            product,
            quantity: 1,
          },
        ];
      }

      list[entryIndex].quantity++;
      return list;
    }, [] as CartEntry[]);

    entriesList.sort((a, b) => a.product.id - b.product.id);
    setCartEntries(entriesList);
  }, [products]);

  return (
    <Table responsive className="align-middle" style={{ minWidth: "32rem" }}>
      <thead>
        <tr>
          <th>Produto</th>

          <th>Preço</th>
          <th>Qtd.</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {cartEntries.map((entry) => (
          <CartTableRow key={entry.product.id} entry={entry} />
        ))}
      </tbody>
    </Table>
  );
}
