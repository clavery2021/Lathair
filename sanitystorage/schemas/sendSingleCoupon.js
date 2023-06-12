import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sendCoupon',
  title: 'Sent Coupon',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
      description: 'Unique identifier for this document',
      validation: Rule => Rule.required()
    }),
    defineField({
        name: 'sender',
        title: 'Sender',
        //String - Username
        //Likely will be an object of user details
        type: 'string',
      }),
      defineField({
        name: 'receiver',
        title: 'Receiver',
        type: 'string',
      }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
    }),
    defineField({
      name: 'usedCoupon',
      title: 'Used Coupon',
      type: 'boolean',
    }),
  ],
})
