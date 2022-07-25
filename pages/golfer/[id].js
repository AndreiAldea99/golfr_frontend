import { useRouter } from 'next/router'
// import useUser from '../../lib/useUser'
import ScoreCard from '../../components/ScoreCard'
import { useEffect, useState } from 'react'

const FEED_URL = `${process.env.NEXT_PUBLIC_API_URL}/golfer`

const Golfer = () => {
  const router = useRouter()
  const { id } = router.query

  const [ username, setUsername ] = useState(null)
  const [ scores, setScores ] = useState(null)

  useEffect(() => {
    const urlName = FEED_URL + '/' + id + '/name'
    const urlScores = FEED_URL + '/' + id + '/scores'

    const fetchDataName = async () => {
      try {
        const response = await fetch(urlName)

        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text)
          })
        }

        const json = await response.json()

        setUsername(json.user.name)

      } catch (error) {
        throw new Error(error)
      }
    }

    const fetchDataScores = async () => {
      try {
        const response = await fetch(urlScores)

        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text)
          })
        }

        const json = await response.json()

        setScores(json.user.scores)

      } catch (error) {
        throw new Error(error)
      }
    }

    if (router.isReady) {
      fetchDataName()
      fetchDataScores()
    }
  }, [ router.isReady, id ])

  return (
    <>
      <header className="flex flex-row w-full px-10 py-2 shadow">
        <span className="h-8 items-center text-xl ml-auto">
          {username}
        </span>
      </header>
      {
        <>
          {scores &&
            scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={score.user_name}
              />
            ))}
        </>
      }
    </>
  )
}

export default Golfer
