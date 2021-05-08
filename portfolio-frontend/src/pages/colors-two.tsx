import {ColorsQuery, useMeQuery, useColorsQuery, useUpdateProjectMutation}  from "../generated/graphql"
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {Box, Button, Image, Flex, Heading, Link, Stack, Text, Icon, IconButton, Avatar, Divider } from "@chakra-ui/react"
import React, { useState } from "react";
import { UpdootSection } from "../components/UpdootSection";
import {useDeleteProjectMutation} from "../generated/graphql"
import { EditDeleteProjectButtons } from "../components/EditDeleteProjectButtons";
import { SimpleGrid } from "@chakra-ui/react"
import { NotionButton } from "../components/NotionButton";
import {MdStayPrimaryPortrait, MdStayPrimaryLandscape} from "react-icons/md"
import CreateModal from "../components/CreateModal";
import { withApollo } from "../utils/withApollo";




const ColorsTwo = () => {
    // const {loading, data, fetchMore, variables} = useColorsQuery({
    //     variables: {
    //         limit: 10, 
    //         cursor: null as null | string
    //     },
    //     notifyOnNetworkStatusChange: true
    // });
     const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
    const {loading, data} = useColorsQuery({
        variables,
    });
    
    const [toggle, setToggle] = useState(false)
    const toggleIt = () => {
        setToggle(!toggle)
    }

    if (!loading && !data) {
        return <div>There are nothing to display! Error!</div>
    }


    

    
    return (

        <Layout>
            <Flex 
            align="center" 
            marginBottom="4" 
            justify="space-between"
            >
            <Heading>Colors</Heading>
           
            
        
            
            </Flex>
            
            {loading && !data ? (
            <div>loading...</div>
            ) : (
                <SimpleGrid columns={toggle ? 1 : 2} spacing={4}>
                    {data!.colors.colors.map((color) =>
                    !color ? null : (
                        <Flex 
                        alignItems="flex-start" 
                        key = {color.id} 
                        padding={5} 
                        borderWidth="0.5px" 
                        borderRadius="5" 
                        direction="column" 
                        justifyContent="space-between"
                        _hover={{border:"1px", borderColor:"#8D036F" }}
                        >
                        



                            <Flex flexDirection="column" justifyContent="space-evenly">

                                
                               
                                <Flex marginBottom="4" marginTop="4" align="center">

                                   

                                    <Text marginRight="4" fontSize="16px" textColor="gray.600" fontWeight="light">{color.user.username}</Text> 
                                
                                </Flex>
                                            
                                <Text  mt={4}>{color.value}</Text>
                                <Flex marginTop="4" align="center">
                               


                                </Flex>   
                                             
                            </Flex> 
                            
                        </Flex>
                    ))}
                </SimpleGrid>
            )}
            {data && data.colors.hasMore ? (
                <Flex marginTop="4">
                <Button
              onClick={() => {
                  setVariables({
                        limit: variables.limit, 
                        cursor: data.colors.colors[data.colors.colors.length - 1].createdAt,
                    })
               
            }}
                isLoading={loading} 
                marginY="8" 
                variant="link"
                _hover={{bg:"none"}}
                _focus={{bg:"none"}}
                
                >Load more...</Button>
            </Flex> 
            ) : null}
            
        </Layout>
    );
};

export default withApollo({ssr: true})(ColorsTwo);