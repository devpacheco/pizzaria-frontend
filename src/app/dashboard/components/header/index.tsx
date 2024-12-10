"use client"

//IMPORT DE COMPONENTS
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

//IMPORT DO CSS
import styles from "./styles.module.scss";

//IMPORT DE IMAGES
import Image from "next/image";
import logoImg from '/public/logo.svg';

//IMPORTS DE ICONS
import { LogOutIcon } from "lucide-react";

//IMPORT DE COOKIES
import { deleteCookie } from "cookies-next";

export function Header(){
    const router = useRouter();

    async function handleLogout(){
        deleteCookie("session", { path: "/" })
        toast.success("LOGOUT REALIZADO COM SUCESSO!!")
        router.replace("/")
    }

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        alt="Logo Sujeito Pizza"
                        src={ logoImg }
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product">
                        Produto
                    </Link>


                    <form action={ handleLogout }>
                        <button type="submit">
                            <LogOutIcon size={24} color="#FFF" />
                        </button>
                    </form>{/* FIM DO FORM */}

                </nav>{/* FIM DO NAV */}

            </div> {/* FIM DA CONTENT */}
        </header>
    )
}