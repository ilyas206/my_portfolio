import { skillsData } from "./skills";
import project1 from '../assets/images/project1.png';
import project2 from '../assets/images/project2.png';

export const projectsData = [
  {
    title: 'Splentra | Expense Splitting',
    description:
      'Splentra is a full-stack expense splitting app that helps groups of people track shared costs and manage who owes what — without the mental overhead of manual calculations . It solves the common problem of splitting rent, travel, or daily expenses fairly among friends, roommates, or colleagues. Built for anyone who wants a clean, transparent way to stay on top of group finances.',
    tech: [skillsData[3], skillsData[6], skillsData[12], skillsData[4], skillsData[11]],
    accentColor: '#95e0ad',    
    siteUrl: 'https://splentra.netlify.app',
    repoUrl: 'https://github.com/ilyas206/Splentra-Expense-Splitting',
    screenshot: project1,    
  },
  {
    title: 'SIRAJ | Light of Guidance',
    description:
      'SIRAJ is a modern, multilingual Islamic guidance web app that helps users access important religious and spiritual resources in one place without the hassle of searching through multiple sources. It solves the common problem of finding clear, organized information about daily worship, fasting, Islamic names of Allah, and knowledge about notable scholars in a simple and engaging experience. Built for the Ummah, it offers a free, user-friendly platform that makes Islamic learning and daily guidance more accessible, meaningful, and easy to explore.',
    tech: [skillsData[3], skillsData[4], skillsData[11]],
    accentColor: '#94A3B8',    
    siteUrl: 'https://siraj-light.netlify.app',
    repoUrl: 'https://github.com/ilyas206/SIRAJ',
    screenshot: project2,    
  }
]