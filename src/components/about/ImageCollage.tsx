
import { motion } from "framer-motion";

type ImageCollageProps = {
  images: string[];
  variant?: "africa" | "grid" | "scattered";
  className?: string;
};

const ImageCollage = ({ images, variant = "grid", className = "" }: ImageCollageProps) => {
  const getLayout = () => {
    switch (variant) {
      case "africa":
        return "grid grid-cols-3 gap-2 transform rotate-3";
      case "scattered":
        return "grid grid-cols-2 md:grid-cols-3 gap-3 relative";
      case "grid":
      default:
        return "grid grid-cols-2 md:grid-cols-3 gap-2";
    }
  };

  return (
    <div className={`${getLayout()} ${className}`}>
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, rotate: variant === "scattered" ? Math.random() * 10 - 5 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5
          }}
          className={`overflow-hidden rounded-lg shadow-md ${
            variant === "scattered" 
              ? `transform ${index % 2 === 0 ? "rotate-2" : "-rotate-3"}`
              : ""
          }`}
        >
          <img
            src={src}
            alt="RAADE collage"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageCollage;
