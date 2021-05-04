import { Box, Circle,Square, Flex, Heading, SimpleGrid, Spacer, Stack } from '@chakra-ui/layout';
import {border, Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger} from "@chakra-ui/react"
import React, { useState } from 'react'
import { Layout } from './Layout';
import Values from "values.js"
import {useField} from "formik";
import SingleColor  from './SingleColor';
import { ChromePicker } from 'react-color';
import {MdColorize} from "react-icons/md"
import { InputField } from './InputField';
import {MdShuffle} from "react-icons/md";
import randomColor from "randomcolor"




interface ColorGeneratorProps {

}

const ColorGenerator: React.FC<ColorGeneratorProps> = ({}) => {
    const [color, setColor] = useState('#8D036F')
    const [error, setError] = useState(false)
    const [list, setList] = useState(new Values('#8D036F').all(10))
    const [picker, setPicker] = useState(false)
    const randomlyGeneratedColor = randomColor()



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
                <Flex 
                align="center" 
                marginBottom="4" 
                justify="space-between"
                >
                <Heading>Colors</Heading>
                  
                <Flex align="center">
                     <form onSubmit={handleSubmit}>
                     <Flex align="flex-end" width="100%" justify="space-between">
             
                        <FormControl width="100%">
                                <Input 
                                    _active={{borderColor: {color} }}
                                    _focus={{borderColor: {color} }}
                                    _hover={{borderColor: {color} }}
                                    color={color}
                                    borderBottom="2px"

                                    // borderColor={color}
                                    // bg="none"
                                    value={color} 
                                    onChange={(e) => setColor(e.target.value)} 
                                    placeholder="#8D036F"
                                    onKeyUp={handleSubmit}
                                    variant="flushed"    
                                    borderColor={color}                                
                                    >
                                </Input>
                        </FormControl>
                            
                            </Flex>

                </form> 
                <Square marginRight="2" marginLeft="2" borderRadius="5px" size="10" bg={color}/>
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
                                marginRight="2"
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

                
                <Button
                variant="outline"  
                fontWeight="hairline" 
                _focus={{bg:"none"}} 
                _hover={{bg:"none"}}
                style={{textDecoration: "none"}} 
                rightIcon={<MdShuffle/>} 
                color="#7a3f6e"
                onClick={generateRandomColor}
                >
                    Random Color
                </Button>


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

                     <SimpleGrid columns={21} spacing={0} marginTop="20px">
                            {dummyListThree.map((color: any, index: any) => {
                                return (
                                    <SingleColor key={index} {...color} index={index} hexColor={color.hex} />
                                )
                            })}
                    </SimpleGrid>
                    
                     <SimpleGrid columns={21} spacing={0} marginTop="20px">
                            {dummyListOne.map((color: any, index: any) => {
                                return (
                                    <SingleColor key={index} {...color} index={index} hexColor={color.hex} />
                                )
                            })}
                    </SimpleGrid>
                     <SimpleGrid columns={21} spacing={0} marginTop="20px">
                            {dummyListTwo.map((color: any, index: any) => {
                                return (
                                    <SingleColor key={index} {...color} index={index} hexColor={color.hex} />
                                )
                            })}
                    </SimpleGrid>
                   


                </SimpleGrid>
                        
            </Layout>
        );
}


export default ColorGenerator