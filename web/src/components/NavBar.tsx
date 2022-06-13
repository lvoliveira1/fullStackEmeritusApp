import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const Navbar = () => {
    const [{ fetching: logoutFetching }, logout]= useLogoutMutation();
    const [{ data, fetching }]= useMeQuery();
    let body = null;

    if (fetching) {

    } else if (data?.me) {
        body = (
            <>
                <Box>Welcome, {data.me.name}</Box>
                <NextLink href="/register">
                    <Link color="white" mr={2}>
                        Add User
                    </Link>
                </NextLink>

                <NextLink href="/account/new">
                    <Link color="white" mr={2}>
                        Add Account
                    </Link>
                </NextLink>
                <Button 
                    onClick={() => { logout(); } }
                    isLoading={logoutFetching}
                    variant='link'>Logout</Button>
            </>
        )
    } else {
        body = (
            <NextLink href="/login">
                <Link color="white" mr={2}>
                    Login
                </Link>
            </NextLink>
        )
    }

    return (
        <Flex bg="green" p={4}>
            <Box ml={'auto'}>
                {/* { fetching ? null : data ? LoggedIn : NotLoggedIn } */}
                { body }
            </Box>
        </Flex>
    );
}

export default Navbar;