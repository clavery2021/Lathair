import { defineType, defineField } from 'sanity';
import { v4 as uuidv4 } from 'uuid'; 

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'UUID',
      type: 'string',
      validation: (Rule) => Rule.required(),

    }),
    defineField({
      name: 'userName',
      title: 'User Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    //form to fill in on account page to get more user info
    defineField({
      name: 'birthday',
      title: 'Birthday',
      type: 'string',
      // validation: (Rule) => Rule.required().email(),
    }),
    //friend list, sent / received coupons

    // defineField({
    //   name: 'role',
    //   title: 'Role',
    //   type: 'string',
    //   options: {
    //     //need custom one for customer
    //     //give all users admin role for now.
    //     list: ['admin', 'editor', 'viewer'],
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
  ],
});
