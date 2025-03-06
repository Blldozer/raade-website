
import { Card, CardContent } from "@/components/ui/card";

interface ProjectOutcomesProps {
  outcomes: string[];
}

const ProjectOutcomes = ({ outcomes }: ProjectOutcomesProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-simula text-white mb-6">Outcomes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outcomes.map((outcome, index) => (
          <Card key={index} className="border-none shadow-md bg-[#1a1a1a] hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-[#FBB03B] text-xl font-bold mb-2">0{index + 1}</div>
              <p className="font-lora text-gray-200">{outcome}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectOutcomes;
