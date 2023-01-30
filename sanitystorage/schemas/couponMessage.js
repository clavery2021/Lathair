import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'couponMessage',
  title: 'Coupon Message',
  type: 'document',
  fields: [
    //For now hardcode the message onto the coupon using canva
    //Potenitally a solution would be to render the image and when you create the message
    //using css you would layer the message on top of the image therefore they will never need to be togther 
    //as one
    //You create your coupon message - image and message get posted to sanity
    //Receiver pulls the message and image sperately and then on their screen it is layered again 

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    
    // defineField({
    //   name: 'message',
    //   title: 'Message',
    //   type: 'text',
    // }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
})
