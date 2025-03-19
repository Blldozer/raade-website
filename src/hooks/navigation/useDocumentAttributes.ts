
import { useEffect } from 'react';

interface UseDocumentAttributesProps {
  attributeName: string;
  attributeValue: string;
  shouldApply: boolean;
  cleanup?: boolean;
}

/**
 * Hook to manage document/body attributes
 * Handles setting and cleaning up attributes on the document body
 * 
 * @param attributeName - The name of the attribute to manage
 * @param attributeValue - The value to set for the attribute
 * @param shouldApply - Whether the attribute should be applied
 * @param cleanup - Whether to clean up the attribute on unmount
 */
export const useDocumentAttributes = ({
  attributeName,
  attributeValue,
  shouldApply,
  cleanup = true
}: UseDocumentAttributesProps) => {
  useEffect(() => {
    if (shouldApply) {
      document.body.setAttribute(attributeName, attributeValue);
      console.log(`useDocumentAttributes: Set ${attributeName}="${attributeValue}"`);
    }
    
    return () => {
      if (cleanup && shouldApply) {
        document.body.removeAttribute(attributeName);
        console.log(`useDocumentAttributes: Cleaned up ${attributeName} attribute`);
      }
    };
  }, [attributeName, attributeValue, shouldApply, cleanup]);
};
