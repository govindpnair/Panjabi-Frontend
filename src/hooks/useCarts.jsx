import { useQuery } from "@tanstack/react-query";
import { axiosSecur } from "./useAxiosSecur";
import useAuthContext from "./useAuthContext";


const useCarts = () => {
    const {user} = useAuthContext()
    const {data: cart=[], refetch} = useQuery({
        queryKey : ['carts', user?.email],
        queryFn :async () =>{
            const res = await axiosSecur.get(`/carts?email=${user.email}`);
            return res.data
        }
    })
    return [cart, refetch]
};

export default useCarts;