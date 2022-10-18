import React, { useEffect, useState } from 'react';

import { Switch, Modal } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  UpCircleOutlined
} from '@ant-design/icons';

import useTeam from "../../hooks/useTeam";
import Link from 'next/link';
import { useRouter } from 'next/router';
import MsgModel from '../../model/Msg.model';
import HeroModel, { Powerstats } from '../../model/Hero.model';

interface Props {
  hero: HeroModel,
  onRemove?: () => void
}

const HeroCard = (props: Props) => {
  const [hoverClass, setHoverClass] = useState('');
  const [msg, setMsg] = useState<MsgModel>({ error: false, msg: '', desc: '' });
  const [hoverState, setHoverState] = useState(false);

  const { isOnTeam, isMaxReached, isGoodBadMixed, addMemberToTeam, removeMemberFromTeam } = useTeam();
  
  const [onTeam, setOnTeam] = useState<boolean>(false)

  const history = useRouter();

  useEffect(() => {
    setOnTeam(isOnTeam(props.hero))
  }, [])

  const toggleDetails = (): void => {
    setHoverState(!hoverState);
  }

  const addHero = (): void => {
    if (isMaxReached()) {
      setMsg({ error: true, msg: 'Ops! You have too many team members', desc: 'You may only select 8 team members at a time' });
      return
    }
    if (isGoodBadMixed(props.hero)) {
      setMsg({ error: true, msg: 'Ops! You can not create mixed type of super team', desc: 'Team can only contain one type of hero (Good or Bad)' });
      return
    }
    addMemberToTeam(props.hero);
    setOnTeam(true)
  }

  const removeHero = (): void => {
    removeMemberFromTeam(props.hero)
    setOnTeam(false)

    if (props.onRemove !== undefined) {
      props.onRemove()
    }
  }

  const statsMap: string[] = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat']

  const titleCase = (text: string) => {
    return text.charAt(0).toUpperCase() + text.substring(1)
  }


  const setInitialFocus= (n: HTMLDivElement) => {
    n?.focus()
  }

  return (
    <div
      aria-label="Hero Card"
      className={`hero-card ${onTeam && 'active'}`}
      onMouseLeave={() => {
        setHoverClass('');
        toggleDetails();
      }}
    >
      <div className="hero-card-wrapper">
        <Link href={`/hero/details/${props.hero.id}`}>
          <div className="hero-card-img">
            <div className='gradiant'></div>
            <img src={props.hero?.image?.url} />
          </div>
        </Link>
        <div className="hero-card-content">

          <div tabIndex={0} className="card-content-title primary size-20 white mb-5 cursor"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                history.push(`/hero/details/${props.hero.id}`);
              }
            }}
          >{props.hero?.name}</div>

          <div className="card-content-actions flex flex-justify-center mb-5">
            <div tabIndex={0} className="action-label mr-10 white">Add to team</div>

            <div className="action-label">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={onTeam}
                onChange={(e) => { e ? addHero() : removeHero() }}
              />
            </div>
          </div>
        </div>
        <div className="card-content-arrow">
          <UpCircleOutlined
            width="100"
            className="white-arrow"
            onMouseEnter={() => {
              setHoverClass('hoverShow');
              toggleDetails();
            }}
          />
        </div>

        <div className={`hover-card ${hoverClass}`}
          onMouseLeave={() => {
            setHoverClass('');
            toggleDetails();
          }}

          onFocus={() => {
            setHoverClass('hoverShow');
            toggleDetails();
          }}

          onBlur={() => {
            setHoverClass('');
            toggleDetails();
          }}

        >
          <div className="hover-card-body">
            <div className="hover-card-contents">
              <div tabIndex={0} className="hover-card-title white primary size-20 mb-15">{props.hero?.name}</div>

              <div className="card-content-actions flex flex-justify-center mb-20">
                <div className="action-label mr-10 white">Add to team</div>

                <div tabIndex={0}>
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={onTeam}
                    onChange={(e) => { e ? addHero() : removeHero() }}
                  />
                </div>
              </div>

              {statsMap.map((s: string, i: number) => (<div tabIndex={0} key={i} className="hover-card-item white primary size-16">{titleCase(s)}: {props.hero?.powerstats[s as keyof Powerstats]}</div>))}
            </div>
          </div>
        </div>

      </div>
      <Modal
        centered className="custom-modal"
        footer={null}
        title=""
        visible={msg?.error}
        onCancel={() => { setMsg({ error: false, msg: '', desc: '' }) }}>
        <div tabIndex={0} ref={(e: HTMLDivElement) => {setInitialFocus(e)}}>
          <div className="primary black size-20">{msg?.msg}</div>
          <div className="black size-16 mt-10">{msg?.desc}</div>
        </div>
      </Modal>
    </div>
  );
};

export default HeroCard;
