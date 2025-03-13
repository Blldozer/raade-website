import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const teamMembers = [
  {
    name: "Kene Onubogu",
    classYear: "'25",
    position: "Co-founder & Co-executive Director",
    linkedin: "https://www.linkedin.com/in/kenerice/"
  }, {
    name: "Ife Idakolo",
    classYear: "'26",
    position: "Co-founder & Co-executive Director",
    linkedin: "https://www.linkedin.com/in/ifeoluwaidakolo/"
  }, {
    name: "Precious Akinrinmade",
    classYear: "'25",
    position: "Innovation Studio Director",
    linkedin: "https://www.linkedin.com/in/precious-akinrinmade/"
  }, {
    name: "Hawa Diallo",
    classYear: "'25",
    position: "Innovation Studio Head Officer"
  }, {
    name: "Eshe Lovely",
    classYear: "'26",
    position: "Innovation Studio Officer",
    linkedin: "https://www.linkedin.com/in/eshelovely/"
  }, {
    name: "Denise Lundu",
    classYear: "'27",
    position: "Innovation Studio Officer"
  }, {
    name: "Favour Williams",
    classYear: "'25",
    position: "Outreach Director",
    linkedin: "https://www.linkedin.com/in/favour-williams/"
  }, {
    name: "Nma Moghalu",
    classYear: "'28",
    position: "Outreach Officer",
    linkedin: "https://www.linkedin.com/in/nmamoghalu/"
  }, {
    name: "Kamji Mbakwe",
    classYear: "'28",
    position: "Outreach Officer",
    linkedin: "https://www.linkedin.com/in/kamji-mbakwe-3ab417256/"
  }, {
    name: "Alexander Jamu",
    classYear: "'26",
    position: "Creative Design, Branding and Marketing Director"
  }, {
    name: "Djenabou Boakum",
    classYear: "'28",
    position: "Creative Design, Branding and Marketing Officer"
  }, {
    name: "Ama Imoyo",
    classYear: "'28",
    position: "Finance Officer"
  }, {
    name: "Temilade Oluwasesin",
    classYear: "'26",
    position: "Logistics Manager",
    linkedin: "https://www.linkedin.com/in/temilade-oluwasesin-521979227/"
  }, {
    name: "Rose Oyoo",
    classYear: "'26",
    position: "Logistics Manager",
    linkedin: "https://www.linkedin.com/in/rose-oyoo/"
  }, {
    name: "Kene Okereke",
    classYear: "'28",
    position: "Tech Officer",
    linkedin: "https://www.linkedin.com/in/kenechukwu-okereke/"
  }
];

const Team = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 80,
        duration: 0.6
      }
    }
  };

  const photoAnimation = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({
      ...prev,
      [name]: true
    }));
  };

  return (
    <section id="team" className="py-24 bg-white" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula">
              Meet the <span className="font-['Simula_Book_Italic']">team</span>
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div>
        </div>

        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%]"></div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="w-full lg:w-[61%] mt-8 lg:mt-0"
          >
            <p className="text-xl font-lora text-gray-700 leading-relaxed">
              Meet the visionaries who refused to wait for change. Driven by deep conviction and extraordinary determination, our team transforms challenges into opportunities through sheer force of will. We're not just talking about African development - we're dedicating our minds, hearts, and hands to making it happen, one breakthrough solution at a time.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name} 
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              layoutId={`team-member-${index}`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[#3C403A] rounded-lg" />
              <div className="relative z-10">
                <motion.div 
                  className="rounded-t-lg overflow-hidden"
                  variants={photoAnimation}
                >
                  {!imageErrors[member.name] ? (
                    <motion.img
                      src={`/raade-individual-e-board-photos-webp/${member.name.split(" ").join("-")}-raade-website-image.webp`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      loading="lazy"
                      whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
                      onError={() => handleImageError(member.name)}
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-[#4C504A] flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {member.name.split(" ")[0][0]}{member.name.split(" ")[1]?.[0] || ''}
                      </span>
                    </div>
                  )}
                </motion.div>
                <motion.div 
                  className="p-8"
                  variants={textAnimation}
                >
                  {member.linkedin ? (
                    <h3 className="text-5xl font-simula text-white mb-2 flex items-center gap-3">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#FBB03B] transition-colors flex items-center gap-2"
                      >
                        {member.name} <Linkedin className="w-8 h-8 inline text-[#FBB03B]" />
                      </a>
                    </h3>
                  ) : (
                    <h3 className="text-5xl font-simula text-white mb-2">
                      {member.name}
                    </h3>
                  )}
                  <p className="text-2xl text-gray-300 font-lora">
                    {member.position}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
