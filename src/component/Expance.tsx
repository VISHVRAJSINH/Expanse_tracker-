import {
  Card,
  CardBody,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  HStack,
} from "@chakra-ui/react";

import { useState } from "react";
import ExpanceTable from "./ExpanceTable";
import supabase from "../service/supabaseClient";
import { useForm } from "react-hook-form";

interface Props {
  amount: number;
  description: string;
  expance: string;
}

const Expance: React.FC<Props> = () => {
  const [amount, setAmount] = useState("");
  const [description, setDiscription] = useState("");
  const [people, setPeople] = useState("");
  const [formError, setFormerror] = useState("");

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*console.log(
      { amount: amount },
      { people: people },
      { description: description }
    );*/

    let { data, error } = await supabase
      .from("Expanse")
      .insert([{ people, amount, description }]);
    console.log(data, error);

    //e.currentTarget.reset();
    reset();
  };
  const { register, reset } = useForm();

  return (
    <>
      {formError && <Text>{formError}</Text>}
      <Card marginBottom={4}>
        <CardBody>
          <Text width="auto" fontSize="2xl" fontWeight="700" paddingBottom={4}>
            Add Expanses
          </Text>
          <hr />
          <form onSubmit={handleForm}>
            <FormControl isRequired paddingTop={2}>
              <FormLabel htmlFor="amount" paddingTop={2}>
                Amount
              </FormLabel>
              <Input
                placeholder="Enter amount here"
                type="number"
                id="amount"
                //ref={ref}
                //value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
              {/* Discription */}
              <FormLabel htmlFor="discription" paddingTop={4}>
                Discription
              </FormLabel>
              <Textarea
                placeholder="Write discription"
                id="discription"
                //value={description}
                onChange={(e) => setDiscription(e.currentTarget.value)}
              />
              {/* Person */}
              <Select
                marginTop={4}
                placeholder="Paid by"
                onChange={(e) => setPeople(e.currentTarget.value)}
              >
                <option value="jane">Jane</option>
                <option value="will">Will</option>
                <option value="norv">Norv</option>
              </Select>
              <HStack>
                {/* <Button size="md" marginTop={4} width="100%" type="reset">
                  Reset Data
                </Button> */}
                <Button
                  colorScheme="teal"
                  size="md"
                  marginTop={4}
                  type="submit"
                  width="100%"
                >
                  Submit
                </Button>
              </HStack>
            </FormControl>
          </form>
        </CardBody>
      </Card>
      <ExpanceTable />
    </>
  );
};

export default Expance;
