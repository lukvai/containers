import {useQuery, UseQueryResult} from "react-query";


const useGetTestContainers = (): UseQueryResult<any> => {
    const fetchTestContainers = async(): Promise<any> => {
       return await fetch('http://localhost:3003/db').then(res => res.json())
    }

    return useQuery(
        ['testContainers'],
        () => fetchTestContainers(),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    )
}

export default useGetTestContainers