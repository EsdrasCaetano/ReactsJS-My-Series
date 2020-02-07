import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ' '
  })
  const [sucess, setSucess] = useState(false)
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')

  const [data, setData] = useState({})
  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
        const genres = res.data.data
        const encontrado = genres.find(value => data.genre === value.name)
        if (encontrado) {
          setGenreId(encontrado.id)
        }
      })
  }, [data])

  const onChangeGenre = evt => {
    setGenreId(evt.target.value)
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }
  const save = () => {
    axios
      .post('/api/series', {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSucess(true)
      })
  }
  if (sucess) {
    return (
      <div>
        <Redirect to='/series' />
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Série' />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Genero</label>
          <select className='form-control' onChange={onChangeGenre} value={genreId}>
            <option key='0' value='0'>Selecione</option>
            {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
        </div>
        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  )
}

export default NovaSerie
