import React, { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  dateid?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  onBlur?: (date: Date | null) => void;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  dateid,
  value,
  onChange,
  onBlur,
  required,
}) => {
  const today = new Date();

  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2000");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const lastPropValue = useRef("");

  /* ---------------------------------------------------------
     SYNC FROM PARENT VALUE
  --------------------------------------------------------- */
  useEffect(() => {
    if (value) {
      const iso = value.toISOString();
      if (iso !== lastPropValue.current) {
        lastPropValue.current = iso;

        const d = value.getDate().toString().padStart(2, "0");
        const m = (value.getMonth() + 1).toString().padStart(2, "0");
        const y = value.getFullYear().toString();

        setDay(d);
        setMonth(m);
        setYear(y);
      }
    }
  }, [value]);

  useEffect(() => {
    if (day && month && year) {
      tryEmitChange(day, month, year);
    }
  }, [day, month, year]);
  /* ---------------------------------------------------------
     UTILITIES
  --------------------------------------------------------- */
  const forceSelect = (ref: React.RefObject<HTMLInputElement>) => {
    setTimeout(() => {
      ref.current?.setSelectionRange(
        0,
        ref.current.value.length
      );
    }, 0);
  };

  const getDaysInMonth = (m: number, y: number) =>
    new Date(y, m, 0).getDate();

  const isComplete = (d: string, m: string, y: string) =>
    d.length === 2 && m.length === 2 && y.length === 4;

  const tryEmitChange = (d: string, m: string, y: string) => {
    if (!isComplete(d, m, y)) return;

    const parsed = new Date(`${y}-${m}-${d}`);
    if (!isNaN(parsed.getTime())) {
      lastPropValue.current = parsed.toISOString();
      onChange?.(parsed);
    }
  };

  /* ---------------------------------------------------------
     WRAPPER BLUR → FINAL VALIDATION
  --------------------------------------------------------- */
  const handleWrapperBlur = (
    e: React.FocusEvent<HTMLDivElement>
  ) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      if (!isComplete(day, month, year)) {
        onBlur?.(null);
        return;
      }
      const parsed = new Date(`${year}-${month}-${day}`);
      onBlur?.(!isNaN(parsed.getTime()) ? parsed : null);
    }
  };

  /* ---------------------------------------------------------
     INPUT BLUR FALLBACK (EMPTY → TODAY)
  --------------------------------------------------------- */
  const handleFieldBlur = (field: "day" | "month" | "year") => {
    if (field === "day") {
      if (day.length === 1) {
        const d = day.padStart(2, "0");
        setDay(d);
        tryEmitChange(d, month, year);
      } else if (!day) {
        const d = today.getDate().toString().padStart(2, "0");
        setDay(d);
        tryEmitChange(d, month, year);
      }
    }

    if (field === "month") {
      if (month.length === 1) {
        const m = month.padStart(2, "0");
        setMonth(m);
        tryEmitChange(day, m, year);
      } else if (!month) {
        const m = (today.getMonth() + 1).toString().padStart(2, "0");
        setMonth(m);
        tryEmitChange(day, m, year);
      }
    }

    if (field === "year") {
      if (!year) {
        const y = today.getFullYear().toString();
        setYear(y);
        tryEmitChange(day, month, y);
      }
    }
  };


  /* ---------------------------------------------------------
     KEYBOARD ARROWS → NAVIGATE FIELDS
  --------------------------------------------------------- */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "day" | "month" | "year"
  ) => {
    if (e.key === "ArrowRight") {
      if (field === "day") {
        monthRef.current?.focus();
        forceSelect(monthRef);
      } else if (field === "month") {
        yearRef.current?.focus();
        forceSelect(yearRef);
      }
    }

    if (e.key === "ArrowLeft") {
      if (field === "year") {
        monthRef.current?.focus();
        forceSelect(monthRef);
      } else if (field === "month") {
        dayRef.current?.focus();
        forceSelect(dayRef);
      }
    }
  };

  /* ---------------------------------------------------------
     COMPONENT UI
  --------------------------------------------------------- */
  return (
    <div
      ref={wrapperRef}
      tabIndex={-1}
      onBlur={handleWrapperBlur}
      className="flex gap-1 p-2 border border-gray-300 rounded-md 
                 focus-within:border-blue-500"
    >
      {/* DAY */}
      <input
        ref={dayRef}
        type="text"
        id={dateid}
        value={day}
        placeholder="dd"
        required={required}
        className="w-10 text-center outline-none"
        onFocus={() => forceSelect(dayRef)}
        onKeyDown={(e) => handleKeyDown(e, "day")}
        onBlur={() => handleFieldBlur("day")}
        onChange={(e) => {
          let v = e.target.value.replace(/\D/g, "").slice(0, 2);

          const max = getDaysInMonth(
            Number(month) || today.getMonth() + 1,
            Number(year) || today.getFullYear()
          );
          if (Number(v) > max)
            v = max.toString().padStart(2, "0");

          setDay(v);
          tryEmitChange(v, month, year);
        }}
      />

      <span>-</span>

      {/* MONTH */}
      <input
        ref={monthRef}
        type="text"
        value={month}
        placeholder="mm"
        required={required}
        className="w-10 text-center outline-none"
        onFocus={() => forceSelect(monthRef)}
        onKeyDown={(e) => handleKeyDown(e, "month")}
        onBlur={() => handleFieldBlur("month")}
        onChange={(e) => {
          let v = e.target.value.replace(/\D/g, "").slice(0, 2);
          if (Number(v) > 12) v = "12";

          setMonth(v);
          tryEmitChange(day, v, year);
        }}
      />

      <span>-</span>

      {/* YEAR */}
      <input
        ref={yearRef}
        type="text"
        value={year}
        placeholder="yyyy"
        required={required}
        className="w-16 text-center outline-none"
        onFocus={() => forceSelect(yearRef)}
        onKeyDown={(e) => handleKeyDown(e, "year")}
        onBlur={() => handleFieldBlur("year")}
        onChange={(e) => {
          const v = e.target.value
            .replace(/\D/g, "")
            .slice(0, 4);

          setYear(v);
          tryEmitChange(day, month, v);
        }}
      />
    </div>
  );
};

export default DatePicker;
