import {useQuery, UseQueryResult} from "react-query";


const useGetDevContainers = (): UseQueryResult<any> => {
    const fetchTestContainers = async(): Promise<any> => {
       return await fetch('http://localhost:3003/db').then(res => res.json())
    }

    return useQuery(
        ['devContainers'],
        () => fetchTestContainers(),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    )
}

export default useGetDevContainers