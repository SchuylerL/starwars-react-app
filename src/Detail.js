import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function hideDetails() {
  window.location = '#';
}

async function callApi(res) {
  try {
    const omdb = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: process.env.REACT_APP_API_KEY,
        t: res.data.title,
        y: res.data.release_date.substring(0, 4),
      },
    });
    omdb.data.crawl = res.data.opening_crawl;
    return omdb.data;
  } catch (err) {
    console.error('There was a problem fetching:', err);
  }
}

export default function Detail({ person }) {
  const [personDetail, setPersonDetail] = useState({});
  const getPosters = async (details) => {
    const posters = [];
    for (let i = 0; i < details.films.length; i++) {
      const film = details.films[i];
      const res = await axios.get('https://' + film.slice(7));

      let personDetailVal;
      if (details.homeworld.startsWith('http://')) {
        personDetailVal = await axios.get(
          'https://' + details.homeworld.slice(7)
        );
        details.homeworld = personDetailVal.data.name;
      }
      if (details.species[0] !== undefined)
        if (details.species[0].startsWith('http://')) {
          personDetailVal = await axios.get(
            'https://' + details.species[i].slice(7)
          );
          details.species = personDetailVal.data.name;
        }
      if (Array.isArray(details.vehicles)) {
        let arr = [];
        let response;
        for (let i = 0; i < details.vehicles.length; i++) {
          if (details.vehicles[0].startsWith('http://')) {
            response = await axios.get(
              'https://' + details.vehicles[i].slice(7)
            );
            arr.push(response.data.name);
          }
        }
        if (response !== undefined) details.vehicles = arr;
      }
      if (Array.isArray(details.starships)) {
        let arr = [];
        let response;
        for (let i = 0; i < details.starships.length; i++) {
          if (details.starships[0].startsWith('http://')) {
            response = await axios.get(
              'https://' + details.starships[i].slice(7)
            );
            arr.push(response.data.name);
          }
        }
        if (response !== undefined) details.starships = arr;
      }

      posters.push(callApi(res));
    }

    details.films = await Promise.all(posters);

    setPersonDetail(details);
  };

  useEffect(() => {
    const details = {};
    for (let key in person) {
      details[key] = person[key];
    }

    getPosters(details);
  }, [person]);

  return (
    <div className="detailDiv">
      <div id="detailHeader">
        {personDetail.name === undefined ? (
          <h2>Loading... </h2>
        ) : (
          <h2>Details for {personDetail.name}</h2>
        )}
        <button id="hideDetails" onClick={hideDetails}>
          <img id="trooper" src="storm.jfif" alt="stormtrooper" />
          Close
        </button>
      </div>
      <div id="content">
        <ul>
          {Object.keys(personDetail).map((value, index) => {
            return (
              <li className="detailsList" key={index}>
                {value}: {value.includes('films') ? <br /> : null}
                {value.includes('films') ? (
                  personDetail.films.map((url, index) => (
                    <a
                      href={`https://imdb.com/find?q=${url.Title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index + 1}
                    >
                      <img
                        className="zoom"
                        src={url.Poster}
                        title={url.Title}
                        alt={url.Title}
                      />
                    </a>
                  ))
                ) : value.includes('vehicles') ||
                  value.includes('starships') ? (
                  personDetail[value].map((links, index) => (
                    <ul key={index + 4}>
                      <li className="liNada" key={index + 2}>
                        {links}
                      </li>
                    </ul>
                  ))
                ) : value.includes('url') ? (
                  <a href={personDetail[value]} key={index + 3}>
                    {personDetail[value]}
                  </a>
                ) : (
                  personDetail[value]
                )}
              </li>
            );
          })}
        </ul>
        {/* {Object.keys(personDetail).map((value, index) => {
          let randCrawl = Math.floor(
            Math.random() * Math.floor(personDetail.films.length)
          );
          return (
            <div>
              <br />
              {value.includes('films') ? (
                <div className="crawlTitle">
                  {personDetail.films[randCrawl].Title}
                  <br /> <br />
                  <div className="marquee">
                    <div className="text">
                      {personDetail.films[randCrawl].crawl}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
