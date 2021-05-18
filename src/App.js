import React from 'react';
import './App.css';
import axios from 'axios';
import Detail from './Detail';
import List from './List';

const domain = 'https://swapi.dev/api/people/?page=';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      id: null,
    };
  }
  async componentDidMount() {
    window.addEventListener('hashchange', () => {
      const id = window.location.hash.slice(1) * 1;
      this.setState({ id });
    });
    if (window.location.hash.length > 1) {
      const id = window.location.hash.slice(1) * 1;
      this.setState({ id });
    }
    try {
      const resultsAll = [];
      let res = await axios.get(`${domain}1`);
      resultsAll.push(res.data.results);

      for (let i = 2; res.data.next !== null; i++) {
        res = await axios.get(`${domain}${i}`);
        resultsAll.push(res.data.results);
      }
      const starwars = resultsAll.flat();

      const people = [];
      // for (let i = 0; i < starwars.length; i++) {
      for (let i = 0; i < 22; i++) {
        people[i] = starwars[i];
        people[i].id = i + 1;
      }
      this.setState({ people });
    } catch (err) {
      console.error('There was a problem fetching people:', err);
    }
  }
  render() {
    const { people, id } = this.state;
    const person = people.find((person) => person.id === id);
    return (
      <div className="container">
        <div id="content">
          {people.length === 0 ? <h2>Loading...</h2> : <List people={people} />}
          {person ? <Detail person={person} /> : null}
        </div>
      </div>
    );
  }
}

export default App;
