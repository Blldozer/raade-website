import { injectContentsquareScript } from '@contentsquare/tag-sdk';

// Initialize Contentsquare with your site ID
export const initializeContentsquare = () => {
  injectContentsquareScript({
    siteId: "5361569",
    async: true, // Optional: Set to false to wait for script execution until after document parsing.
    defer: false // Optional: Set to true to defer script execution after document parsing.
  });
};
