const useLocalStorage = () => {

    const handleLocalStorage = () => {
        if (typeof window !== "undefined") {
            let teams = localStorage.getItem('teams');
            if (teams != null) {
                teams = JSON.parse(teams);
            }
        }
    }

    return { handleLocalStorage }
};

export default useLocalStorage;