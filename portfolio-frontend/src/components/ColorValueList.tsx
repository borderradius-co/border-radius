import { Flex, Heading, SimpleGrid, Square} from '@chakra-ui/layout';
import {Text,Button,Avatar,Box, Divider, color} from "@chakra-ui/react"
import React, { useState } from 'react'
import SingleColor  from './SingleColor';
import {useColorsQuery} from "../generated/graphql"
import { withApollo } from "../utils/withApollo";
import { colorGenerator } from '../utils/colorGenerator';


interface ColorValueListProps {

}

const ColorValueList: React.FC<ColorValueListProps> = ({}) => {
  
  

    const {loading, data, fetchMore, variables} = useColorsQuery({
        variables: {
            limit: 50, 
            cursor: null
        },
        notifyOnNetworkStatusChange: true
    });
        return (
            <>
                    {loading && !data ? (
                        <div>loading...</div>
                    ) : (
                    <>
                        {data!.colors.colors.map((userColor)=> 
                        !userColor ? null : (
                            
                        <Box key={userColor.id}  >
                        <Flex marginTop="4" align="center" justify="flex-end" >
                                    <Square borderRadius="5" marginRight="2" bg={userColor.value} size="10"></Square>

                                    <Text color={userColor.value}>{userColor.value.toUpperCase()}</Text>
                                    <Divider marginLeft="2" marginRight="2"/>
                                    <Text marginRight="4" fontSize="16px" textColor="gray.600" fontWeight="light">{userColor.user.username}</Text> 

                                    <Avatar   
                                    src="https://bit.ly/code-beast"  
                                    name={userColor.user.username} 
                                    size="xs" bg="blue.900"
                                     color="white" 
                                     marginRight="2"/>
                                     
                        </Flex>
                        <SimpleGrid   columns={21} spacing={0} marginTop="20px">
                                {colorGenerator(userColor.value).map((color: any, index: any) => {
                                    return (
                                        <>
                                        <SingleColor  {...color} index={index} hexColor={color.hex} />
                                        </>
                                    )
                                })}
                        </SimpleGrid>
                        </Box>            
                        ))}
                    </>
                    )}
                    
                    {data && data.colors.hasMore ? (
                            <Flex marginTop="4">
                            <Button
                        onClick={() => {
                            fetchMore({
                            variables: {
                                limit: variables?.limit,
                                cursor:
                                data.colors.colors[data.colors.colors.length - 1].createdAt,
                            },
                            });
                        }}
                            isLoading={loading} 
                            marginY="8" 
                            variant="link"
                            _hover={{bg:"none"}}
                            _focus={{bg:"none"}}
                            
                            >Load more...</Button>
                        </Flex> 
                    ) : null}          
            </>
        );
}


export default withApollo({ssr: true})(ColorValueList)