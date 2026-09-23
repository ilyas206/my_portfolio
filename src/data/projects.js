import { skillsData } from "./skills";
import project1 from '../assets/images/project1.png';
import project2 from '../assets/images/project2.png';
import project3 from '../assets/images/project3.png';

export const projectsData = [
  {
    title: 'Splentra | Expense Splitting',
    description:
      'Splentra is a full-stack expense splitting app that helps groups of people track shared costs and manage who owes what — without the mental overhead of manual calculations . It solves the common problem of splitting rent, travel, or daily expenses fairly among friends, roommates, or colleagues. Built for anyone who wants a clean, transparent way to stay on top of group finances.',
    tech: [skillsData[3], skillsData[6], skillsData[12], skillsData[4], skillsData[11]],
    accentColor: '#95e0ad',    
    demoVideo: '/videos/Splentra.mp4',
    repoUrl: 'https://github.com/ilyas206/Splentra-Expense-Splitting',
    screenshot: project1,    
  },
  {
    title: 'SIRAJ | Light of Guidance',
    description:
      'SIRAJ is a modern, multilingual Islamic guidance web app that helps users access important religious and spiritual resources in one place without the hassle of searching through multiple sources. It solves the common problem of finding clear, organized information about daily worship, fasting, Islamic names of Allah, and knowledge about notable scholars in a simple and engaging experience. Built for the Ummah, it offers a free, user-friendly platform that makes Islamic learning and daily guidance more accessible, meaningful, and easy to explore.',
    tech: [skillsData[3], skillsData[4], skillsData[11]],
    accentColor: '#94A3B8',    
    demoVideo: '/videos/SIRAJ.mp4',
    repoUrl: 'https://github.com/ilyas206/SIRAJ',
    screenshot: project2,    
  },
  {
    title: 'Tradezy | Multi-Vendor Marketplace',
    description:
      'Tradezy is a full-stack multi-vendor e-commerce platform connecting independent sellers with buyers in one marketplace. It solves the challenge of running a trustworthy, role-based commerce system — sellers apply and get admin-approved before selling, buyers browse and purchase with stock-safe checkout, and admins moderate the entire marketplace. Built for real-world scale: transactional order processing prevents overselling, per-seller order tracking handles multi-vendor carts, and built-in buyer-seller chat plus a complaint system keep every transaction accountable.',
    tech: [skillsData[3], skillsData[6], skillsData[12], skillsData[4], skillsData[11]],
    accentColor: '#4570a8',    
    demoVideo: '/videos/Tradezy.mp4',
    repoUrl: 'https://github.com/ilyas206/marketplace',
    screenshot: project3,    
  }
]