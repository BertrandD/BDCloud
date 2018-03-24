import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <section className="Home">
        <h1>
          Bienvenue
          <span className="subtitle">
            {' '}
            sur mon espace privé de stockage et partage de fichiers !
          </span>
        </h1>
        <p>
          Il n'y a actuellement rien de public... Vous ne pouvez donc voir que
          ce que je vous ai partagé :)
        </p>
        <p>Bonne visite !</p>
        <p>Bertrand</p>
      </section>
    );
  }
}

export default Home;
