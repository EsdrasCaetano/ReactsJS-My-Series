import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const EditarGenero = ({ match }) => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    axios
      .get('/api/genres/' + match.params.id)
      .then(res => {
        setName(match.params.name)
      })
  }, [match.params.id])

  const onChange = evt => {
    return (
      setName(evt.target.value)
    )
  }
  const save = () => {
    axios
      .put('/api/genres/' + match.params.id, {
        name
      })
      .then(res => {
        setSuccess(true)
      })
  }
  if (success) {
    return (<Redirect to='/generos' />)
  }
  return (
    <div className='container'>
      <h1>Editar Gênero</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Gênero' />
        </div>
        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  )
}
/**/
export default EditarGenero
