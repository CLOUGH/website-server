import { Page, PageCreateInput } from './../generated/prisma-client/index';
import { Context } from '../utils';

export const page = {
  Query : {
    pageByPath(parent, {path}, ctx: Context) {
      return ctx.prisma.page({path})
    },
    pages(parent, args, ctx: Context) {
      return ctx.prisma.pages();
    },
    page(parent, {id}, ctx: Context) {
      return ctx.prisma.page({id});
    },
    
  },
  Page : {
    sections: ({ id }, args, ctx: Context) => {
      return ctx.prisma.page({id}).sections();
    }
  },
  Mutation: {
    async createPage(parent, {page}, ctx: Context, info) {
      return ctx.prisma.createPage({
        ...page,
        sections : {
          create : page.sections
        }
      });
    },
    async updatePage(parent, {id, page}, ctx: Context, info) {
      const {sections, ...pageUpdate} = page;
      return ctx.prisma.updatePage({
        where: {id},
        data:{ 
          ...pageUpdate,
          sections: {
            create: sections.filter(section => !section.id).map(section => section),
            update: sections.filter(section => section.id).map(section => {
              const {id,...sectionData} = section
              return {
                where: {id},
                data: sectionData
              }
            })
          }
        }
      });
    },
    async deletePage(parent, { id }, ctx: Context, info) {
      const userId = ctx.prisma.page({id});
      const pageExist = await ctx.prisma.$exists.page({id});
      if (!pageExist) {
        throw new Error(`Page not found`);
      }
  
      return ctx.prisma.deletePage({ id });
    },
  }
}