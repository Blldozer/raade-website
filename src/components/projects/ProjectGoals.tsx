
import { CheckSquare } from "lucide-react";

interface ProjectGoalsProps {
  goals: string[];
}

const ProjectGoals = ({ goals }: ProjectGoalsProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-simula text-white mb-6">Project Goals</h2>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="flex items-start">
            <CheckSquare className="h-6 w-6 text-[#FBB03B] mr-3 mt-1 flex-shrink-0" />
            <p className="text-lg font-lora text-gray-200">{goal}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGoals;
