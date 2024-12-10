//IMPORT DE FUNCIONALIDADES
import Image from "next/image";
import Link from "next/link";
import logoImg from "/public/logo.svg";
import { redirect } from "next/navigation"

//IMPORT CSS
import styles from "./signup.module.scss";

//IMPORT DE API
import { api } from "@/services/api";




export default function Signup(){

    async function handleRegister(formData: FormData){
      "use server"

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      if(name === "" || email === "" || password === ""){
        console.log("PREENCHA TODOS OS CAMPOS")
        return;
      }

      try{
        api.post("/users",{
          name,
          email,
          password
        })
      }catch(err){
        console.log("error")
        console.log(err)
      }

      redirect("/")

    }


    return(
        <>
      <div className={styles.containerCenter} >
        <Image 
          src={logoImg}
          alt="Logo da pizzaria"
        />

        <section className={styles.login}>

            <h1>Criando a sua conta</h1>

          {/* INÍCIO DO FORM */}
          <form action={handleRegister}>

            {/* INÍCIO DO NAME */}
            <input 
              type="text"
              required 
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            /> {/* FIM DO NAME */}

            {/* INÍCIO DO EMAIL */}
            <input 
              type="email"
              required 
              name="email"
              placeholder="Digite seu email..."
              className={styles.input}
            /> {/* FIM DO EMAIL */}

            {/* INÍCIO DO PASSWORD */}
            <input 
              type="password"
              required 
              name="password"
              placeholder="informe sua password..."
              className={styles.input}
            /> {/* FIM DO PASSWORD */}

            <button type="submit">
              Cadastrar
            </button>

          </form> {/* FIM DO FORM */}

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça Login
          </Link>

        </section>
      </div>
        </>
    )
}