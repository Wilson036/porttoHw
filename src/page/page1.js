import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';

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
    <ul>
      {data.map(
        ({ token_id, image_url, name, collection, description, permalink }) => (
          <li>
            <p>{image_url}</p>
            <p>{name}</p>
            <p>{collection.name}</p>
            <p>{description}</p>
            <p>{permalink}</p>
          </li>
        )
      )}
    </ul>
  );
}
