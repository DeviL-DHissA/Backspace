import { SocialLink } from '../types';

/**
 * Existing creator links carried forward from the BackSpace portfolio.
 */
export const personalSocialLinks: SocialLink[] = [
  {
    platform: "YouTube",
    label: "YouTube Channel",
    url: "https://www.youtube.com/@devil_dhissa",
    handle: "@devil_dhissa"
  },
  {
    platform: "guns.lol",
    label: "guns.lol Profile",
    url: "https://guns.lol/devil_dhissa",
    handle: "devil_dhissa"
  }
];

export const getActiveSocialLinks = (): (SocialLink & { url: string })[] => {
  return personalSocialLinks.filter((item): item is SocialLink & { url: string } => {
    return typeof item.url === 'string' && item.url.trim().length > 0 && !item.url.startsWith('#');
  });
};
