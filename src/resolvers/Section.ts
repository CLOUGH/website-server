export const Section = {
  __resolveType(section, context, info) {
    if(section.type=='text') {
      return 'TextSection'
    }

    if(section.type =='hero') {
      return 'HeroSection';
    }

    return null;
  }
}