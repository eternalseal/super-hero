import React, { useEffect, useMemo, useState } from 'react';
import HeroCard from '../../Components/HeroCard';

import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { HeroesStateMachine } from "../../machine/HeroesMachine";
import { useMachine } from '@xstate/react'
import { filterListItems } from "../../model/Filter.model";
import HeroModel from "../../model/Hero.model";
import FilterModel from '../../model/Filter.model';
import { GetServerSideProps } from 'next';
import { isEmpty } from '../../utils/helper';
import { fetchHeroes } from '../../service/heroes';

interface Props {
    heroes: HeroModel[],
    loading: boolean
}

const Search = (props: Props) => {

    type ObjectKey = keyof typeof filter;
    const history = useRouter();
    const [state, sendHeros] = useMachine(HeroesStateMachine)

    const [filter, setFilter] = useState<FilterModel>();

    useEffect(() => {
        sendHeros("ADD_HEROES", { heroes: props.heroes })    
    }, [])

    useEffect(() => {
        setFilter(history.query as unknown as FilterModel);
    }, [history.query])


    const filterByName = (data: HeroModel[]): HeroModel[] => {
        if (filter == null) {
            return data;
        }
        return data.filter((hero: HeroModel) => {
            let filterName = filter.name;
            if (!filterName || filterName == '') return true;
            let lowerCaseName = hero.name.toLowerCase();
            return lowerCaseName.startsWith(filterName.toLowerCase());
        });
    };

    const filterByGender = (data: HeroModel[]): HeroModel[] => {
        
        if (filter == null) {
            return data;
        }
        return data.filter((hero: HeroModel) => {
            let filtergender = filter.gender;
            if (!filtergender || filtergender == '') return true;
            let lowerCaseGender = hero.appearance.gender.toLowerCase();
            return lowerCaseGender.startsWith(filtergender.toLowerCase());
        });
    };

    const filterByAlignment = (data: HeroModel[]): HeroModel[] => {
        if (filter == null) {
            return data;
        }
        return data.filter((hero: HeroModel) => {
            let filterAlignment = filter.alignment;
            if (!filterAlignment || filterAlignment == '') return true;
            let lowerCaseAlignment = hero.biography.alignment.toLowerCase();
            return lowerCaseAlignment.startsWith(filterAlignment.toLowerCase());
        });
    };

    const filterByState = (data: HeroModel[], type: filterListItems): HeroModel[] => {
        if (filter == null) {
            return data;
        }
        return data.filter((hero: HeroModel) => {
            const key = type as ObjectKey;
            let filterState: string = filter[key];

            if (!filterState || filterState == '') return true;
            let powerState = hero.powerstats[key];

            let filterValues = filterState.split(',');

            return (
                parseInt(powerState) > parseInt(filterValues[0]) &&
                parseInt(powerState) < parseInt(filterValues[1])
            );
        });
    };


    const isPowerStateSelected = (power: filterListItems): boolean => {
        let states = filter && filter.powerStat.split(',');
        return states ? states.some((state) => state.toLowerCase() == power.toLowerCase()) : false
    };

  
    const filterData = useMemo<HeroModel[]>(() => {
        
        
        let newResult: HeroModel[] = props.heroes;
        if (!newResult) {
            return [];
        }

        newResult = filterByName(newResult);
        newResult = filterByGender(newResult);
        newResult = filterByAlignment(newResult);

        if (filter && !isEmpty(filter)) {
            if (filter && isPowerStateSelected('intelligence')) {
                newResult = filterByState(newResult, 'intelligence');
            }

            if (filter && isPowerStateSelected('speed')) {
                newResult = filterByState(newResult, 'speed');
            }

            if (filter && isPowerStateSelected('power')) {
                newResult = filterByState(newResult, 'power');
            }

            if (filter && isPowerStateSelected('durability')) {
                newResult = filterByState(newResult, 'durability');
            }
        }
        
        return newResult;
    }, [filter]);

    return (
        <div>
            <div className="hero-container hero-bg">
                {filterData.length <= 0 && (
                    <>
                        <div className="black size-18 mt-20">
                            There are no Superheroes based on the filters you have selected. Please clear filters
                            and try again.
                        </div>
                    </>
                )}
                <div className="body-container">

                    <div>
                        <Row gutter={[25, 25]}>
                            {filterData.map((data: HeroModel) => (
                                <Col key={data.id} md={{ span: 6 }} sm={{ span: 24 }}>
                                    <HeroCard hero={data} />
                                </Col>
                            ))}
                        </Row>
                    </div>

                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {

    try {
        let heroes = await fetchHeroes()
        return { props: { heroes, loading: false } }
    } catch (error) {
        console.log(error);
        throw error

    }
}



export default Search;