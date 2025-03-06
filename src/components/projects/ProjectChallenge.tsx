
interface ProjectChallengeProps {
  challenge: string;
}

const ProjectChallenge = ({ challenge }: ProjectChallengeProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-simula text-white mb-6">Challenge</h2>
      <div className="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333] mb-8">
        <p className="text-xl leading-relaxed font-lora text-gray-100">
          {challenge}
        </p>
      </div>
    </section>
  );
};

export default ProjectChallenge;
