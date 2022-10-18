import { defaultFilter, filterListItems } from '../../model/Filter.model';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Col, Input, Row, Select, Slider } from 'antd';
import { useRouter } from 'next/router'
import qs from 'query-string';
import FilterModel from '../../model/Filter.model';
import { isEmpty } from '../../utils/helper';

let firstLoad: boolean = true;
let debounceTimer: ReturnType<typeof setTimeout>
const { Option } = Select;
const debounceTime = 1000; //1 second


const Filter = () => {
  let location = window.location
  
  let data = qs.parse(location.search, {
    arrayFormat: 'bracket-separator',
    arrayFormatSeparator: ','
  }) as unknown as FilterModel;

  let [filter, setFilter] = useState<FilterModel>(!isEmpty(data) ? {...data} : defaultFilter);
  

  const history = useRouter()

  if (typeof window !== undefined) {
    location = window.location
  }

  useEffect(() => {

      history.push({
        pathname: '/search',
        search: qs.stringify(filter),
        
      }, undefined, {shallow: true});

  }, [filter]);

  const handleKeywordSearch = (e: ChangeEvent<HTMLInputElement>) => {
    
    if(debounceTimer !== undefined){
      clearTimeout(debounceTimer)
    }

    debounceTimer = setTimeout(() => {
      searchByField(e.target.value, 'name')
    }, debounceTime);
  }


  const searchByField = (e: string, fieldName: string): void => {
    let value = e;
    setFilter({ ...filter, [fieldName]: value });
  };

  const searchByStateField = (e: number[], fieldName: string): void => {
    let value = e.join(',');
    setFilter({ ...filter, [fieldName]: value });
  };

  const searchByPowerStat = (e: filterListItems[]): void => {
    let values = e.join(',');
    setFilter({ ...filter, powerStat: values });
  };

  const isPowerStateSelected = (power: filterListItems): boolean => {

    let states = filter.powerStat.split(',');
    return states.some((state) => state.toLowerCase() == power.toLowerCase())
  }

  const getFilterValue = (power: string): [number, number] => {
    let val = power.split(",");
    return [parseInt(val[0]), parseInt(val[1])]
  }

  return (
    <div className="filter-wrapper">
      <Row gutter={[16, 16]}>
        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Keyword</div>
          <Input
            placeholder="Keyword"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleKeywordSearch(e)
            }}
          />
        </Col>
        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Gender</div>
          <Select
            aria-label='Gender'
            value={filter.gender}
            getPopupContainer={trigger => trigger.parentNode}
            style={{ width: '100%' }}
            onChange={(e:string) => {
              searchByField(e, 'gender');
            }}
          >
            <Option value="">Choose Gender</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Col>
        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Alignment</div>
          <Select
            aria-label='Alignment'
            value={filter.alignment}
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentNode}
            onChange={(e: string) => {
              searchByField(e, 'alignment');
            }}
          >
            <Option value="">Choose Alignment</Option>
            <Option value="good">Good</Option>
            <Option value="bad">Bad</Option>
          </Select>
        </Col>
        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Powerstats</div>
          <Select
            aria-label='Powerstats'
            mode="multiple"
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentNode}
            placeholder="Please select"
            value={filter?.powerStat ? filter?.powerStat?.split(',') : []}
            onChange={(e: string[]) => {              
              searchByPowerStat(e as filterListItems[]);
            }}
          >
            <Option value="Intelligence">Intelligence</Option>
            <Option value="speed">Speed</Option>
            <Option value="power">Power</Option>
            <Option value="durability">Durability</Option>
          </Select>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <Row gutter={[16, 16]}>

            {isPowerStateSelected('intelligence') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Intelligence</div>
                  <Slider
                    range
                    value={getFilterValue(filter?.intelligence)}
                    onChange={(e: number[]) => {
                      searchByStateField(e, 'intelligence')
                    }}
                  />
                </div>
              </Col>
            )}
            {isPowerStateSelected('speed') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Speed</div>
                  <Slider
                    range
                    value={getFilterValue(filter?.speed)}
                    onChange={(e: number[]) => {
                      searchByStateField(e, 'speed')
                    }}
                  />
                </div>
              </Col>
            )}
            {isPowerStateSelected('power') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Power</div>
                  <Slider
                    range
                    value={getFilterValue(filter?.power)}
                    onChange={(e: number[]) => {
                      searchByStateField(e, 'power')
                    }}
                  />
                </div>
              </Col>
            )}
            {isPowerStateSelected('durability') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Durability</div>
                  <Slider
                    range
                    value={getFilterValue(filter?.durability)}
                    onChange={(e: number[]) => {
                      searchByStateField(e, 'durability')
                    }}
                  />
                </div>
              </Col>
            )}

          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
