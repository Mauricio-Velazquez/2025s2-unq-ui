import { useEffect, useState } from 'react'
import { PostDTO } from '../../services/dtos/post.js'
import { postNewPost } from '../../services/post.js'
import { useNavigate } from 'react-router'
import { toastError } from '../../utils/toastify.js'
import { parseFormData } from '../../utils/logic.js'

export function PostForm ({ initialURL = '', initialDescription = '', postAction = postNewPost }) {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  useEffect(() => {
    setUrl(initialURL)
  }, [initialURL])

  const handleUrl = (e) => {
    if (URL.canParse(e.target.value)) {
      setUrl(e.target.value)
      setUrlError(false)
    }
  }

  const handleSubmit = async formData => {
    const data = parseFormData(formData)

    if (data.description === '') {
      setDescriptionError(true)
    }

    try {
      const newPost = new PostDTO(data)
      const res = await postAction(newPost)
      navigate(`/posts/${res.id}`)
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <main className='new-post'>
      <h2 className='new-post__preview'>Preview</h2>
      <section className='new-post__content'>
        <div className='new-post__image-container'>
          {url && !urlError
            ? (<img
                src={url}
                alt='Imagen del nuevo Post'
                onError={(e) => setUrlError(true)}
                onLoad={(e) => setUrlError(false)}
               />)
            : <div className='new-post__initial-image'>
              <img src='/Addaphoto.svg' alt='icon add a photo' />
              <p className='new-post__text'>Agregar imagen</p>
            </div>}

        </div>
        <div className='new-post__form'>
          <form action={handleSubmit}>
            <div className='new-post__input-error'>
              <input
                type='text' name='image' className='new-post__url' onChange={handleUrl}
                placeholder='url de la imagen' defaultValue={initialURL}
              />
              {urlError && <p className='new-post__error'>URL inválida</p>}
            </div>

            <div className='new-post__input-error'>
              <input
                placeholder='Agrega una descripción' name='description' className='new-post__descroption'
                defaultValue={initialDescription}
              />
              {descriptionError && <p className='new-post__error'>La descripción no puede ser vacía</p>}
            </div>
            <button className='new-post__button'>Publicar</button>
          </form>
        </div>
      </section>
    </main>
  )
}
