export const getRoleFromAccessToken = (token: string): string | null => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload?.role || null;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};