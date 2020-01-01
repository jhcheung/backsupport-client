// headers --> use these at your own discretion
// const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}
// urls
const usersUrl = 'http://localhost:3000/api/v1/users'
const ticketsUrl = 'http://localhost:3000/api/v1/tickets'
const messagesUrl = 'http://localhost:3000/api/v1/messages'
const loginUrl = 'http://localhost:3000/api/v1/login'
const profileUrl = 'http://localhost:3000/api/v1/profile'
const defaultHeaderObj = {
    headers: {
        Authorization: `Bearer ${localStorage.token}`
    }
}



// parse incoming data
const parseData = response => response.json()
// error handler
const catchError = error => console.log(`%c${error}`, 'color: red;')

//////////////////////////////////////////////////////

export const fetchUsers = () => fetch(usersUrl)
.then(parseData)
.catch(catchError)


export const createUser = (newUser) => {
    const createUserObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newUser)
    }

    return fetch(usersUrl, createUserObj)
            .then(parseData)
            .catch(catchError)
}

export const login = (userCreds) => {
    const loginObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(userCreds)
    }
    return fetch(loginUrl, loginObj)
            .then(parseData)
            .catch(catchError)
}

//////////////////////////////////////////////////////

export const fetchTickets = () => fetch(ticketsUrl, defaultHeaderObj)
.then(parseData)
.catch(catchError)

export const createTicket = (newTicket) => {
    const createTicketObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(newTicket)
    }

    return fetch(ticketsUrl, createTicketObj)
            .then(parseData)
            .catch(catchError)
}


//////////////////////////////////////////////////////

export const fetchMessages = () => fetch(messagesUrl, defaultHeaderObj)
.then(parseData)
.catch(catchError)

export const createMessage = (newMessage) => {
    const createMessageObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(newMessage)
    }

    return fetch(messagesUrl, createMessageObj)
            .then(parseData)
            .catch(catchError)
}


//////////////////////////////////////////////////////


export const fetchProfile = () => { 
    const profileObj = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    }
    return fetch(profileUrl, profileObj)
        .then(parseData)
        .catch(catchError)
}
