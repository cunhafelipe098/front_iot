import styles from './Sidebar.module.css'

import { socket } from '../lib/socket'
import { useEffect, useState } from 'react'

export function Sidebar() {

    const [devicesData, setDevicesData] = useState([])
    const [device, setDevice] = useState([])

    function reciveDataWebsocket () {
        socket.on('message', (data) => {
            setDevice({
                device_id: data.device_id, 
                data: {
                    type: data.newData[0].type,
                    value: data.newData[0].value,
                    measure: data.newData[0].measure
                }
            })
        });
    }

    useEffect(() => {
        reciveDataWebsocket();
    }, [])

    function reciveData () {
        socket.on('message', (data) => {
            setDevicesData([...devicesData, {
                device_id: data.device_id, 
                data: {
                    type: data.newData[0].type,
                    value: data.newData[0].value,
                    measure: data.newData[0].measure
                }
            }])
        });
    }

    useEffect(() => {
        reciveData();
    }, [device])

    return (
        <div>
            <aside className={styles.sidebar}>

                <div name="s1" className={styles.deviceData}>
                    <strong>Dados Recebidos via WebSocket</strong>
                    <strong>Número de série</strong>
                    <span>{devicesData[devicesData.length-1]?.device_id}</span>
                    <strong>Valor</strong>
                    <span>{devicesData[devicesData.length-1]?.data.value}</span>
                    <strong>Unidade de medida</strong>
                    <span>{devicesData[devicesData.length-1]?.data.measure}</span>
                </div>
            </aside>
            <aside name="s2"className={styles.sidebar}>
                <div className={styles.deviceData}>
                    <strong>Número de série</strong>
                    <span>{devicesData[devicesData.length-2]?.device_id}</span>
                    <strong>Valor</strong>
                    <span>{devicesData[devicesData.length-2]?.data.value}</span>
                    <strong>Unidade de medida</strong>
                    <span>{devicesData[devicesData.length-2]?.data.measure}</span>
                </div>
            </aside>
            <aside name="s3" className={styles.sidebar}>
                <div className={styles.deviceData}>
                    <strong>Número de série</strong>
                    <span>{devicesData[devicesData.length-3]?.device_id}</span>
                    <strong>Valor</strong>
                    <span>{devicesData[devicesData.length-3]?.data.value}</span>
                    <strong>Unidade de medida</strong>
                    <span>{devicesData[devicesData.length-3]?.data.measure}</span>
                </div>
            </aside>
        </div>
    )
}