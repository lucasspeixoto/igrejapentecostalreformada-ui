const Loading = () => {
  return (
    <div className="bg-slate-500 z-20 flex h-screen items-center justify-center opacity-65">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loading;
