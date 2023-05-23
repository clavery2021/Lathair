import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sentCouponBook',
  title: 'Sent Coupon Book',
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
        name: 'dateCreated',
        title: 'Date Created',
        type: 'date',
      }),
      defineField({
          name: 'expiryDate',
          title: 'Expiry Date',
          type: 'date',
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
        name: 'couponBook',
        title: 'Coupon Book',
        type: 'reference',
        to: [{ type: 'couponBook' }]
      }),
  ],
})
