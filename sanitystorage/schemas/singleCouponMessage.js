import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sendSingleCoupon',
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
    // defineField({
    //     name: 'sender',
    //     title: 'Sender',
    //     //String - Username
    //     //Likely will be an object of user details
    //     type: 'string',
    //   }),
      defineField({
        name: 'receiver',
        title: 'Receiver',
        type: 'string',
      }),
    defineField({
      name: 'ingleCouponMessage',
      title: 'Coupon Message',
      type: 'String',
    }),
    defineField({
        name: 'coupon',
        title: 'Coupon',
        type: 'reference',
        to: [{ type: 'coupon' }]
      }),
  ],
})
