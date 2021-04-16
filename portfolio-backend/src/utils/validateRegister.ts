import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
    if (!options.email.includes("@")) {
        return[{
                field: "email",
                message: "Invalid email!",
            }]
        
    }
    if (options.username.length <= 2) {
        return [{
                field: "username",
                message: "Username is too short"
            }]
        
    }
    if (options.username.includes("@")) {
        return [{
                field: "username",
                message: "Username cannot include '@', please choose a different username"
            }]
        
    }
    if (options.password.length <= 3) {
        return[{
                field: "password",
                message: "Password is too short"
            }]
        
    }


    //password should contain Lowercase, Uppercase, Number, Minimum Length of 8, 

    return null
    
}