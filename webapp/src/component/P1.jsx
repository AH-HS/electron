import { Navigate, useNavigate } from "react-router";



// const handleDownload = async () => {
//     const res = 
//      // 将文件类型设置为 ZIP 格式
//     const contentType = 'application/zip';
//     let blob = new Blob([res], { type: contentType });
//     // let blob = new Blob([res], { type: 'text/csv;charset=utf-8;' });
//     let url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a"); // 创建a标签
//     link.href = url;
//     link.click();
//     URL.revokeObjectURL(url); // 释放内存
//   };


const download = (url)=>{
    const a = document.createElement("a")
    a.setAttribute("href","url")
    a.setAttribute("download","filename")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

const url = "http://localhost:5173/node_modules/vite/dist/client/env.mjs"

export const P1 = () => {
    const to = useNavigate();
 
    return (
        <div> 
            P1
            <button onClick={() => to(-1)}>back</button>
            <button onClick={()=>download(url)}>下载</button>
        </div>
    );
};
