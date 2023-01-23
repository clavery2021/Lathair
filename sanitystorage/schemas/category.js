import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
    }),
    defineField({
      name: 'coupon',
      title: 'Coupons',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coupon' }] }]
    })
  ]
})
