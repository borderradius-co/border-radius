import React, { useEffect, useState } from 'react'
import {Flex,IconButton,Text, useToast } from "@chakra-ui/react"
import rgbToHex from '../utils/rgbToHex'
import {MdContentCopy} from "react-icons/md"

interface SingleColorProps {
    rgb?: number[];
    weight?: string;
    index: number;
    hexColor?: any;

}

const SingleColor: React.FC<SingleColorProps> = ({rgb, weight, index, hexColor}) => {
    const [alert, setAlert] = useState(false)
    const bcg = rgb?.join(',')
    const hexValue = `#${hexColor}`
    const toast = useToast()
    const [hover, setHover] = useState(false)

    useEffect(() => {
        const timeout =setTimeout(() => {
            setAlert(false)
            return () => clearTimeout(timeout)
        }, 2000)

    },[alert])
    
    // console.log('rgb: ', rgb)
    // console.log('bcg: ', bcg)
    // console.log('hexColor:', hexColor)
    // console.log('hexValue: ', hexValue) 

        return (
            <Flex 
            minHeight="120px" 

            color={index>= 10 ? 'white' : 'black'} bg={`rgb(${bcg})`}
            direction="column"
            align="center"
            justify="center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            >
            {hover && (
            
            <IconButton
                aria-label="Picker" 
                icon={<MdContentCopy/>}
                borderRadius="50px"
                _active={{bg:"none", borderRadius:'50'}}
                _focus={{bg: "none" , borderRadius:'50'}}
                _hover={{bg:"none", borderRadius:'50', } }  
                bg="none"
                marginLeft="8px"
                onClick={() => {
                    setAlert(true);
                    navigator.clipboard.writeText(hexValue);
                    toast({
                        title: `${hexValue} was successfully copied to clipboard`,
                        status: 'info',
                        position: 'top-right',
                        isClosable: true
                    })
                    
                }}
                />

            )}
            

               
                
                
                
                {/* {alert? 
                <>
                <Flex direction="column">
                    <Text>Copied to Clipboard</Text> 
                    <Text>{hexValue}</Text>
                </Flex>
               
                </>
                
                : null}  */}

            </Flex>
        );
}

export default SingleColor