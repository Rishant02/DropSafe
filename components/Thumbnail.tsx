import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";

type Props = {
  type: string;
  ext: string;
  url?: string;
  imageClassName?: string;
  className?: string;
};

function ThumbnailIcon({ type, ext, imageClassName }: Props) {
  const Icon = getFileIcon(ext, type);
  return (
    <Icon
      width={100}
      height={100}
      aria-label="Thumbnail"
      className={cn("size-8 object-contain", imageClassName)}
    />
  );
}
const Thumbnail = ({
  type,
  ext,
  imageClassName,
  className,
  url = "",
}: Props) => {
  const isImage = type === "image" && ext !== "svg";
  return (
    <figure className={cn("thumbnail", className)}>
      {isImage ? (
        <Image
          src={url}
          alt="Thumbnail"
          width={100}
          height={100}
          className={cn(
            "size-8 object-contain",
            imageClassName,
            isImage && "thumbnail-image"
          )}
        />
      ) : (
        <ThumbnailIcon type={type} ext={ext} imageClassName={imageClassName} />
      )}
    </figure>
  );
};

export default Thumbnail;
