import { Navigation } from "@/components/Navigation";
import CropRecommendation from "@/components/CropRecommendation";

const CropRecommendationPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <CropRecommendation />
      </div>
    </div>
  );
};

export default CropRecommendationPage;