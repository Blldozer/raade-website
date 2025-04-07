import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PartnerCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-16 text-center"
    >
      <p className="text-lg text-[#274675]/80 mb-4 font-lora">
        Have a challenge that needs solving? Partner with RAADE.
      </p>
      <Link to="/apply/partner">
        <Button variant="outline" className="border-[#274675] text-[#274675] hover:bg-[#274675] hover:text-white">
          Submit Your Challenge <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default PartnerCTA;