import React from "react";
import { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Desafio React ${Date.now()}`,
	    url: "https://github.com/aandrepf",
	    techs: ["AngularJS", "Flutter"]
  });

    const repo = res.data;
    setRepositories([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repo = repos.filter(item => item.id !== id);
    setRepositories(repo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repos.map(repo => 
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );

  /* RETURN UTILIZANDO TODAS AS INFOS QUE VEM DA API
  return (
    <>
    {repos.map(repo => 
      <div className="card-repository" key={repo.id} data-testid="repository">
        <h4>{repo.title}</h4>
        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => handleRemoveRepository(repo.id)}></i>
        <p className="wpr">
          <span>Link do repo:</span> <a className="linkurl" href={repo.url} target="_blank" rel="noopener noreferrer">{repo.url}</a>
        </p>
        <p className="wpr">
          <span>Techs:</span> 
          {repo.techs.map((r, i) => <span className="techs" key={i}>{r}</span>)}
        </p>
        <p className="wpr">
        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {repo.likes}
        </p>
      </div>
    )}
    <button onClick={handleAddRepository}>Adicionar</button>
    </>
  ); */
}

export default App;
