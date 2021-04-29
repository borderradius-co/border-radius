import { Resolver, Mutation, Arg, InputType, Field } from "type-graphql";
// import { GraphQLUpload } from "graphql-upload";
import { GraphQLUpload } from "apollo-server-express";
import { createWriteStream } from "fs";
import { Upload } from "../types/Upload";
import path from "path";

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(@Arg('image', () => GraphQLUpload) image: Upload) {
    const {filename, mimetype, createReadStream} = await image; 
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (acceptedTypes.indexOf(mimetype) !== -1) {
        const stream = createReadStream()
        stream.pipe(createWriteStream(path.join(__dirname, `../../../portfolio-frontend/public/images/profile-pictures/${filename}`)));
        return true
    }
    throw new Error('Unsupported image type')
  }

}



// @Resolver()
// export class ProfilePictureResolver {
//   @Mutation(() => Boolean)
//   async addProfilePicture(@Arg("image", () => GraphQLUpload)
//   {
//     createReadStream,
//     filename
//   }: Upload): Promise<boolean> {
//     return new Promise(async (resolve, reject) =>
//       createReadStream()
//         .pipe(createWriteStream(__dirname + `../../../portfolio-frontend/public/images/profile-pictures/${filename}`))
//         .on("finish", () => resolve(true))
//         .on("error", () => reject(false))
//     );
//   }
// }