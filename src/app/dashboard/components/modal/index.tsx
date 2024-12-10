"use client";

import styles from "./styles.module.scss";
import { X } from 'lucide-react'
import { use } from "react";
import { OrderContext } from "@/providers/order";
import { calculateTotalOrder } from "@/lib/helper"

export function Modalorder(){
    const { onRequestClose, order, finishOrder } = use(OrderContext);

    function handleFinishOrder(){
        finishOrder(order[0].order.id)
    }

    return(
        <dialog className={ styles.dialogContainer }>
            <section className={ styles.dialogContent } >
                <button onClick={onRequestClose} className={ styles.dialogBack }>
                    <X size={40} color="#FF3f4b" />
                </button>{/* FIM DO BUTTON */}

                <article className={styles.container}>
                    <h2> Detalhes do pedido </h2>

                    <span className={ styles.table }>
                        Mesa <b>{order[0].order.table}</b>
                    </span>

                    {order[0].order?.name && (
                        <span className={ styles.table }>
                            Nome da Mesa <b>{order[0].order.name}</b>
                        </span>
                    )}

                    {order.map((item)=>(
                        <section key={item.id} className={ styles.item } >
                            <span> 
                                Qtd: {item.amount} - <b> {item.product.name} </b> - R$ {parseFloat(item.product.price) * item.amount}
                            </span>
                            <span className={ styles.description }> {item.product.description} </span>
                        </section> 
                    ))}
                    {/* FIM DA INFO DO ITEM */}

                    <h3 className={ styles.total }> Valor total: R$ {calculateTotalOrder(order)} </h3>

                    <button onClick={handleFinishOrder} className={ styles.buttonOrder }>
                        Concluir pedido
                    </button>

                </article>{/* FIM DO ARTICLE CONTAINER */}

            </section>{/* FIM DA SECTION DIALOG CONTAINER */}
        </dialog>
    )
}