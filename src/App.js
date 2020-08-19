import React from "react";

import "./styles.css";
import { useState, useEffect } from "react";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = api.post('repositories', {
      "title": "Tindev",
      "url": "github.com/Tindev",
      "techs": [
        "NodeJS",
        "React",
        "ReactNative"
      ]
    })

    const repo = response.data

    setRepositories(...repositories, repo)
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)

    setRepositories(...repositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>{ return (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )})}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
