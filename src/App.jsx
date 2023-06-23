import { useEffect, useState } from 'react'
import { getRandomFact } from './services/facts'
import './App.css'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

function useCatImage ({ fact }) {
  const [imgUrl, setImgUrl] = useState()
  useEffect(() => {
    if (!fact) return
    const firstWord = fact.split(' ', 3).join(' ')
    console.log(firstWord)

    fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImgUrl(url)
        console.log(response)
      })
  }, [fact])
  return { imgUrl }
}

export function App () {
  const [fact, setFact] = useState('lorem ipmsun cat wahterever')
  const { imgUrl } = useCatImage({ fact })

  //   para recuperar la cita
  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact))
  }, [])
  //   para recuperar la imagen

  const handleClick = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }
  return (
    <main>
      <h1>App de gatites</h1>
      <button onClick={handleClick}>Get new fact</button>

      {fact && <p>{fact}</p>}
      {imgUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imgUrl}`}
          alt='image extracted using the first three words'
        />
      )}
    </main>
  )
}
