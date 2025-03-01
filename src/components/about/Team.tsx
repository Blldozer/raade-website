
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Kene Onubogu", position: "Founder & Co-executive Director" },
  { name: "Ife Idakolo", position: "Co-founder and Co-executive Director" },
  { name: "Precious Akinrinmade", position: "Innovation Studio Director" },
  { name: "Hawa Diallo", position: "Innovation Studio Head Officer" },
  { name: "Eshe Lovely", position: "Innovation Studio Officer" },
  { name: "Denise Lundu", position: "Innovation Studio Officer" },
  { name: "Favour Williams", position: "Outreach Director" },
  { name: "Nma Moghalu", position: "Outreach Officer" },
  { name: "Kamji Mbakwe", position: "Outreach Officer" },
  { name: "Alexander Jamu", position: "Creative Design, Branding and Marketing Director" },
  { name: "Djenabou Boakum", position: "Creative Design, Branding and Marketing Officer" },
  { name: "Ama Imoyo", position: "Finance Officer" },
  { name: "Temilade Oluwasesin", position: "Logistics Manager" },
  { name: "Rose Oyoo", position: "Logistics Manager" },
  { name: "Kene Okereke", position: "Tech Officer" }
];

const Team = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section - 39/61 split */}
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

        {/* Subtitle Section - 39/61 split */}
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
              Our community of doers
            </p>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[#3C403A] rounded-lg" />
              <div className="relative z-10">
                <div className="rounded-t-lg overflow-hidden">
                  <img 
                    src={`/raade-individual-e-board-photos/${member.name.split(" ").join("-")}-raade-website-image.jpg`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-5xl font-simula text-white mb-4">
                    {member.name}
                  </h3>
                  <p className="text-2xl text-gray-300 font-lora">
                    {member.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
