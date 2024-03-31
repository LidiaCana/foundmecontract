import Head from "next/head";
import Header from "./Header";
import { Container } from "semantic-ui-react";

const Layout = ({ children }) => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {children}
    </Container>
  );
};
export default Layout;
