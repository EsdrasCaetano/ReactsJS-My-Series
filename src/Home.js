import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = ({ match }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [match.params.id])

  const masterHeader = {
    /*
    width: '15%',
    display: 'inline-block'
    pading: '0'
    */
    width: '19%',
    margin: '5px'
  }

  const renderizaLinha = record => {
    return (
      <Link key={record.id} to={'/series/' + record.id}>
        <img id='imagem' alt={record.name} className='ml-auto' src={record.poster} style={masterHeader} />
      </Link>
    )
  }

  return (
    <div className='container'>
      <h1>Home</h1>
      <div color='dark'>
        <div>
          {data.map(renderizaLinha)}
        </div>
      </div>
    </div>
  )
}
export default Home
