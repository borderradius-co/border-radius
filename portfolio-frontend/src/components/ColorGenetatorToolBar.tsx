import { Box, Circle,Square, Flex, Heading, SimpleGrid, Spacer, Stack } from '@chakra-ui/layout';
import {border, Text,Button, useToast,FormControl, FormErrorMessage, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Avatar, Divider} from "@chakra-ui/react"
import React, { useState } from 'react'
import { Layout } from './Layout';
import Values from "values.js"
import {Form, Formik, useField} from "formik";
import SingleColor  from './SingleColor';
import { ChromePicker } from 'react-color';
import {MdColorize} from "react-icons/md"
import { CustomInputField } from './CustomInputField';
import {MdShuffle, MdSave, MdRefresh} from "react-icons/md";
import randomColor from "randomcolor"
import {ColorsDocument, ColorsQuery, useCreateColorMutation} from "../generated/graphql"
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import {useColorsQuery} from "../generated/graphql"
import { withApollo } from "../utils/withApollo";
import { colorGenerator } from '../utils/colorGenerator';



interface ColorGeneratorToolBarProps {

}

const ColorGeneratorToolBar: React.FC<ColorGeneratorToolBarProps> = ({}) => {
    const [color, setColor] = useState('#8D036F')
    const [createColor] = useCreateColorMutation();
    const [error, setError] = useState(false)
    const [list, setList] = useState(new Values('#8D036F').all(10))
    const [picker, setPicker] = useState(false)
    const randomlyGeneratedColor = randomColor()
    const router = useRouter(); 
    const hexValue = `#${color}`
    console.log("color from toolbar:", color)


    const handleChangeComplete = (color:any) => {
        setColor(color.hex)
        setTimeout(() => {
            setPicker(false)
        }, 100);
        
    };

    const toast = useToast()


  

    const generateRandomColor = (e: any) => {
       e.preventDefault()
       setColor(randomlyGeneratedColor)
       
       try {
           
           let colors = new Values(randomlyGeneratedColor).all(10)
           setList(colors)
           
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

    const handleChange = (e:any) => {
    setColor(e.target.value)}


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

      const handleCreateColor = () => {
        createColor({variables: {value: color}})
    }
    const reload = () => {
        router.reload()
    }
    
        return (
            <>

            <Formik 
            initialValues={{value: color}}   
            onSubmit={async (values, {setErrors}) => 
            {

            const response = await createColor({variables: {value: color},
                update: (cache) => {
                    cache.evict(({fieldName: 'colors:{}'}))
                }   
            })
            if (response.data?.createColor.errors) {
                setErrors (toErrorMap(response.data.createColor.errors));
            } else if(response.data?.createColor.color) {
                router.reload()
                toast({
                    title: `${color} is saved`,
                    status:'success',
                    position: 'top-right'
                })
            }
            
            // const response = await createColor({variables: {value: color}
                
            // });
            
            
            }}>
            
            {({isSubmitting}) => (
                        <Form>
                           
                                <Flex justify="flex-end">
                                    <Spacer/>
                                    <CustomInputField 
                                    name="value" 
                                    color={color}
                                    value={color}
                                    placeholder="#8D036F"
                                    // value={color}
                                    onKeyUp={handleSubmit}
                                    onChange= {handleChange}

                                    />
                              
                                </Flex>
                                   
                            
                        <Flex direction="column" >
                                
                        <Flex marginBottom="8px" align="center">
                        
                         <Square
                        
                        marginRight="auto"
                        borderRadius="5px"
                        size="10"
                        bg={color}
                        
                        />
                        <Text marginLeft="2" color={color}>{color.toUpperCase()}</Text>
                        <Spacer/>

                        
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
                        <IconButton 
                                aria-label="Picker" 
                                type="submit"
                                icon={<MdSave/>} 
                                variant="outline"
                                _active={{bg:{color}}}
                                _focus={{bg: {color} }}
                                _hover={{bg: {color} }}
                                marginLeft="2"
                                isLoading={isSubmitting}
                                // borderRadius="50"
                                
                        />    
                        <IconButton 
                                aria-label="Picker" 
                                icon={<MdRefresh/>} 
                                onClick={reload}
                                variant="outline"
                                _active={{bg:{color}}}
                                _focus={{bg: {color} }}
                                _hover={{bg: {color} }}
                                marginLeft="2"
                                // borderRadius="50"
                                
                        />   
                       

                        
                      
                        
                    </Flex>
                    <Flex>
                    </Flex>
            
                </Flex>
                           
                         


                        </Form>
                        )}
            </Formik>
{/* 
            <form onSubmit={handleCreateColor}>
                 <IconButton 
                                aria-label="Picker" 
                                type="submit"
                                icon={<MdSave/>} 
                                variant="outline"
                                _active={{bg:{color}}}
                                _focus={{bg: {color} }}
                                _hover={{bg: {color} }}
                                // borderRadius="50"
                                
                                />    

            </form> */}

                                       
            
                
                   
                    
                    <SimpleGrid columns={7} spacing={0} >
                       

                            {list.map((color: any, index: any) => {
                                return (
                                    <>
                                    <SingleColor key={index} {...color} index={index} hexColor={color.hex} />
                                    </>
                                )
                            })}
                    </SimpleGrid>

                    

                    
            </>
        );
}


export default withApollo({ssr: true})(ColorGeneratorToolBar)