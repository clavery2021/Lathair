import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'couponBook',
  title: 'Coupon Book',
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
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      //Read docs for type
    }),
    defineField({
      name: 'isPremium',
      title: 'Premium',
      type: 'boolean',
    }),
    defineField({
      name: 'isOnOffer',
      title: 'Offer',
      type: 'boolean',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
        name: 'coupon',
        title: 'coupon',
        type: 'reference',
        to: [{ type: 'coupon' }]
      })
  ],
})
