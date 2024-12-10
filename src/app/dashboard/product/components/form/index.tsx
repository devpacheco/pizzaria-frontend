"use client";

//IMPORT DO CSS
import styles from "./styles.module.scss"

//IMPORT DE ICONS
import { UploadCloud } from "lucide-react";

//IMPORT DE FUNCIONALIDADES
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

//IMPORT DE COMPONENTS
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { toast } from "sonner";

interface CategoryProps {
    id: string;
    name: string;
}

interface Props {
    categories: CategoryProps[]
}

export function Form({ categories }: Props){
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");
    const router = useRouter();

    //ÍNICIO DA REGISTER PRODUCT
    async function handleRegisterProduct(formData: FormData){

        const categoryIndex = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if(!name || !description || !price || !categoryIndex || !image ){
            return;
        }

        const data = new FormData();

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        const token = getCookieClient();

        await api.post("/product", data, {
            headers:{
                Authorization: ` Bearer ${ token }` 
            }
        })
        .catch((err)=>{ 
            console.log(err);
            toast.warning("FALHA AO CADASTRAR PRODUTO!!")
            return;
        })

        toast.success("PRODUTO CADASTRADO COM SUCESSO!!")
        router.push("/dashboard")

    }


    //ÍNICIO DA HANDLE FILE
    async function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0];

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                toast.warning("FORMATO PROIBIDO")
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image))
        }
    }


    return(
        <main className={ styles.container }>
            <h1> Novo Produto </h1>

            <form className={styles.form} action={handleRegisterProduct} >
                <label className={ styles.labelImage } >
                    <span>
                        <UploadCloud size={30} color="#FFF"/>
                    </span>

                    <input 
                        type="file" 
                        accept="image/png, image/jpeg"
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                        alt="Image de Preview"
                        src={previewImage}
                        className={ styles.preview }
                        fill={ true }
                        quality={100}
                        priority={ true }
                        />
                    )}
                </label>{ /* FIM DO LABEL */ }

                <select name="category">
                    {categories.map( (category, index) => (
                        <option key={category.id} value={ index }> {category.name} </option>
                    ))}
                </select>

                <input 
                type="text" 
                name="name"
                placeholder="Digite o nome do produto..."
                required
                className={ styles.input }
                />

                <input 
                type="text" 
                name="price"
                placeholder="Preço do produto..."
                required
                className={ styles.input }
                />

                <textarea 
                name="description"
                placeholder="Digite a descrição do produto..."
                required 
                className={ styles.input }
                ></textarea>

                <Button name="Cadastrar produto" />
                
            </form>{ /* FIM DO FORM */ }
        </main>
    )
}