import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import USER_INFO_URL from '../utils/constants'

export default function userSectionComponent() {

  const [ results, setResults ] = useState([])

  const fetchUserData = async () => {
    const { data: { results } } = await Axios.get(USER_INFO_URL)
    .then(response => {
      // clear local storage
      return response
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
      // loading false?
      // set local storage
    });
    setResults(results)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <section>
      { results.map(({ name: { title, first, last }, email }) => {
        return (
          <div>
            <label>Name: </label> { title } { first } { last }
            <br />
            <label>Email: </label> { email }
          </div>
        )
      }) }
      <button onClick={ fetchUserData }>Refresh</button>
    </section>
  )
}
