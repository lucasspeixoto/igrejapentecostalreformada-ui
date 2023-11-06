type LoaderProgressProps = {
  percent: number;
};

const LoaderProgress: React.FC<LoaderProgressProps> = ({ percent }) => {
  return (
    <>
      <div className="z-10 flex h-full flex-col items-center justify-center bg-white opacity-20">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        <span className="font-bold">{percent} %</span>
      </div>
    </>
  );
};

export default LoaderProgress;
