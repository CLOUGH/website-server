import { Page, PageCreateInput } from './../generated/prisma-client/index';
import { Context } from '../utils';

export const page = {
  Query : {
    pages(parent, args, ctx: Context) {
      return ctx.prisma.pages();
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
    }
  }
}