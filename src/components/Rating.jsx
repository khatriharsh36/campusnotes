import { useState } from "react";

export default function Rating({ value, onRate, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= display ? "filled" : ""} ${!readonly ? "interactive" : ""}`}
            onClick={() => !readonly && onRate && onRate(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-value">{Number(value).toFixed(1)}</span>
    </div>
  );
}
