import { Navigation } from "@/components/Navigation";
import { FarmRecords } from "@/components/FarmRecords";

const FarmRecordsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <FarmRecords />
      </div>
    </div>
  );
};

export default FarmRecordsPage;


