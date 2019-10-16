import { Page, PageCreateInput } from './../generated/prisma-client/index';
import { Context } from '../utils';

export const page = {
  Query : {
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
      const {name, path, description} = page;
      return ctx.prisma.updatePage({
        data:{name, path, description},
        where: {id: id}
      });
    }
  }
}