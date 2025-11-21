import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
};

export default function LazyImage({
  src,
  alt,
  className,
  ...props
}: LazyImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {/* Skeleton */}
      {loading && (
        <Skeleton className="aspect-square w-[120px] h-[120px] rounded-[4px]"></Skeleton>
      )}

      {/* Real image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          loading ? "opacity-0" : "opacity-100"
        } duration-300`}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </div>
  );
}
