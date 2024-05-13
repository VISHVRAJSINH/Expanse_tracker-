import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardBody,
  Button,
  HStack,
} from "@chakra-ui/react";
import supabase from "../service/supabaseClient";
import Popup from "./Popup";

export interface exTableprops {
  id: number;
  amount: number;
  description: string;
  people: string;
}

const ExpanceTable = () => {
  const [fetchdata, setData] = useState<exTableprops[]>([]);

  useEffect(() => {
    const Fetch = async () => {
      const { data, error } = await supabase.from("Expanse").select();

      if (data) {
        setData(data);
      }
    };

    Fetch();
  }, []);

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("Expanse").delete().eq(`id`, id);
    setData(fetchdata.filter((i) => i.id !== id));
    console.log(error);
  };

  const handleUpdate = (data: any, id: number) => {
    console.log("data", data);
    // console.log(fetchdata[id]);
    data = data[0];
    console.log(data);
    // console.log(fetchdata.map((i) => (i.id === data.id ? data : i)));
    setData((prev) => {
      return prev.map((item) => (item.id === data.id ? data : item));
    });
  };

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Amount</Th>
                  <Th>Discription</Th>
                </Tr>
              </Thead>

              {fetchdata.map((i, index) => (
                <Tbody key={i.id}>
                  <Tr>
                    <Td>{index}</Td>
                    <Td>{i.people}</Td>
                    <Td>{i.amount}</Td>
                    <Td>{i.description}</Td>

                    <Td>
                      <HStack>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDelete(i.id)}
                        >
                          Delete
                        </Button>
                        <Popup parentprop={i} updateParentData={handleUpdate} />
                      </HStack>
                    </Td>
                  </Tr>
                </Tbody>
              ))}

              <Tfoot>
                <Tr>
                  <Td textColor="White" fontSize="xl" fontWeight="700">
                    Total
                  </Td>

                  <Td fontSize="xl" fontWeight="700">
                    {fetchdata.reduce(
                      (acc, fetchdata) => fetchdata.amount + acc,
                      0
                    )}
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default ExpanceTable;
