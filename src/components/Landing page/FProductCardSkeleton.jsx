const FProductCardSkeleton = () => (
  <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60  shadow min-w-0 w-full h-full p-2 sm:p-3 lg:p-4 animate-pulse">
    <div className="bg-slate-100 dark:bg-slate-700/50 w-full aspect-[1/1] max-h-28 sm:max-h-40 lg:max-h-56 flex items-center justify-center">
      <div className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
    <div className="flex flex-1 flex-col space-y-1 p-2 sm:p-3 lg:p-4">
      <div className="h-4 sm:h-5 lg:h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-1" />
      <div className="h-3 sm:h-4 lg:h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-1" />
      <div className="flex items-center justify-between">
        <div className="h-4 sm:h-5 lg:h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
        <div className="h-3 sm:h-4 lg:h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/6" />
      </div>
    </div>
    <div className="p-2 pt-0 mt-auto">
      <div className="h-7 sm:h-8 lg:h-10 w-full rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  </div>
);

export default FProductCardSkeleton;