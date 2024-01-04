import { Container, Row, Col } from "reactstrap";
import { NextPage, GetStaticProps } from "next";
import { useEffect, useState } from "react";

interface ApiResponse {
  name: string;
  timestamp: Date;
}

export const getStaticProps: GetStaticProps = async () => {
  const staticData = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((resp) => resp.json());
  return {
    props: {
      staticData,
    },
  };
};
const Static: NextPage = (props: { staticData?: ApiResponse }) => {
  const [clientSidestaticData, setClientSidestaticData] =
    useState<ApiResponse>();
  useEffect(() => {
    fetchstaticData();
  }, []);
  const fetchstaticData = async () => {
    const staticData = await fetch("/api/hello").then((resp) => resp.json());
    setClientSidestaticData(staticData);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Gerado estaticamente durande o build:</h1>
          <h2>{props.staticData?.timestamp.toString()}</h2>
        </Col>
        <Col>
          <h1>Dados gerados através do cliente:</h1>
          <h2>{clientSidestaticData?.timestamp.toString()}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Static;
