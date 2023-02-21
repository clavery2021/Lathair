import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sentCouponTest1',
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
    //   defineField({
    //     name: 'price',
    //     title: 'Price',
    //     type: 'number',
    //   }),
    // defineField({
    //   name: 'date',
    //   title: 'Date Sent',
    //   type: 'date',
    // }),
    // defineField({
    //     name: 'expiryDate',
    //     title: 'Expiry Date',
    //     type: 'date',
    //   }),
    // defineField({
    //   name: 'couponMessage',
    //   title: 'Coupon With Message',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'couponMessage' }] }]
    // })
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
})
