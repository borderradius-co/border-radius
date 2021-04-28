import React from "react";
import { Box } from "@chakra-ui/react";

export type WrapperVariant ="small" | "regular"

interface WrapperProps {
  variant?: WrapperVariant;
}



export const Wrapper:  React.FC<WrapperProps> = ({ children, variant='regular' }) => {
  return (
    <Box
      marginTop={8}
      maxWidth={variant === 'regular' ? "800" : "400px"}
      width="100%"
      marginX="auto"
      padding="24px"
    >
      {children}
    </Box>
  );
};

export default Wrapper;