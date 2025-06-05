import React from "react";

const Pagination = ({
    page = 1,
    totalPages = 1,
    hasPrevPage = false,
    hasNextPage = false,
    prevPage = null,
    nextPage = null,
    onPageChange = () => {},
}) => {
    // For mobile: show up to 3 page numbers, centered on current page
    const getMobilePages = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (page === 1) return [1, 2, 3];
        if (page === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
        return [page - 1, page, page + 1];
    };

    // For desktop: your existing logic
    const getDesktopPages = () => {
        const pageNumbers = [];
        const maxPagesToShowInMiddle = 3;
        const ellipsis = "...";
        pageNumbers.push(1);

        if (totalPages <= (1 + maxPagesToShowInMiddle + 1 + 2)) {
            for (let i = 2; i < totalPages; i++) pageNumbers.push(i);
        } else {
            const leftBoundary = page - Math.floor(maxPagesToShowInMiddle / 2);
            const rightBoundary = page + Math.floor(maxPagesToShowInMiddle / 2);

            let startPage = Math.max(2, leftBoundary);
            let endPage = Math.min(totalPages - 1, rightBoundary);

            if (page - 1 <= Math.floor(maxPagesToShowInMiddle / 2) + 1) {
                endPage = Math.min(totalPages - 1, 1 + maxPagesToShowInMiddle + (totalPages > 1 + maxPagesToShowInMiddle + 1 ? 1 : 0));
            }
            if (totalPages - page <= Math.floor(maxPagesToShowInMiddle / 2) + 1) {
                startPage = Math.max(2, totalPages - maxPagesToShowInMiddle - (totalPages > 1 + maxPagesToShowInMiddle + 1 ? 1 : 0));
            }

            if (startPage > 2) pageNumbers.push(ellipsis);
            for (let i = startPage; i <= endPage; i++) {
                if (i !== 1 && i !== totalPages) pageNumbers.push(i);
            }
            if (endPage < totalPages - 1) pageNumbers.push(ellipsis);
        }
        if (totalPages > 1) pageNumbers.push(totalPages);
        return [...new Set(pageNumbers)];
    };

    // Button style helpers
    const circleBase = "w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150";
    const circleActive = "bg-blue-600 text-white font-bold shadow";
    const circleInactive = "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600";
    const circleEllipsis = "px-2 py-1 text-gray-400 dark:text-gray-500 select-none";

    return (
        <nav
            className="flex flex-col sm:flex-row items-center justify-between custom-glass-5 rounded-full px-4 py-3 sm:px-6 my-6 "
            aria-label="Pagination"
        >
            {/* Pagination controls */}
            <div className="flex flex-1 justify-center sm:justify-end items-center gap-1 w-full">
                {/* Previous */}
                <button
                    type="button"
                    onClick={() => hasPrevPage && onPageChange(prevPage)}
                    disabled={!hasPrevPage}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150 ${!hasPrevPage
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600"
                    }`}
                    aria-label="Previous Page"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Mobile: 3 circle buttons with ellipsis if needed */}
                <div className="flex sm:hidden items-center gap-1">
                    {/* Show first page if not in range */}
                    {getMobilePages()[0] > 1 && (
                        <>
                            <button
                                type="button"
                                key={1}
                                onClick={() => onPageChange(1)}
                                className={`${circleBase} ${1 === page ? circleActive : circleInactive}`}
                                aria-current={1 === page ? "page" : undefined}
                                aria-label={`Page 1`}
                            >
                                1
                            </button>
                            {getMobilePages()[0] > 2 && (
                                <span className={circleEllipsis}>...</span>
                            )}
                        </>
                    )}
                    {/* Render main mobile pages */}
                    {getMobilePages().map((p) => (
                        <button
                            type="button"
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`${circleBase} ${p === page ? circleActive : circleInactive}`}
                            aria-current={p === page ? "page" : undefined}
                            aria-label={`Page ${p}`}
                        >
                            {p}
                        </button>
                    ))}
                    {/* Show last page if not in range */}
                    {getMobilePages()[2] < totalPages && (
                        <>
                            {getMobilePages()[2] < totalPages - 1 && (
                                <span className={circleEllipsis}>...</span>
                            )}
                            <button
                                type="button"
                                key={totalPages}
                                onClick={() => onPageChange(totalPages)}
                                className={`${circleBase} ${totalPages === page ? circleActive : circleInactive}`}
                                aria-current={totalPages === page ? "page" : undefined}
                                aria-label={`Page ${totalPages}`}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>

                {/* Desktop: full pagination */}
                <div className="hidden sm:flex items-center gap-1">
                    {getDesktopPages().map((p, index) =>
                        typeof p === "string" ? (
                            <span
                                key={`${p}-${index}`}
                                className={circleEllipsis}
                            >
                                {p}
                            </span>
                        ) : (
                            <button
                                type="button"
                                key={`${p}-${index}`}
                                onClick={() => onPageChange(p)}
                                className={`${circleBase} ${p === page ? circleActive : circleInactive}`}
                                aria-current={p === page ? "page" : undefined}
                                aria-label={`Page ${p}`}
                            >
                                {p}
                            </button>
                        )
                    )}
                </div>

                {/* Next */}
                <button
                    type="button"
                    onClick={() => hasNextPage && onPageChange(nextPage)}
                    disabled={!hasNextPage}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150 ${!hasNextPage
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600"
                    }`}
                    aria-label="Next Page"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
