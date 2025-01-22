import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeBackground, loadImage } from "@/utils/imageUtils";
import { useToast } from "@/components/ui/use-toast";

const NavLogo = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("/lovable-uploads/5f474a9c-ca13-4875-b29c-a91ae8f15738.png");
  const { toast } = useToast();

  useEffect(() => {
    const processImage = async () => {
      try {
        console.log('Starting logo processing...');
        // Fetch the original image
        const response = await fetch("/lovable-uploads/5f474a9c-ca13-4875-b29c-a91ae8f15738.png");
        const blob = await response.blob();
        
        // Load the image
        const img = await loadImage(blob);
        
        // Remove the background
        const processedBlob = await removeBackground(img);
        
        // Create URL for the processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(processedUrl);
        
        console.log('Logo processing completed successfully');
        toast({
          title: "Logo processed",
          description: "Background has been removed from the logo.",
        });
      } catch (error) {
        console.error('Error processing logo:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to process the logo. Using original image.",
        });
      }
    };

    processImage();
    
    // Cleanup function to revoke object URL
    return () => {
      if (processedImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, []);

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img
          className="h-12 w-auto"
          src={processedImageUrl}
          alt="RAADE Logo"
        />
      </Link>
    </div>
  );
};

export default NavLogo;