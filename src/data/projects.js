import { skillsData } from "./skills";
import project1 from '../assets/images/project1.png';

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
  }
]