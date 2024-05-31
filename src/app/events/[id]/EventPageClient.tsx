"use client";

import { CountdownEvent } from "@/app/typings";
import { useEffect, useState } from "react";

type EventPageClientProps = {
  event: CountdownEvent;
};

const EventPageClient: React.FC<EventPageClientProps> = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.startDate);
      const now = new Date();
      const timeDifference = eventDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        setTimeLeft(
          new Intl.RelativeTimeFormat(navigator.language).format(0, "second")
        );
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const createUnitFormatter = (unit: Intl.NumberFormatOptions["unit"]) =>
        new Intl.NumberFormat(navigator.language, {
          notation: "compact",
          style: "unit",
          unit,
          unitDisplay: "long",
        });

      const result = [];
      if (days) {
        result.push(createUnitFormatter("day").format(days));
      }
      if (hours || result.length) {
        result.push(createUnitFormatter("hour").format(hours));
      }
      if (minutes || result.length) {
        result.push(createUnitFormatter("minute").format(minutes));
      }
      result.push(createUnitFormatter("second").format(seconds));

      setTimeLeft(result.join(" "));
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval);
  }, [event.startDate]);

  return (
    <div>
      <p>Tijd over tot {event.name[0]?.text}: {timeLeft}</p>
    </div>
  );
};

export default EventPageClient;
