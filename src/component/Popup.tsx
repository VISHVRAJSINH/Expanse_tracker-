import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import supabase from "../service/supabaseClient";
import { exTableprops } from "./ExpanceTable";

interface popProps {
  parentprop: exTableprops;
}

const Popup = ({ parentprop, updateParentData }: any) => {
  const [amountValue, setAmount] = useState<any>(parentprop || 0);
  const [error, setError] = useState("");

  const handleUpdate = async (id: number) => {
    const { data, error } = await supabase
      .from("Expanse")
      .update({ amount: amountValue })
      .eq("id", id)
      .select();

    updateParentData(data);
    setAmount(data);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="teal" size="sm">
            Edit
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton size="md" />
          <PopoverBody marginTop={4}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(parentprop.id);
              }}
            >
              <FormControl>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <VStack>
                  {error && <Text>{error}</Text>}
                  <Input
                    type="number"
                    id="amount"
                    defaultValue={parentprop.amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                  <Button
                    marginTop={4}
                    colorScheme="teal"
                    w="100%"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </VStack>
              </FormControl>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default Popup;
