export default function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-800 shadow-sm animate-pulse">
      {}
      <div className="aspect-[2/3] bg-gray-700 w-full"></div>

      {}
      <div className="p-4 space-y-3">
        {}
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-5 bg-gray-700 rounded w-1/2"></div>

        {}
        <div className="flex justify-between pt-2">
          <div className="h-4 bg-gray-700 rounded w-12"></div>
          <div className="h-4 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
