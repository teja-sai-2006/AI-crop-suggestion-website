import { Navigation } from "@/components/Navigation";
import { ExpertConsultation } from "@/components/ExpertConsultation";

const ExpertCallPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <ExpertConsultation />
      </div>
    </div>
  );
};

export default ExpertCallPage;


