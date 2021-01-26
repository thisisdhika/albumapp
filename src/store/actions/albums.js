import { FETCH_ALBUMS_BEGIN, FETCH_ALBUMS_ERROR, FETCH_ALBUMS_SUCCESS } from '../constants'
import { serializeObjectParams } from '../../helpers'
import { getUsers } from './users'

export const fetchBegin = () => ({
  type: FETCH_ALBUMS_BEGIN,
})

export const fetchError = error => ({
  type: FETCH_ALBUMS_ERROR,
  payload: {
    error,
  },
})

export const fetchSuccess = data => ({
  type: FETCH_ALBUMS_SUCCESS,
  payload: {
    data,
  },
})

export const getAlbums = (params = {}) => async dispatch => {
  const endpoint = `https://jsonplaceholder.typicode.com/albums?${serializeObjectParams(params)}`

  dispatch(fetchBegin())

  try {
    /**
     * Get The Users
     */
    const users = await getUsers()(dispatch)

    /**
     * Get The Albums
     */
    const response = await fetch(endpoint)
    const jsonData = await response.json()

    /**
     * Assign User data to Each Album Item
     */
    const data = jsonData.map(album => ({
      ...album,
      user: users.find(user => user.id === album.userId),
    }))

    dispatch(fetchSuccess(data))

    return data
  } catch (error) {
    dispatch(fetchError(error))

    throw error
  }
}
