import { Square, Flex,SimpleGrid, Spacer } from '@chakra-ui/layout';
import { Text, useToast, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Avatar, Divider, useDisclosure} from "@chakra-ui/react"
import React, { useState } from 'react'
import {Form, Formik, useField} from "formik";
import SingleColor  from './SingleColor';
import { ChromePicker } from 'react-color';
import {MdColorize, MdSave,MdContentCopy} from "react-icons/md"
import { CustomInputField } from './CustomInputField';
import {MdShuffle, MdRefresh} from "react-icons/md";
import randomColor from "randomcolor"
import {useColorsQuery, useCreateColorMutation} from "../generated/graphql"
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import { withApollo } from "../utils/withApollo";
import { colorGenerator } from '../utils/colorGenerator';
import { useMeQuery } from '../generated/graphql';




interface ColorGeneratorToolBarProps {

}

const ColorGeneratorToolBar: React.FC<ColorGeneratorToolBarProps> = ({}) => {
    const [color, setColor] = useState('#8D036F')
    const [createColor] = useCreateColorMutation();
    const {data} = useColorsQuery({
        variables: {
            limit: 10,
            cursor: null
        }
    })
    const [error, setError] = useState(false)
    const [list, setList] = useState(colorGenerator('#8D036F'))
    const [picker, setPicker] = useState(false)
    const randomlyGeneratedColor = randomColor()
    const router = useRouter(); 
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {data: meData} = useMeQuery()
    const hexValue = `#${color}`
    // const notLoggedIn = !meData?.me?.id

    // console.log("not logged in?: ", notLoggedIn)
    

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
           
           let colors = colorGenerator(randomlyGeneratedColor)
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
            
            let colors = colorGenerator(color)
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
            
            let colors = colorGenerator(color)
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
                                aria-label="Save" 
                                icon={<MdSave/>} 
                                type="submit"
                                isLoading={isSubmitting}
                                variant="outline"
                                _active={{bg:{color}}}
                                _focus={{bg: {color} }}
                                _hover={{bg: {color} }}
                                marginLeft="2"
                                // hidden={notLoggedIn ? true : false}
                        /> 
                        <IconButton 
                                aria-label="Reload" 
                                icon={<MdRefresh/>} 
                                onClick={reload}
                                variant="outline"
                                _active={{bg:{color}}}
                                _focus={{bg: {color} }}
                                _hover={{bg: {color} }}
                                marginLeft="2"  
                        />                        
                    </Flex>
                    <Flex>
                    </Flex>
            
                </Flex>
                           
                         


                        </Form>
                        )}
            </Formik>            
                    <SimpleGrid columns={9} spacing={0} >
                  
                       

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