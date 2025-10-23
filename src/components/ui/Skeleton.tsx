import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Skeleton = ({
  className,
  isLoading = true,
  children,
  ...props
}: SkeletonProps) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-neutral-300',
        className
      )}
      {...props}
    />
  );
};

export { Skeleton };
