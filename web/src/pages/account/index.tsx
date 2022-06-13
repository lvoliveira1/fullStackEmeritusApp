import { Select } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import Navbar from "../../components/NavBar";
import { useUsersQuery } from "../../generated/graphql";

const ListBankAccount = () => {
  const [{ data }] = useUsersQuery();

  // const [inputValue, setInputValue] = useState("");

  const handleChange = (newValue: any) => {
    // const [{ data: statments }, statments2] = useBankAccountStatementsQuery();

  };
  
  return (
    <>
      <Navbar></Navbar>
      <Container height="100vh">
          <Select id="currentBankAccount" onChange={handleChange} value=''>
            <option id="">-- Select one bank account --</option>
            { !data?.users ? null : data.users.map((user) => <option id={user.id}>{user.name}</option>) }
          </Select>
          <p></p>
          {/* <p>{this?.state?.value}</p> */}
        <DarkModeSwitch />
      </Container>
    </>
  );
};

export default ListBankAccount;
