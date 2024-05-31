import Link from "next/link";
import { getEventsData } from "./getEventsData";

const Home: React.FC = () => {
  const events = getEventsData();
  return (
    <div>
      <h1>Kies een evenement</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>{event.name[0]?.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
