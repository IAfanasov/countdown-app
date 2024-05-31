import { notFound } from "next/navigation";
import EventPageClient from "./EventPageClient";
import { CountdownEvent } from "@/app/typings";
import { getEventsData } from "../../getEventsData";

export async function generateStaticParams() {
  const events: CountdownEvent[] = getEventsData();
  return events.map((event) => ({
    id: event.id,
  }));
}

type EventPageProps = {
  params: { id: string };
};

const EventPage = ({ params }: EventPageProps) => {
  const events: CountdownEvent[] = getEventsData();
  const event = events.find((event) => event.id === params.id);

  if (!event) {
    notFound();
  }

  return <EventPageClient event={event} />;
};

export default EventPage;
