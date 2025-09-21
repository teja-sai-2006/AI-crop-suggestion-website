import { Navigation } from "@/components/Navigation";
import DiseaseDetection from "@/components/DiseaseDetection";

const DiseaseDetectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <DiseaseDetection />
      </div>
    </div>
  );
};

export default DiseaseDetectionPage;