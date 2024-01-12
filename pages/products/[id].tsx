// pages/products/[id].tsx

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Container } from "reactstrap";
import Header from "@/src/components/Header";
import ProductDetails from "@/src/components/ProdutDetails";
import {
  fetchProduct,
  fetchProducts,
  ProductType,
} from "@/src/services/products";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  if (typeof id === "string") {
    const product = await fetchProduct(id);
    if (product) {
      return { props: { product }, revalidate: 10 };
    }
  }
  return {
    redirect: { destination: `/products/${id}`, permanent: false },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchProducts();
  const paths = products.map((product) => {
    return {
      params: {
        id: product.id.toString(),
      },
    };
  });
  return { paths, fallback: true };
};
const Product: NextPage = (props: {
  children?: ReactNode;
  product?: ProductType;
}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Ops... Deu ruim!</h1>;
  }
  return (
    <>
      <Head>
        <title>{props.product!.name}</title>
        <meta name="description" content={props.product!.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Container className="mt-5">
        <ProductDetails product={props.product!} />
      </Container>
    </>
  );
};

export default Product;
