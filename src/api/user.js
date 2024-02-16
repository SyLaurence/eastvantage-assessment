import Axios from 'axios'
import { USER_INFO_URL, RESULTS } from '../utils/constants'

// Fetching user data from API
const fetchUserData = async () => {
    // API Call
    const response = await Axios.get(USER_INFO_URL)
    .then( response => {
        return response
    })
    .catch( error => {
        // Console.log for dev bugging purposes only
        console.log(error);
    })
    return response
}

export default fetchUserData