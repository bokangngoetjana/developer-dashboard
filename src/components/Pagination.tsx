import React from "react";

interface PaginationProps{
    page: number;
    onPrev: () => void;
    onNext: () => void;
}
const Pagination: React.FC<PaginationProps> = ({ page, onPrev, onNext }) => {
    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={onPrev}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-lg">Page {page}</span>
            <button
                onClick={onNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Next
            </button>
        </div>
    );
}
export default Pagination;