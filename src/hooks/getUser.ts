import { QueryClientProvider, useQuery  } from "react-query"
export default (token : string | null) => {
    const fetchUser = async () => {
        const res = await fetch('http://localhost:8080/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.json()
    }

    const something = useQuery('users', fetchUser)
}