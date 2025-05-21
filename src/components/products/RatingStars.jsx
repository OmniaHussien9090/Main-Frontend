const RatingStars = ({ averageRating, maxRating = 13 }) => {
  // تحويل التقييم من 0-maxRating إلى 0-5
  const ratingOutOfFive = (averageRating / maxRating) * 5;
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        // تحديد نوع النجمة: full, half, empty
        let fillColor = "#d1d5db"; // رمادي افتراضي

        if (ratingOutOfFive >= star) {
          // نجمة كاملة
          fillColor = "#fbbf24";
        } else if (ratingOutOfFive >= star - 0.5) {
          // نجمة نصفية
          fillColor = "url(#halfGradient)";
        }

        return (
          <svg
            key={star}
            className="w-4 h-4"
            fill={fillColor === "url(#halfGradient)" ? "url(#halfGradient)" : fillColor}
            stroke={fillColor === "#d1d5db" ? "#d1d5db" : "#fbbf24"}
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default RatingStars;
