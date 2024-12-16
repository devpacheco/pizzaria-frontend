import { Orders } from "./components/order";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";
export const dynamic = 'force-dynamic';

async function getOrders(): Promise<OrderProps[] | []> {
    try{
        const token = await getCookieServer();

        const response = await api.get("/orders",{
            headers:{
                Authorization: `Bearer ${ token } `
            }
        })

        return response.data || []

    }catch(err){
        console.log(err);
        return [];
    }
}

export default async function Deashboard(){

    const orders = await getOrders();

    console.log(orders);

    return(
        <>
            <Orders orders={ orders } />
        </>
    )
}