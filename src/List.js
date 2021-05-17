import React from 'react';
import './App.css';

export default function List({ people }) {
  return (
    <div>
      <div id="content">
        <ul>
          {people.map((person) => {
            return (
              <a id="namelist" key={person.id} href={`#${person.id}`}>
                <li id="namelistli" key={person.id}>
                  {person.name}
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
