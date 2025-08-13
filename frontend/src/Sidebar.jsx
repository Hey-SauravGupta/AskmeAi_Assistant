//  import "./Sidebar.css";
// import { useContext, useEffect } from "react";
// import { MyContext } from "./MyContext.jsx";
// import {v1 as uuidv1} from "uuid";

// function Sidebar() {
//     const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

//     const getAllThreads = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread`);
//             const res = await response.json();
//             const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
//             //console.log(filteredData);
//             setAllThreads(filteredData);
//         } catch(err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getAllThreads();
//     }, [currThreadId])


//     const createNewChat = () => {
//         setNewChat(true);
//         setPrompt("");
//         setReply(null);
//         setCurrThreadId(uuidv1());
//         setPrevChats([]);
//     }

//     const changeThread = async (newThreadId) => {
//         setCurrThreadId(newThreadId);

//         try {
//           const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread/${newThreadId}`);

//             const res = await response.json();
//             console.log(res);
//             setPrevChats(res);
//             setNewChat(false);
//             setReply(null);
//         } catch(err) {
//             console.log(err);
//         }
//     }   

//     const deleteThread = async (threadId) => {
//         try {
//            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread/${threadId}`, {method: "DELETE"});
//             const res = await response.json();
//             console.log(res);

//             //updated threads re-render
//             setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

//             if(threadId === currThreadId) {
//                 createNewChat();
//             }

//         } catch(err) {
//             console.log(err);
//         }
//     }

//     return (
//         <section className="sidebar">
//             <button onClick={createNewChat}>
//                <img src="/blacklogo.svg" alt="gpt logo" className="logo"></img>
//                 <span><i className="fa-solid fa-pen-to-square"></i></span>
//             </button>


//             <ul className="history">
//                 {
//                     allThreads?.map((thread, idx) => (
//                         <li key={idx} 
//                             onClick={(e) => changeThread(thread.threadId)}
//                             className={thread.threadId === currThreadId ? "highlighted": " "}
//                         >
//                             {thread.title}
//                             <i className="fa-solid fa-trash"
//                                 onClick={(e) => {
//                                     e.stopPropagation(); //stop event bubbling
//                                     deleteThread(thread.threadId);
//                                 }}
//                             ></i>
//                         </li>
//                     ))
//                 }
//             </ul>
 
//             <div className="sign">
//                 <p>By Saurav Gupta&hearts;</p>
//             </div>
//         </section>
//     )
// }

// export default Sidebar;



import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    // Make sure 'isSidebarOpen' and 'toggleSidebar' are here
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats, isSidebarOpen, toggleSidebar } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread`);
            const res = await response.json();
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId])


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
        if (window.innerWidth <= 768) {
            toggleSidebar(); // Mobile par sidebar band karega
        }
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread/${newThreadId}`);
            const res = await response.json();
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
            if (window.innerWidth <= 768) {
                toggleSidebar(); // Mobile par sidebar band karega
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread/${threadId}`, { method: "DELETE" });
            await response.json();
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
            if (threadId === currThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    }

    // YEH LINE SABSE ZAROORI HAI
    return (
        <section className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <button onClick={createNewChat}>
                <img src="/blacklogo.svg" alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>


            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx}
                            onClick={() => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted" : ""}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>

            <div className="sign">
                <p>By Saurav Gupta&hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;