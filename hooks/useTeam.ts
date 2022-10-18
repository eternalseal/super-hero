import HeroModel from '../model/Hero.model';

const useTeam = () => {

    let allTeams: HeroModel[] = [];

    if (typeof window !== "undefined") {
        allTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    }

    /**
     * @returns {HeroModel[]}
     * @description Get all teams from local storage that user has selected as their team.
     */
    const getAllTeams = (): HeroModel[] => {
        if (typeof window !== "undefined") {
            let teams = JSON.parse(localStorage.getItem('teams') || '[]') as HeroModel[]

            return teams
        }

        return []
    }

    /**
     * @params {HeroModel}
     * @description Store a hero in the local storage as a team member
     */
    const addMemberToTeam = (hero: HeroModel): void => {

        if (typeof window !== "undefined") {
            let teams = JSON.parse(localStorage.getItem('teams') || '[]')

            teams.push(hero)
            localStorage.setItem('teams', JSON.stringify(teams))
        }
    }

    /**
     * @params {HeroModel}
     * @description Remove a hero from the local storage
     */
    const removeMemberFromTeam = (hero: HeroModel): void => {

        if (typeof window !== "undefined") {
            let teams = JSON.parse(localStorage.getItem('teams') || '[]')

            teams.forEach((team: HeroModel, index: number) => { 
                if(team.id == hero.id){
                    teams.splice(index, 1)
                }
            })
            
            localStorage.setItem('teams', JSON.stringify(teams))
        }
    }

    /**
    * @params {HeroModel}
    * @returns {boolean}
    * @description Checks if the hero is already on the user team
    */
    const isOnTeam = (hero: HeroModel): boolean => {
        return getAllTeams().some((team: HeroModel) => team.id == hero.id);
    }


    /**
    * @params {HeroModel}
    * @returns {boolean}
    * @description Checks if there is any collusion between good and bad hero 
    */
    const isGoodBadMixed = (hero: HeroModel): boolean => {
        return getAllTeams().some((team: HeroModel) => team.biography.alignment != hero.biography.alignment)
    }

    /**
    * @returns {boolean}
    * @description Checks if there is more hero selected then max number 8
    */
    const isMaxReached = (): boolean => {
        return getAllTeams().length >= 8 ? true : false
    }

    return { allTeams, getAllTeams, isOnTeam, isMaxReached, isGoodBadMixed, addMemberToTeam, removeMemberFromTeam };
};

export default useTeam;