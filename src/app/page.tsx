import Link from 'next/link';
import events from '../data/events.json';

type Event = {
  id: string;
  name: string;
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Events Countdown</h1>
      <ul>
        {events.map((event: Event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
