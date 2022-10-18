import axios from "axios"
import { API_END_POINT } from "../constants/general"
import HeroModel from "../model/Hero.model"

interface HeroDetailsResponse extends HeroModel {
    response: string
}


interface HeroListResponse {
    response: string
    results: HeroModel[]
    'results-for': string
}


const fetchHeroes = (): Promise<HeroModel[]> =>
    axios
        .get<HeroListResponse>(`${API_END_POINT}/search/a`)
        .then(response => {
            return response.data.results
        })
        .catch(error => {
            throw error
        })

const fetchHeroDetails = (id: number): Promise<HeroDetailsResponse> =>
    axios
        .get<HeroDetailsResponse>(`${API_END_POINT}/${id}`)
        .then((response) => {
            return response.data
        })
        .catch(error => {
            throw error
        })

export { fetchHeroes, fetchHeroDetails }