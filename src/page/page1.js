import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fromEvent } from 'rxjs';
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

export default function Page1() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isbottom, setBottom] = useState(false);
  const url = useMemo(
    () =>
      `https://api.opensea.io/api/v1/assets?format=json&owner=0x960DE9907A2e2f5363646d48D7FB675Cd2892e91&offset=${offset}&limit=20`,
    [offset]
  );

  useEffect(() => {
    const scroll$ = fromEvent(window, 'scroll').subscribe((value) => {
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
    if (isbottom) {
      setOffset(offset + 20);
    }
  }, [isbottom]);

  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((json) =>
        json.assets.map(
          ({
            token_id,
            image_url,
            name,
            collection,
            description,
            permalink,
          }) => ({
            token_id,
            image_url,
            name,
            collection,
            description,
            permalink,
          })
        )
      )
      .then((jsonData) => {
        setData(data.concat(jsonData));
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => {
        setBottom(false);
      });
  }, [url]);

  return (
    <StyledUl>
      {data.map(
        ({ token_id, image_url, name, collection, description, permalink }) => (
          <li>
            <Link to={{ pathname: '/page2', state: { token_id, permalink } }}>
              <img src={image_url} alt={description} />
            </Link>
            <p>{name}</p>
          </li>
        )
      )}
    </StyledUl>
  );
}
