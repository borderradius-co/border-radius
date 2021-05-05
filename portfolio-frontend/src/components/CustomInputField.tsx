import { FormControl, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { forwardRef } from 'react'


type CustomInputFieldProps = React.ComponentPropsWithoutRef<"input"> & {
    name: string;
    color: string
  };


export const CustomInputField = forwardRef<HTMLInputElement, CustomInputFieldProps> (
   ({color, size:_, ...props}, ref) => {

     const [field, {error}] =useField(props)

     return (
         
   
      <FormControl isInvalid={!!error}>
        <Input 
        ref={ref as any} 
        {...field} 
        {...(props as any)} 
        id={field.name} 
        
        marginTop="8px"
        width="100%"
        color={color}
        borderBottom="2px"
        _active={{borderColor: {color} }}
        _focus={{borderColor: {color} }}
        _hover={{borderColor: {color} }}
        variant="flushed"    
        borderColor={color}                                
        />
        {error? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
  
     
 
     
     )

        
})