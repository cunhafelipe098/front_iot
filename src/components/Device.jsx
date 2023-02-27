import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import styles from './Device.module.css'

export function Device ({content, onDeleteDevice}) {

    function handleDeleteDevice () {
        onDeleteDevice(content);
    }

    return (
        <div className={styles.device}>
            
            <div className={styles.deviceBox}>
                <div className={styles.deviceContent}>
                    <header>
                        
                        <div className={styles.componente}>
                            <strong>{content.device_id}</strong>
                            <strong>{content.nickname}</strong>
                            <strong>{content.name}</strong>
                        </div>

                        <button onClick={handleDeleteDevice} title="Deletar device">
                            <Trash size={20}/>
                        </button>
                    </header>
                </div>
            </div>
        </div>
    )
} 