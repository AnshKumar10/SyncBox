export default function Loading() {
  return (
    <div className="container mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8">
      <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
        <div className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 md:min-h-[400px] p-6">
          <div className="space-y-3">
            <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="flex items-center justify-center h-[300px]">
              <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 md:min-h-[400px] p-6">
          <div className="space-y-6">
            <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3 lg:p-4 border bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-600 animate-pulse" />
                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                  </div>
                  <div className="w-24 h-4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded mb-4" />
                  <div className="w-full h-px bg-gray-200 dark:bg-gray-600" />
                  <div className="w-20 h-3 bg-gray-200 dark:bg-gray-600 animate-pulse rounded mt-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 p-6">
        <div className="space-y-6">
          <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          <div className="space-y-3 lg:space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 lg:p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-600 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="w-48 h-4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                  <div className="w-32 h-3 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
