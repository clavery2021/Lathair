import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'coupon',
  title: 'Coupon Template',
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
    // defineField({
    //   name: 'couponMessage',
    //   title: 'Title',
    //   type: 'string',
    //   //Message schema
    // }),
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
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  

  ],

  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     media: 'mainImage',
  //   },
  //   prepare(selection) {
  //     const {author} = selection
  //     return {...selection, subtitle: author && `by ${author}`}
  //   },
  // },
})
