import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

const RecentFiles = ({
  files,
}: {
  files: Models.DocumentList<Models.Document>;
}) => {
  return (
    <>
      <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
      {files.total > 0 ? (
        <ul className="mt-5 flex flex-col gap-5 bg-white p-3 rounded-[20px]">
          {files.documents.map((file) => (
            <Link
              href={file.url}
              key={file.$id}
              target="_blank"
              className="flex items-center gap-3"
            >
              <Thumbnail type={file.type} ext={file.extension} url={file.url} />
              <div className="recent-file-details">
                <div className="flex flex-col gap-1">
                  <p className="recent-file-name">{file.name}</p>
                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption"
                  />
                </div>
                <ActionDropdown file={file} />
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </>
  );
};

export default RecentFiles;
