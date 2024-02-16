import React, { useEffect, useState } from 'react'
import { RESULTS } from '../utils/constants'
import fetchUserData from '../api/user'
import '../assets/css/user-section.css'

export default function userSectionComponent() {

  // State for User Info
  const [ results, setResults ] = useState([])
  const [ loading, setLoading ] = useState(false)

  // Fires an API call to get new user data
  const getUser = async () => {

    // Initialize loading state
    setLoading(true)

    // Remove data from local storage to refresh
    localStorage.removeItem(RESULTS);
    
    await fetchUserData()
      .then( response => {

        const { data: { results } } = response

        setResults(results)
        
        // Add results to local storage
        localStorage.setItem(RESULTS, JSON.stringify(results));
      })
      .finally(() => {
        // End loading state 
        setLoading(false) 
      })

  }

  // Populate user info once component is mounted
  useEffect(() => {
    if (localStorage.getItem(RESULTS) === null) {
      getUser()
    } else {
      setResults(JSON.parse(localStorage.getItem(RESULTS)))
    }
  }, [])

  
  console.log()

  return (
    <section className='user-section'>
      { results.map(({ name: { title, first, last }, email }, index) => {
        return (
          <div key={ index }>
            <label>Name: </label> { loading ? '...' : `${ title } ${ first } ${ last }` }
            <br />
            <label>Email: </label> { loading ? '...' : email }
          </div>
        )
      }) }
      <div className='refresh-section'>
        <button className={ `btn-refresh ${ loading ? 'disabled' : ''}` } disabled={ loading } onClick={ getUser }>Refresh</button>
      </div>
    </section>
  )
}
