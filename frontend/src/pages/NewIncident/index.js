import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import api from '../../services/api'
import logoImage from '../../assets/logo.svg'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          auth: ongId,
        }
      })

      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />

          <h1>Cadastrar</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói prar resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea type="email"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}