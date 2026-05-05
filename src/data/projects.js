import { skillsData } from "./skills";

export const projectsData = [
  {
    title: 'Project One',
    description:
      'A brief description of what this project does, the problem it solves, and who it is for. Keep it to 2-3 sentences max.',
    tech: [skillsData[3], skillsData[6], skillsData[12], skillsData[4]],
    accentColor: '#6366f1',       // indigo — change to match your real project palette
    siteUrl: 'https://yoursite.com',
    repoUrl: 'https://github.com/yourusername/project-one',
    screenshot: null,             // replace with: import img from '../assets/images/project1.png'
  },
  {
    title: 'Project Two',
    description:
      'A brief description of what this project does, the problem it solves, and who it is for. Keep it to 2-3 sentences max.',
    tech: [skillsData[3], skillsData[1], skillsData[13]],
    accentColor: '#10b981',       // emerald
    siteUrl: 'https://yoursite.com',
    repoUrl: 'https://github.com/yourusername/project-two',
    screenshot: null,
  },
  {
    title: 'Project Three',
    description:
      'A brief description of what this project does, the problem it solves, and who it is for. Keep it to 2-3 sentences max.',
    tech: [skillsData[5], skillsData[6], skillsData[12]],
    accentColor: '#f59e0b',       // amber
    siteUrl: 'https://yoursite.com',
    repoUrl: 'https://github.com/yourusername/project-three',
    screenshot: null,
  },
  {
    title: 'Project Four',
    description:
      'A brief description of what this project does, the problem it solves, and who it is for. Keep it to 2-3 sentences max.',
    tech: [skillsData[3], skillsData[4], skillsData[11]],
    accentColor: '#ec4899',       // pink
    siteUrl: 'https://yoursite.com',
    repoUrl: 'https://github.com/yourusername/project-four',
    screenshot: null,
  },
]