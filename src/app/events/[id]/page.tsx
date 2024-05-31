import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';
import EventPageClient from './EventPageClient';

type Event = {
  id: string;
  name: string;
  date: string;
};

const getEventsData = () => {
  const filePath = path.join(process.cwd(), 'src/data/events.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
};

export async function generateStaticParams() {
  const events: Event[] = getEventsData();
  return events.map(event => ({
    id: event.id,
  }));
}

type EventPageProps = {
  params: { id: string };
};

const EventPage = ({ params }: EventPageProps) => {
  const events: Event[] = getEventsData();
  const event = events.find(event => event.id === params.id);

  if (!event) {
    notFound();
  }

  return <EventPageClient event={event} />;
};

export default EventPage;
