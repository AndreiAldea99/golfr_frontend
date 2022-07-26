import { useRouter } from 'next/router'
import ScoreCard from '../../components/ScoreCard'
import useGolferName from '../../lib/useGolferName'
import useGolferScores from '../../lib/useGolferScores'

const Golfer = () => {
  const router = useRouter()
  const { id } = router.query

  const { golferName, errorGolfer } = useGolferName(id)
  const { golferScores, errorScores }  = useGolferScores(id)

  return (
    <>
      <header className="flex flex-row w-full px-10 py-2 shadow">
        <span className="h-8 items-center text-xl ml-auto">
          {golferName}
        </span>
      </header>
      {
        <>
          {golferScores &&
            golferScores.map(score => (
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
