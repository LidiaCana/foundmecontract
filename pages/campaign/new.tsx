import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

type Inputs = {
  minimumContribution: number;
};
export default function New() {
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState({
    status: 200,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setRequestStatus({ status: 200, message: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(data.minimumContribution).send({
        from: accounts[0],
      });
      setLoading(false);
      router.push("/");
    } catch (err) {
      setRequestStatus({ status: 400, message: err.message });
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h1>New Campaign</h1>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        error={requestStatus.status >= 400}
      >
        <Form.Field>
          <label>Minimum Contribution</label>
          <input
            {...register("minimumContribution", { required: true })}
            type="number"
          />
          {errors.minimumContribution && <span>This field is required</span>}
        </Form.Field>
        <Message error header="Oops!" content={requestStatus.message} />
        <Button loading={loading} primary type="submit">
          Create
        </Button>
      </Form>
    </Layout>
  );
}
