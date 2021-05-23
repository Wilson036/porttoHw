import React, { useEffect, useState } from 'react';
import { from, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  img {
    margin-bottom: 8px;
    @media (max-width: 700px) {
      height: 375px;
      width: 375px;
    }
    @media (max-width: 500px) {
      height: 250px;
      width: 250px;
    }
    @media (max-width: 360px) {
      height: 175px;
      width: 175px;
    }
  }
  p {
    margin: 16px;
    @media (max-width: 700px) {
      text-align: center;
    }
    @media (max-width: 500px) {
      font-size: 12px;
    }
    @media (max-width: 360px) {
      font-size: 8px;
    }
  }
`;

const StyledH2 = styled.h2`
  font-size: 36px;
  font-weight: 800;
  @media (max-width: 500px) {
    font-size: 24px;
  }
  @media (max-width: 360px) {
    font-size: 20px;
  }
`;

const StyledH3 = styled.h3`
  font-size: 24px;
  font-weight: 500;
  @media (max-width: 500px) {
    font-size: 20px;
  }
  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

const StyledIcon = styled(LeftOutlined)`
  font-size: 36px;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 28px;
  }
  @media (max-width: 360px) {
    font-size: 20px;
  }
`;
export default function Detail(props) {
  const { token_id, asset_contract } = props.location.state;

  const [data, setData] = useState({
    name: '',
    image_url: '',
    description: '',
    collection: {},
    permalink: '',
  });

  const back = () => {
    props.history.push('/list');
  };

  useEffect(() => {
    const fetchData$ = from(
      fetch(
        `https://api.opensea.io/api/v1/asset/${asset_contract.address}/${token_id}`
      )
    )
      .pipe(
        mergeMap((response) => response.json()),
        catchError(() => of('ERROR'))
      )
      .subscribe((jsonData) => {
        setData({ ...jsonData });
      });
    return () => fetchData$.unsubscribe();
  }, []);
  return (
    <>
      <StyledIcon onClick={back} />
      <StyledDiv>
        <StyledH2> {data.collection.name}</StyledH2>
        <img src={data.image_url} alt="" />
        <StyledH3>{data.name}</StyledH3>
        <p>{data.description}</p>
        <Button type="primary" size="large">
          <a href={data.permalink} target="_blank">
            Permalink
          </a>
        </Button>
      </StyledDiv>
    </>
  );
}
