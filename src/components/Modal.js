import { useEffect, useState } from 'react';
import './Modal.css'
function Modal({modalName, close}) {
    let [gif, setGif] = useState("")

    useEffect(() => {
        async function askGif() {
            let gifResponse = await fetch(`http://api.giphy.com/v1/gifs/search?q=${modalName}&api_key=bZvle0mAld1pODg1HUfinKCCqI5enSwy&limit=1`)
            gifResponse = await gifResponse.json()
            setGif(gifResponse.data[0].images.original.url)
        } 
        askGif()
    }, [])

    return ( 
        <div className="modal-wrapper">
            <div className='inner-modal-wrapper'>
                <div className='modal'>
                    <button onClick={close}>X</button>
                    <p>Rented <span>"{modalName}"</span> Sucessfully!</p>
                    <img src={gif}/>
                </div>
            </div>
        </div>
     );
}

export default Modal;