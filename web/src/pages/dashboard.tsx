import { useRouter } from "next/router";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Main } from "../components/Main";
import Navbar from "../components/NavBar";
import { useUsersQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useUsersQuery();

  return (
    <>
      <Navbar></Navbar>
      <Container height="100vh">
        {/* <Main> */}
          { !data?.users ? null : data.users.map((user) => <div key={user.id}>{user.name}</div>) }
        {/* </Main> */}

        <DarkModeSwitch />
      </Container>
    </>
  );
};

export default Index;
