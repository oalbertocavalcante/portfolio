import type { ImageMetadata } from 'astro';
import profile from '@/assets/images/profile.webp';
import personalPortfolio from '@/assets/images/projects/personal-portfolio.webp';
import reportAutomation from '@/assets/images/projects/report-automation.webp';
import taskApi from '@/assets/images/projects/task-api.webp';
import vulnerabilityScanner from '@/assets/images/projects/vulnerability-scanner.webp';

const projects: Record<string, ImageMetadata> = {
  'personal-portfolio': personalPortfolio,
  'task-api': taskApi,
  'vulnerability-scanner': vulnerabilityScanner,
  'report-automation': reportAutomation,
};

export const media = {
  profile,
  projects,
};
