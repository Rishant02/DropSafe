import { convertFileSize } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import FormattedDateTime from "./FormattedDateTime";
import { UsageSummary } from "@/types";

const DashboardSummary = ({
  usageSummary,
}: {
  usageSummary: UsageSummary[];
}) => {
  return (
    <ul className="dashboard-summary-list">
      {usageSummary.map((summary) => (
        <Link
          href={summary.url}
          key={summary.title}
          className="dashboard-summary-card"
        >
          <div className="space-y-4">
            <div className="flex justify-between gap-3">
              <Image
                src={summary.icon}
                width={100}
                height={100}
                alt="uploaded image"
                className="summary-type-icon"
              />
              <h4 className="summary-type-size">
                {convertFileSize(summary.size) || 0}
              </h4>
            </div>
            <h5 className="summary-type-title">{summary.title}</h5>
            <Separator className="bg-light-400" />
            <FormattedDateTime
              date={summary.latestDate}
              className="text-center"
            />
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default DashboardSummary;