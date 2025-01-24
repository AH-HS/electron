import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const P2 = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const headers = { nmb: 112 }
        fetch('https://npmrank.net/api/ranking/packages/last-day?top=200', {
            method: 'GET',
            mode: "cors"
        }).then(async data => {
            const data1 = await data.json()
            console.log(data1)
        })
    }, [])

    const handleSend = async () => {

        const res = await fetch("http://192.168.101.209:8081", {
            method: "POST",
            body: JSON.stringify({ s: 1 })
        }).catch(() => {
            console.error("网络异常");
        })
        if (!res.ok) {
            console.error("服务器异常");
        }
        console.log(res.body);
        res.body


    }

    return (
        <div className="flex flex-col">
            <Link to="/a">to a</Link>
            <Button onClick={handleSend} >send</Button>
        </div>
    )
}
