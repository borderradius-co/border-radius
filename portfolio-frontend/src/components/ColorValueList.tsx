import { Flex, Heading, SimpleGrid, Square} from '@chakra-ui/layout';
import {Text,Button,Spacer,Avatar,Box, Divider, color} from "@chakra-ui/react"
import React, { useState } from 'react'
import SingleColor  from './SingleColor';
import {useColorsQuery} from "../generated/graphql"
import { withApollo } from "../utils/withApollo";
import { colorGenerator } from '../utils/colorGenerator';
import { DeleteColorButton } from './DeleteColorButton';


interface ColorValueListProps {
    

}

const ColorValueList: React.FC<ColorValueListProps> = ({}) => {
  
  

    const {loading, data, fetchMore, variables} = useColorsQuery({
        variables: {
            limit: 10, 
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
                            
                        <Box  key={userColor.id} >
                        
                            <Flex marginTop="4"  justify="flex-end" align="center" >
                                    <Square borderRadius="5" marginRight="2" bg={userColor.value} size="10"></Square>

                                    <Text color={userColor.value}>{userColor.value.toUpperCase()}</Text>
                                    
                                    <Divider marginLeft="2" marginRight="2"/>

                                    <Text marginRight="4" fontSize="16px" textColor="gray.700" fontWeight="light">{userColor.user.username}</Text> 
                                    <Avatar   
                                    name={userColor.user.username} 
                                    size="sm"   
                                     color="white"
                                     bgColor="gray.700"
                                     />                                                                                                             
                                     <DeleteColorButton id={userColor.id} userId={userColor.user.id} />

                                     
                                    
                        </Flex>
                        <SimpleGrid   columns={7} spacing={0} marginTop="20px"  >
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