import { useState, useEffect } from 'react';

export const useDeadLine = () => {
    const [isDeadLine, setIsDeadLine] = useState(false);

    useEffect(() => {
        const limit = new Date("2026-11-15 00:00:00 GMT-3:00").getTime();

        const checkDeadline = () => {
            const now = new Date().getTime();
            if (now >= limit) {
                setIsDeadLine(true);
                return true;
            }
            return false;
        };

        const alreadyExpired = checkDeadline();

        let intervalId: NodeJS.Timeout;

        if (!alreadyExpired) {
            intervalId = setInterval(() => {
                const expired = checkDeadline();
                if (expired) {
                    clearInterval(intervalId);
                }
            }, 1000);
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                const expired = checkDeadline();
                if (expired && intervalId) {
                    clearInterval(intervalId);
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (intervalId) clearInterval(intervalId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return isDeadLine;
}