
export const getValidUserId = () => {
    const stored = localStorage.getItem('userId');
    if(!stored) return null;
    try{
        const parsed = JSON.parse(stored);
        if (Date.now()> parsed.expiry) {
            localStorage.clear();
            return null;
        }
        return parsed.value;
    }catch{
        localStorage.clear();
        return null;
    }
}
