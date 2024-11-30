import Image from "next/image";
import Link from "next/link";
import { Chart } from "@/components/Chart";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Separator } from "@/components/ui/separator";
import { getFiles, getSpaceUsed } from "@/lib/actions/file.action";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import DashboardSummary from "@/components/DashboardSummary";
import RecentFiles from "@/components/RecentFiles";

const Home = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getSpaceUsed(),
  ]);
  const usageSummary = getUsageSummary(totalSpace);
  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />
        <DashboardSummary usageSummary={usageSummary} />
      </section>
      <section>
        <RecentFiles files={files} />
      </section>
    </div>
  );
};

export default Home;
