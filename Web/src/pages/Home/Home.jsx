import { useEffect, useState } from 'react'
import './Home.css'
import Sidebar from '../../components/Sidebar.jsx'
import { getUserTimeline } from '../../services/user.js'
import { FeedPost } from '../../components/Posts/FeedPost.jsx'
import { toastError } from '../../utils/toastify.js'

export default function Home ({ currentUser }) {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserTimeline()
        setTimeline(data.timeline || [])
      } catch (error) {
        toastError(error)
      }
    }
    )()
  }, [])

  return (
    <main className='home__main'>
      <Sidebar currentUser={currentUser} />

      <section className='feed'>
        {timeline.length === 0
          ? (
            <div className='feed__empty'>
              <h2>Hola {currentUser?.name}, bienvenido a Instagram!</h2>
              <p>Aquí aparecerán tus publicaciones y las de tus amigos.</p>
            </div>
            )
          : (
              timeline.map(post => <FeedPost
                initialPost={post} currentUser={currentUser}
                key={post.id}
                                   />)
            )}
      </section>
    </main>
  )
}
