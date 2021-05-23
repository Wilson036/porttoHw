import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { from, fromEvent, of } from 'rxjs';
import { mergeMap, finalize, catchError } from 'rxjs/operators';
import styled from 'styled-components';

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  li {
    border: 1px solid #000;
    border-radius: 20px;
    margin: 16px 0;
    @media (max-width: 700px) {
      margin: 12px;
    }
    @media (max-width: 500px) {
      margin: 16px;
    }
    img {
      width: 380px;
      height: 512px;
      @media (max-width: 900px) {
        height: 384px;
        width: 285px;
      }
      @media (max-width: 700px) {
        height: 256px;
        width: 190px;
      }
      @media (max-width: 320px) {
        height: 192px;
        width: 142px;
      }
    }
    p {
      text-align: center;
      font-weight: 800;
      @media (max-width: 700px) {
        font-size: 12px;
      }
      @media (max-width: 500px) {
        font-size: 8px;
      }
    }
  }
`;

export default function List() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isbottom, setBottom] = useState(false);
  const { pathname } = useLocation();

  const url = useMemo(
    () =>
      `https://api.opensea.io/api/v1/assets?format=json&owner=${process.env.REACT_APP_ADDRESS}&offset=${offset}&limit=20`,
    [offset]
  );

  useEffect(() => {
    const scroll$ = fromEvent(window, 'scroll').subscribe(() => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom) {
        setBottom(true);
      }
    });
    return () => {
      scroll$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (isbottom) {
      setOffset(offset + 20);
    }
  }, [isbottom]);

  useEffect(() => {
    const fetchData$ = from(fetch(url))
      .pipe(
        mergeMap((response) => response.json()),
        catchError(() => of('ERROR')),
        finalize(() => setBottom(false))
      )
      .subscribe(({ assets }) => {
        setData(data.concat(assets));
      });
    return () => fetchData$.unsubscribe();
  }, [url]);

  return (
    <StyledUl>
      {data.map(({ id, token_id, image_url, name, asset_contract }) => (
        <li key={id}>
          <Link
            to={{
              pathname: `/detail${token_id}`,
              state: {
                token_id,
                asset_contract,
              },
            }}
          >
            <img src={image_url} alt={name} />
          </Link>
          <p>{name}</p>
        </li>
      ))}
    </StyledUl>
  );
}
