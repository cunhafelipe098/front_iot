import { Device } from './Device'
import styles from './Post.module.css'
import { api } from '../lib/axios'

import { useEffect, useState } from 'react'

export function Post() {

    const [devices, setDevices] = useState([])

    useEffect(() => {
        searchDevices();
    }, [])
    
    async function searchDevices () {
        const response = await api.get('/device')
        console.log(response);
        setDevices(response.data);
    }
    
    const [newDeviceId, setNewDeviceId] = useState('')
    const [newDeviceName, setNewDeviceName] = useState('')
    const [newDeviceNickName, setNewDeviceNickName] = useState('')
    async function handleCreateNewDevice() {
        event.preventDefault()
        const response = await api.post('/device', {
            device_id: newDeviceId,
            name: newDeviceName, 
            nickname: newDeviceNickName
        })
        setDevices([...devices, {_id: response.data._id, device_id: newDeviceId, name: newDeviceName, nickname: newDeviceNickName}]);
        setNewDeviceId('')
        setNewDeviceName('')
        setNewDeviceNickName('')
    } 

    function handleNewDeviceChangeId() {
        event.target.setCustomValidity('')
        setNewDeviceId(event.target.value)
    }
    function handleNewDeviceChange() {
        event.target.setCustomValidity('')
        setNewDeviceName(event.target.value)
    }
    function handleNewDeviceChangeNicName() {
        event.target.setCustomValidity('')
        setNewDeviceNickName(event.target.value)
    }
    function handleNewDeviceInvalid () {
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    async function deleteDevice(deviceToDelete) {
        const response = await api.delete(`/device/${deviceToDelete._id}`)
        const devicesWithoutDeletOne = devices.filter(device => device._id !== deviceToDelete._id)
        setDevices(devicesWithoutDeletOne)
    }

    const isNewDeviceEmpty = (
        (newDeviceId.length === 0) &&
        (newDeviceName.length === 0) && 
        (newDeviceNickName.length === 0)
    );

    return (
        <article className={styles.post}>          
            <form onSubmit={handleCreateNewDevice} className={styles.deviceForm}>
                <strong>Cadastrar novo dispositivo IOT</strong>
                <input 
                    name="serie"
                    placeholder="Número de série"
                    type="number"
                    value={newDeviceId}
                    onChange={handleNewDeviceChangeId}
                    onInvalid={handleNewDeviceInvalid}
                    required
                />
                <textarea
                    name="deviceNickName"
                    placeholder="Apelido"
                    value={newDeviceNickName}
                    onChange={handleNewDeviceChangeNicName}
                    onInvalid={handleNewDeviceInvalid}
                    required
                />
                <textarea 

                    name="deviceName"
                    placeholder="Nome"
                    value={newDeviceName}
                    onChange={handleNewDeviceChange}
                    onInvalid={handleNewDeviceInvalid}
                    required
                />
                <footer>
                    <button disabled={ isNewDeviceEmpty } type="submit">Criar</button>
                </footer>
            </form>

            <div className={styles.deviceList}>
                {devices.map(
                    (device) => { 
                        return (
                            <Device 
                                key={device._id}
                                content={device}
                                onDeleteDevice={deleteDevice}
                            />
                        )
                    }
                )}                           
            </div>
        </article>
    )
}
