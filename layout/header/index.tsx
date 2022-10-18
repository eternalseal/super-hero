import React, { useEffect, useState } from 'react';
import {
  CloseOutlined,
  MenuOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Col, Drawer, Row } from 'antd';

import Filter from '../../Components/Filter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMachine } from "@xstate/react";
import { filterMachine } from "../../machine/FilterMachine";
import { isEmpty } from '../../utils/helper';


const Header = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const [state, send] = useMachine(filterMachine);

  let history = useRouter()
  useEffect(() => {
    let data = history.query

    if (!isEmpty(data)) {
      send('ENABLE');
    }
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="fixed-position">
      <div className="hero-container">
        <div className="header-wrapper">
          <div className="flex space-between flex-align-center full-width pc-menu">
            <div className="left-menu flex">
              <div
                tabIndex={1}
                className="left-menu-logo primary black mr-15 cursor"
                onClick={() => {
                  history.push('/search');
                }}
              >
                SUPERSEARCH
              </div>

              <div className="nav-bar-menu-items">
                <nav className="flex">
                  <div className="left-menu-item">
                    <Link href={`/search`}>
                      <span
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            history.push(`/search`);
                          }
                        }}
                        tabIndex={2} className={history.pathname == "/search" ? "active" : ''}>Super Heroes</span>
                    </Link>
                  </div>

                  <div className="left-menu-item">
                    <Link href={`/team`}>
                      <span
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            history.push(`/team`);
                          }
                        }}
                        tabIndex={3} className={history.pathname == "/team" ? "active" : ''}>Team</span>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>

            {history?.pathname == '/search' && (
              <div className="right-menu flex-align-center">
                <div className="filters flex flex-align-center">
                  {state.context.filter && (
                    <div
                      className="mr-10 filter-text cursor"
                      onClick={() => {
                        send('DISABLE');
                        history.push('/search', undefined, { shallow: true });
                      }}
                    >
                      <CloseOutlined style={{ color: '#000' }} /> Clear filter
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      send(state.context.filter ? 'DISABLE' : 'ENABLE');
                    }}
                    ghost={!state.context.filter}
                    icon={<MenuUnfoldOutlined />}
                    type="primary"
                  >
                    Filter
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mobile-menu">
            <div className="mobile-menu-wrapper">
              <Row>
                <Col span="6">
                  <div onClick={showDrawer}>
                    <MenuOutlined style={{ fontSize: '20px', color: '#000' }} />
                  </div>
                </Col>
                <Col span="12">
                  <div
                    className="left-menu-logo primary black mr-15 cursor"
                  >
                    SUPERSEARCH
                  </div>
                </Col>
                <Col span="6">
                  {history?.pathname == '/search' && (
                    <div className="text-right">
                      <div className="">
                        <Button
                          onClick={() => {
                            send(state.context.filter ? 'DISABLE' : 'ENABLE');
                          }}
                          ghost={!state.context.filter}
                          icon={<MenuUnfoldOutlined />}
                          type="primary"
                        >
                          Filter
                        </Button>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {history?.pathname == '/search' && (
          state.context.filter && <Filter />
        )}
      </div>
      <Drawer
        width="100%"
        title={
          <Row>
            <Col span="2">
              <CloseOutlined
                onClick={() => {
                  onClose();
                }}
              />
            </Col>
            <Col span="20">
              <div className="primary black mr-15 text-align">SUPERSEARCH</div>
            </Col>
            <Col span="2" />
          </Row>
        }
        placement="left"
        visible={visible}
        closable={false}
      >
        <div className="nav-bar-menu-items">
          <nav className="text-center">
            <div className="left-menu-item mb-15">
              <Link href={`/search`}>
                <span>Super Heroes</span>
              </Link>
            </div>

            <div className="left-menu-item">
              <Link href={`/team`}>
                <span className="">Team</span>
              </Link>
            </div>
          </nav>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
