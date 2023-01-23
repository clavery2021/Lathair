import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
    //This Id will need changes to access my backend sanity
    projectId: "n3cx69lh",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

//To add cors into project cd into sanity
//sanity cors add http://localhost:3000

export default client;
