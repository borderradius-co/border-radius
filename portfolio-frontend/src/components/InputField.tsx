import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { forwardRef } from 'react'
import { InputHTMLAttributes } from 'react';


type InputFieldProps = React.ComponentPropsWithoutRef<"input"> & {
    label: string;
    name: string;
    textarea?: boolean;
  };


export const InputField = forwardRef<HTMLInputElement, InputFieldProps> (
   ({label, textarea,size:_, ...props}, ref) => {
     let InputOrTextarea = Input; 
     const [field, {error}] =useField(props)

     return textarea ? (
       <FormControl isInvalid={!!error}>
         <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Textarea ref={ref as any} maxHeight="200px" {...field} {...(props as any)} id={field.name} />
          {error? <FormErrorMessage>{error}</FormErrorMessage> : null}
       </FormControl>
      
     ): 
     (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input ref={ref as any} maxHeight="200px" {...field} {...(props as any)} id={field.name} />
        {error? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
     
 
     
     )
    //  if (textarea) {
    //     InputOrTextarea = Textarea;
    //  }   
    //  const [field, {error}] = useField(props);
    //     return (
    //         <FormControl isInvalid={!!error}>
                
    //             <FormLabel htmlFor={field.name}>{label}</FormLabel>
    //             <InputOrTextarea maxHeight="200px" {...field} {...props} id={field.name} />
    //             {error? <FormErrorMessage>{error}</FormErrorMessage> : null}
    //           </FormControl>
              
    //     );

        
})



