import { CWRLink } from '../types';

/**
 * Verified official destinations for CWR Network.
 */
export const cwrNetworkConfig = {
  networkName: "CWR Network",
  dhissaRole: "CWR MC Staff Manager",
  departments: [
    "Staff Coordination & Onboarding",
    "Community Support & Ticket Management",
    "Minecraft Server Maintenance & Tick Rate",
    "Custom Server Features & Gameplay Systems"
  ],
  links: [
    {
      platform: "Website",
      label: "Official CWR Website",
      url: "https://cwresports.lk/"
    },
    {
      platform: "Minecraft Server",
      label: "mc.cwresports.lk",
      url: "https://mc.cwresports.lk/"
    },
    {
      platform: "Discord",
      label: "CWR Community Discord",
      url: "https://discord.cwresports.lk/"
    }
  ] as CWRLink[]
};

export const getActiveCWRLinks = (): (CWRLink & { url: string })[] => {
  return cwrNetworkConfig.links.filter((item): item is CWRLink & { url: string } => {
    return typeof item.url === 'string' && item.url.trim().length > 0 && !item.url.startsWith('#');
  });
};
