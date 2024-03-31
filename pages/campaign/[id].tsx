import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default () => {
  const router = useRouter();

  return (
    <Layout>
      <p>Post: {router.query.id}</p>;
    </Layout>
  );
};
