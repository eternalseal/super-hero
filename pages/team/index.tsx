import React, { useEffect, useState } from 'react';
import HeroCard from '../../Components/HeroCard';

import { Col, Row } from 'antd';
import useTeam from '../../hooks/useTeam';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import HeroModel from '../../model/Hero.model';

const Search = (props: AppProps) => {
    useEffect(() => { }, []);
    let history = useRouter();
    const { getAllTeams } = useTeam();
    const [teamList, setTeamList] = useState<HeroModel[]>([])

    useEffect(() => {
        setTeamList(getAllTeams())
    }, [])

    const onRemove = () => {
        let teams = getAllTeams();
        setTeamList(teams)
    }


    return (
        <div className="">
            <div className="hero-container">
                {teamList.length <= 0 && (
                    <>
                        <div className="black size-18 mt-20">
                            You do not have any team members selected. Please make selections on
                        </div>
                        <div
                            className="secondary size-18 cursor"
                            onClick={() => {
                                history.push('/search');
                            }}
                        >
                            Superheroes page
                        </div>
                    </>
                )}
                <div className="body-container">
                    <Row gutter={[25, 25]}>
                        {teamList.map((data: HeroModel) => (
                            <Col key={data.id} md={{ span: 6 }} xs={{ span: 24 }}>
                                <HeroCard onRemove={onRemove} hero={data} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Search;