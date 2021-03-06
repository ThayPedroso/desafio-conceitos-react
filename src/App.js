import React from "react";
import { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Tindev",
      "url": "github.com/Tindev",
      "techs": [
        "NodeJS",
        "React",
        "ReactNative"
      ]
    })

    const repo = response.data

    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const filteredRepositories = repositories.filter(repo => repo.id !== id);

    setRepositories(filteredRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;