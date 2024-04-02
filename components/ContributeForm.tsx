import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import campaign from "../ethereum/campaign";

interface Inputs {
  value: number;
}
const ContributeForm = ({ addressCampaign }) => {
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
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setLoading(true);
    setRequestStatus({ status: 200, message: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const campaignContract = campaign(addressCampaign);
      const contribution = web3.utils.toWei(data.value.toString(), "ether");
      await campaignContract.methods.contribute(contribution).send({
        from: accounts[0],
        value: contribution,
      });
      setLoading(false);
    } catch (err) {
      setRequestStatus({ status: 400, message: err.message });
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} error={!!requestStatus.message}>
      <Form.Field>
        <label>Amount to Contribute (ether)</label>
        <input {...register("value", { required: true })} type="float" />
        {errors.value && <span>This field is required</span>}
      </Form.Field>
      <Message error header="Oops!" content={requestStatus.message} />
      <Button loading={loading} primary type="submit">
        Contribute!
      </Button>
    </Form>
  );
};
export default ContributeForm;
