//IMPORTS DE CSS
import styles from "./sytles.module.scss"

//IMPORT DE COMPONENTS
import { Button } from "@/app/dashboard/components/button";
import { getCookieServer } from "@/lib/cookieServer";

//IMPORT DE FUNCIONALIDADES
import { redirect } from "next/navigation";

//IMPORT DA API
import { api } from "@/services/api";

export default function Category(){

    async function handleRegisterCategory(formData: FormData){
        "use server"

        const name = formData.get("name")

        if(name === "") return;

        const data ={
            name: name,
        }

        const token = await getCookieServer();

        const response = await api.post("/category", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err)=>{
            console.log(err);
            return;
        })

        redirect("/dashboard")

    }

    return(
        <main className={ styles.container }>
            <h1> Nova Categoria </h1>

            <form 
                className={ styles.form }
                action={ handleRegisterCategory }
            >
                <input 
                type="text"
                name="name"
                placeholder="Nome da categoria, ex: Pizzas"
                required
                className={ styles.input }
                />

                <Button name="Cadastrar" />

            </form>
        </main>
    )
}