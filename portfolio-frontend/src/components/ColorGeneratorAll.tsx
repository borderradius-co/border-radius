import { Box, Circle,Square, Flex, Heading, SimpleGrid, Spacer, Stack } from '@chakra-ui/layout';
import {border, Text,Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Avatar, Divider} from "@chakra-ui/react"
import React, { useState } from 'react'
import { Layout } from './Layout';
import Values from "values.js"
import {Form, Formik, useField} from "formik";
import SingleColor  from './SingleColor';
import { ChromePicker } from 'react-color';
import {MdColorize} from "react-icons/md"
import { CustomInputField } from './CustomInputField';
import {MdShuffle, MdSave} from "react-icons/md";
import randomColor from "randomcolor"
import {useCreateColorMutation} from "../generated/graphql"
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import {useColorsQuery} from "../generated/graphql"
import { withApollo } from "../utils/withApollo";
import { useGetColorValuesFromColors } from '../utils/useGetColorValuesFromColors';
import { colorGenerator } from '../utils/colorGenerator';


interface ColorGeneratorProps {

}

const ColorGenerator: React.FC<ColorGeneratorProps> = ({}) => {
const [color, setColor] = useState('#8D036F')
    const [createColor] = useCreateColorMutation();
    const [error, setError] = useState(false)
    const [list, setList] = useState(new Values('#8D036F').all(10))
    const [picker, setPicker] = useState(false)
    const randomlyGeneratedColor = randomColor()
    const router = useRouter(); 
    const hexValue = `#${color}`
    const colorValues = useGetColorValuesFromColors()


    const {loading, data, fetchMore, variables} = useColorsQuery({
        variables: {
            limit: 10, 
            cursor: null
        },
        notifyOnNetworkStatusChange: true
    });
    




    const dummyListOne = new Values('#ce97c6').all(10)
    const dummyListTwo = new Values('#323d30').all(10)
    const dummyListThree = new Values('#6b2e10').all(10)


    const handlePicker = () => {
       !picker ?
        setPicker(true)
        : setPicker(false)
    }
    

    const handleChangeComplete = (color:any) => {
        setColor(color.hex)
        setTimeout(() => {
            setPicker(false)
        }, 100);
        
    };

    const generateRandomColor = (e: any) => {
       e.preventDefault()
       setColor(randomlyGeneratedColor)
       try {
           let colors = new Values(randomlyGeneratedColor).all(10)
           setList(colors)
           setColor(randomlyGeneratedColor)
       } catch(error) {
           setError(true)
           console.log('error: ', error)
       }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setColor(color)
        try {
            let colors = new Values(color).all(10)
            setList(colors)
            console.log('colors: ', colors)

        } catch(error) {
            setError(true)
            console.log('error: ', error)
        }
    }

    const handleColorChange = (e:any) => {
        try {
            let colors = new Values(color).all(10)
            setList(colors)
            console.log('colors: ', colors)


        } catch(error) {
            setError(true)
            console.log('error: ', error)
        }

    }
    
        return (
            <Layout>

            <Formik 
            initialValues={{value: ''}}   
            onSubmit={async (values, {setErrors}) => 
            {
            
        
            const response = await createColor({variables: {options: values}});
             
            if (response.data?.createColor.errors) {
                setErrors (toErrorMap(response.data.createColor.errors));
            } else if(response.data?.createColor.color) {
                setColor(hexValue)
                console.log('values:', values.value);
                
               
                router.push("/colors")
            }
           
            }}>
            
            {({isSubmitting}) => (
                        <Form>
                        <IconButton 
                        aria-label="save"
                        type="submit"
                        _active={{bg:{color}}}
                        _focus={{bg: {color} }}
                        _hover={{bg: {color} }}
                        icon={<MdSave/>}
                        variant="outline" 
                        isLoading={isSubmitting}
                        />
                        <CustomInputField 
                        name="value" 
                        placeholder={color}
                        color={color}
                        value={color}
                        onKeyUp={handleSubmit}
                        onChange={(e) => setColor(e.target.value )}       
                        
                        />

                        </Form>



                         )}
            </Formik>
            
            
                <Flex direction="column" >
                    <Flex marginBottom="8px">
                        <Heading>Colors</Heading>
                        <Square
                        
                        marginRight="2"
                        marginLeft="auto"
                        borderRadius="5px"
                        size="10"
                        bg={color}
                        />
                         <IconButton
                        aria-label="Random"
                        variant="outline"  
                        fontWeight="hairline" 
                        active={{bg:{color}}}
                        _focus={{bg: {color} }}
                        _hover={{bg: {color} }}
                        icon={<MdShuffle/>} 
                        marginRight="2"
                        onClick={generateRandomColor}
                        />
                        
                        <Popover placement="bottom-end">
                            <PopoverTrigger>
                               <IconButton 
                                aria-label="Picker" 
                                icon={<MdColorize/>} 
                                variant="outline"
                                _active={{bg:{color}}}
                                _focus={{bg: {color} }}
                                _hover={{bg: {color} }}
                                // borderRadius="50"
                                
                                />
                            </PopoverTrigger>
                            <PopoverContent 
                            _active={{borderColor:"none"}} 
                            _focus={{borderColor:"none"}}
                            
                            >
                                <PopoverCloseButton />
                                <PopoverHeader>Pick a color!</PopoverHeader>
                                <PopoverBody align="center">
                                    <ChromePicker
                                 color={ color}
                                 onChangeComplete={ handleChangeComplete}
                                 onChange={handleColorChange}
                                /></PopoverBody>
                            </PopoverContent>
                        </Popover>
                        

                        

                    </Flex>
                    <Flex>
                        
                        
                      



                    </Flex>
                     
                        

                </Flex>
                
                
                        
               
                      
                <SimpleGrid column={1}>
                    
                    <SimpleGrid columns={7} spacing={0} marginTop="20px">
                       

                            {list.map((color: any, index: any) => {
                                return (
                                    <>
                                    <SingleColor key={index} {...color} index={index} hexColor={color.hex} />
                                    </>
                                )
                            })}
                    </SimpleGrid>
                    {data?.colors.colors.map((userColor)=> {
                    return (
                        <>
                        <Flex  marginTop="4" align="center" justify="flex-end">

                                    <Avatar   
                                    src="https://bit.ly/code-beast"  
                                    name={userColor.user.username} 
                                    size="xs" bg="blue.900"
                                     color="white" 
                                     marginRight="2"/>

                                    <Text marginRight="4" fontSize="16px" textColor="gray.600" fontWeight="light">{userColor.user.username}</Text> 
                                    <Divider width="100%" marginRight="2" />
                                
                        </Flex>


                    <SimpleGrid columns={7} spacing={0} marginTop="20px">
                         
                                                  

                            {colorGenerator(userColor.value).map((color: any, index: any) => {
                                

                                return (
                                    <>
                                   
                                    <SingleColor key={index} {...color} index={index} hexColor={color.hex} />
                                    
                                    </>
                                )
                            })}
                    </SimpleGrid>
                    
                    </>
                    )})}
                    {data && data!.colors.hasMore ? (
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
                </SimpleGrid>
                

                

                
                        
            </Layout>
        );
}


export default withApollo({ssr: true})(ColorGenerator)