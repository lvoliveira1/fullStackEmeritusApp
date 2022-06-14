import { Box, Button, Flex } from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const Navbar = () => {
    const [{ fetching: logoutFetching }, logout]= useLogoutMutation();
    const [{ data }]= useMeQuery();

    return (
        <Flex bg="var(--chakra-colors-green-300)" p={4}>
            { !data?.me
                ? <></>
                : <>
                    <Box ml={'auto'} color="black">Welcome, {data?.me?.user?.name}</Box>
                    <Button 
                        onClick={() => { logout(); } }
                        isLoading={logoutFetching}
                        variant='link'>
                            Logout
                    </Button>
                </>
            }
        </Flex>
    );
}

export default Navbar;