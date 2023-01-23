import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'couponMessage',
  title: 'Coupon Message',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
      defineField({
        name: 'coupon',
        title: 'Coupon Template',
        type: 'array',
        of: [{type: 'reference', to: {type: 'coupon'}}],
      }),
  ],
})
