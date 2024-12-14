import { Session } from '../../types/session';
import './circuitInfo.css';

interface CircuitInfoProps {
    session: Session;
}

const CircuitInfo = ({ session }: CircuitInfoProps) => {
    return (
        <div className="circuit-info">
            <h1>{session.location}</h1>
            <h3>
                {session.sessionTitle} - {session.year}
            </h3>
        </div>
    );
};

export default CircuitInfo;
