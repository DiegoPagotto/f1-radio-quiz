export interface Session {
    sessionKey: string;
    year: number;
    location: string;
    sessionTitle: string;
}

export interface SessionResponse {
    session_key: string;
    year: number;
    location: string;
    session_title: string;
}
