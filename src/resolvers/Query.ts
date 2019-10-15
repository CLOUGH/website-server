import { HeroSection, TextSection } from './../models/Section';
import { Page } from './../models/Page';
import { getUserId, Context } from '../utils'

export const Query = {
  feed(parent, args, ctx: Context) {
    return ctx.prisma.posts({ where: { published: true } })
  },

  drafts(parent, args, ctx: Context) {
    const id = getUserId(ctx)

    const where = {
      published: false,
      author: {
        id,
      },
    }

    return ctx.prisma.posts({ where })
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id })
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.user({ id })
  },
  
  pages(parent, args, ctx: Context): Page[] {
    return [
      {
        description: 'Minim pariatur duis in minim magna proident sunt. Nulla pariatur consequat laboris ut anim. Non tempor enim sunt ex adipisicing pariatur ex aliquip ipsum dolor proident magna Lorem exercitation. Esse nostrud ullamco consectetur irure fugiat. Quis proident elit voluptate amet id in. Sunt mollit nostrud duis enim dolor occaecat sunt elit sunt proident cillum.',
        name: 'Occaecat cillum ullamco',
        path: '/occaecat',
        sections: [
          {
            type: 'hero',
            image: 'assets/placeholder.jpg',
            content: `
              <h1 class="display-1">Hero Heading</h1>
              <h4 class="display-5">Sub heading. Usually a description of the page or section.</h4>
            `,

          } as HeroSection,
          {
            type: 'text',
            content: `
              <div class="bg-light pt-5 pb-5">
              <div class="container">
                <h2 class="display-2">Section Title</h2>
                <p>Nulla pariatur laborum dolor laborum eiusmod occaecat. Ullamco ipsum culpa eu pariatur labore. Consectetur nulla pariatur voluptate ut qui consectetur anim qui commodo aliquip fugiat deserunt ipsum officia. Ullamco in nulla aliquip tempor officia ipsum in amet eu aliquip sunt eiusmod mollit. Tempor non cillum non adipisicing. Laborum excepteur aliquip laborum nostrud dolor deserunt pariatur fugiat ipsum dolore. Ea qui in sit velit ea culpa dolore ea velit et.</p>
                <p>Tempor excepteur ex est occaecat excepteur minim minim nisi nisi eu. Consequat veniam veniam velit ut ex commodo. Nostrud laboris velit ad commodo culpa ut incididunt adipisicing irure anim ea reprehenderit.</p>
              </dv>
            </div>
            `
          } as TextSection
        ]
      }
    ];
  }
}
