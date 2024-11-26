import { Session } from '../../types/session';

interface CircuitInfoProps {
    session: Session;
}

const CircuitInfo = ({ session }: CircuitInfoProps) => {
    console.log(session);
    return (
        <div>
            <h1>{session.location}</h1>
            <h3>{session.sessionTitle}</h3>
            <h3>{session.year}</h3>
        </div>
    );
};

export default CircuitInfo;
