import useSWR from 'swr'
import { getToken } from './userAuth'

export const GOLFERS_URL = `${process.env.NEXT_PUBLIC_API_URL}/golfers`

const useGolferName = id => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    return res.json().then(data => data.user.name)
  }

  const golferUrl = GOLFERS_URL + '/' + id
  const { data, error } = useSWR(golferUrl, fetcher)

  return {
    golferName: data,
    error: error && error.message,
  }
}

export default useGolferName
