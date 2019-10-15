import { Section } from './Section';

export interface Page {
  name: string;
  path: string;
  description: string;
  sections: Section[]
}