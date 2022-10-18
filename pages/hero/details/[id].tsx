import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Spin, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import useTeam from '../../../hooks/useTeam';
import { useMachine } from '@xstate/react'
import { HeroesDetailsStateMachine } from '../../../machine/HeroDetailsMachine';
import HeroModel, { HeroModelInitialData } from '../../../model/Hero.model';
import MsgModel from '../../../model/Msg.model';
import { GetServerSideProps } from 'next';
import { fetchHeroDetails } from '../../../service/heroes';

interface Props {
    hero: HeroModel
}

const Details = (props: Props) => {

    const [heroDetails, setHeroDetails] = useState<HeroModel>(HeroModelInitialData);
    const [onTeam, setOnTeam] = useState<boolean>(false)

    const [state, send] = useMachine(HeroesDetailsStateMachine)
    const router = useRouter()
    const { id } = router.query

    const { isOnTeam, isMaxReached, isGoodBadMixed, addMemberToTeam, removeMemberFromTeam } = useTeam();
    const [msg, setMsg] = useState<MsgModel>({ error: false, msg: '', desc: '' });

    useEffect(() => {
        const data: HeroModel = state?.context?.hero ? state.context.hero : HeroModelInitialData;

        setHeroDetails(data)
    }, [state])

    useEffect(() => {
        if (id) {
            send('ADD_HEROES', { hero: props.hero })
        }
    }, []);

    useEffect(() => {
        setOnTeam(isOnTeam(heroDetails))
    }, [heroDetails]);

    const addHero = (): void => {
        if (isMaxReached()) {
            setMsg({ error: true, msg: 'Ops! You have too many team members', desc: 'You may only select 8 team members at a time' });
            return
        }
        if (isGoodBadMixed(heroDetails)) {
            setMsg({ error: true, msg: 'Ops! You can not create mixed type of super team', desc: 'Team can only contain one type of hero (Good or Bad)' });
            return
        }

        addMemberToTeam(heroDetails);
        setOnTeam(true)
    }

    const removeHero = (): void => {
        removeMemberFromTeam(heroDetails)
        setOnTeam(false)
    }


    const setInitialFocus = (n: HTMLDivElement) => {
        n?.focus()
    }

    return (
        <div className="details-full">
            <div className="hero-container">
                {state.matches('loading') || state.matches('idle') ? (
                    <div className="text-center mt-50">
                        <Spin />
                    </div>
                ) : (
                    <Row>
                        <Col md={{ span: 11 }} sm={{ span: 24 }}>
                            <div className="left-side">
                                <img className="full-image" src={`${heroDetails?.image?.url}`} />
                                <div className="action-container">
                                    <div className="hero-name size-40 white primary">{heroDetails?.name}</div>
                                    <div className="card-content-actions flex flex-justify-center mt-20">
                                        <div className="action-label mr-10 white">Add to team</div>

                                        <div className="action-label">
                                            <Switch
                                                area-label="Add to team"
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                checked={heroDetails ? onTeam : false}
                                                onChange={(e) => { e ? addHero() : removeHero() }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={{ span: 13 }} sm={{ span: 24 }} className="detail-col">
                            <Row gutter={[12, 12]}>
                                <Col md={{ span: 10 }} sm={{ span: 24 }}>
                                    <div tabIndex={0} className="black size-20 primary mb-15">Powerstats</div>
                                    <Row gutter={[16, 16]}>
                                        <Col span={10}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Intelligence: </div>
                                                <span tabIndex={0}>{heroDetails?.powerstats?.intelligence}</span>
                                            </div>
                                        </Col>

                                        <Col span={10}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Durability: </div>
                                                <span tabIndex={0}>{heroDetails?.powerstats?.durability}</span>
                                            </div>
                                        </Col>

                                        <Col span={10}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Strength:</div>
                                                <span tabIndex={0}>{heroDetails?.powerstats?.strength}</span>
                                            </div>
                                        </Col>

                                        <Col span={10}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Power: </div>
                                                <span tabIndex={0}>{heroDetails?.powerstats?.power}</span>
                                            </div>
                                        </Col>

                                        <Col span={10}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Speed: </div>
                                                <span tabIndex={0}>{heroDetails?.powerstats?.speed}</span>
                                            </div>
                                        </Col>

                                        <Col span={10}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Combat: </div>
                                                <span tabIndex={0}>{heroDetails?.powerstats?.combat}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={{ span: 14 }} sm={{ span: 24 }}>
                                    <div tabIndex={0} className="black size-20 primary mb-15 mobile-top">Appearance</div>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Gender: </div>
                                                <span tabIndex={0}>{heroDetails?.appearance?.gender}</span>
                                            </div>
                                        </Col>

                                        <Col span={12}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Weight: </div>
                                                <span tabIndex={0}>{heroDetails?.appearance?.weight?.map((weight, i) => (
                                                    <div key={i}>{weight},</div>
                                                ))}</span>
                                            </div>
                                        </Col>

                                        <Col span={12}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Race:</div>
                                                <span tabIndex={0}>{heroDetails?.appearance?.race} </span>
                                            </div>
                                        </Col>

                                        <Col span={12}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Eye Color: </div>
                                                <span tabIndex={0}>{heroDetails?.appearance['eye-color']}</span>
                                            </div>
                                        </Col>

                                        <Col span={10}>
                                            <div className="flex">
                                                <div tabIndex={0} className="details-label">Hair Color: </div>
                                                <span tabIndex={0}>{heroDetails?.appearance['hair-color']}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mt-30">
                                <div tabIndex={0} className="black size-20 primary mt-30 mb-15">Biography</div>
                                <Col span={24}>
                                    <div className="flex mb-10">
                                        <div tabIndex={0} className="details-label">Full Name: </div>
                                        <span tabIndex={0}>{heroDetails?.name}</span>
                                    </div>
                                    <div className="flex mb-10">
                                        <div tabIndex={0} className="details-label">Alter Egos: </div>
                                        <span tabIndex={0}>{heroDetails?.biography['alter-egos']}</span>
                                    </div>
                                    <div className="flex mb-10">
                                        <div tabIndex={0} className="details-label">Aliases: </div>
                                        <span tabIndex={0}>
                                            {heroDetails?.biography?.aliases?.map((alias, i) => (
                                                <span key={i}>{`"${alias}"`},</span>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="flex mb-10">
                                        <div tabIndex={0} className="details-label">Place of Birth: </div>
                                        <span tabIndex={0}>{heroDetails?.biography['place-of-birth']}</span>
                                    </div>
                                    <div className="flex mb-10">
                                        <div tabIndex={0} className="details-label">Alignment: </div>
                                        <span tabIndex={0}>{heroDetails?.biography?.alignment}</span>
                                    </div>
                                </Col>
                            </Row>


                            <Row className="mt-30">
                                <div tabIndex={0} className="black size-20 primary mb-15">Work</div>
                                <Col span={24}>
                                    <div className="flex mb-10">
                                        <div tabIndex={0} className="details-label">Occupation: </div>
                                        <span tabIndex={0}>{heroDetails?.work?.occupation}</span>
                                    </div>
                                    <div className="flex mb-10">
                                        <div tabIndex={0} className="details-label">Base: : </div>
                                        <span tabIndex={0}>{heroDetails?.work?.base}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
            </div>
            <Modal centered className="custom-modal" footer={null} title="" visible={msg?.error} onCancel={() => { setMsg({ error: false, msg: '', desc: '' }) }}>
                <div tabIndex={0} ref={(e: HTMLDivElement) => { setInitialFocus(e) }}>
                    <div tabIndex={0} className="primary black size-20">{msg?.msg}</div>
                    <div tabIndex={0} className="black size-16 mt-10">{msg?.desc}</div>
                </div>
            </Modal>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    try {
        let id = context.query.id as unknown as number

        let hero = await fetchHeroDetails(id)

        return { props: { hero, loading: false } }
    } catch (error) {
        console.log(error);
        throw error

    }
}


export default Details;