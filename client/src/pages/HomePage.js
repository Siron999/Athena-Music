import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container} from "reactstrap";
import '../index.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const HomePage = () => {
    const URL = "http://localhost:4000/audio";
    const [allSongs, setAllSongs] = useState([]);
    const [currentSong, setCurrentSog] = useState('');


    useEffect(() => {
        axios.get(`${URL}/all`).then((result) => {
            const {data} = result;
            console.log(data)
            setAllSongs(data);
        });

    }, []);

    const handleSong = (id) => {
        console.log(id);
        setCurrentSog(id);
    }

    // const updateSong = () => {
    //     if (audioRef.current) {
    //         audioRef.current.pause();
    //         audioRef.current.load();
    //         audioRef.current.play();
    //     }
    // }
    return (
        <Container className="d-flex flex-column justify-content-between mx-2 mt-2" style={{height: "95vh"}}>
            <div>
                <h2>Songs</h2>
                <div className="d-flex flex-column align-items-start">
                    {(allSongs !== []) ?
                        allSongs.map((song, i) =>
                            <div key={i} className="my-1" onClick={() => {
                                handleSong(song._id)
                            }} style={{cursor: "pointer"}}>
                                 <h5>{i + 1}. {song.name}</h5>
                            </div>)
                        : null
                    }
                </div>
            </div>
            <div>
                <AudioPlayer
                    autoPlay
                    src={`${URL}/song/${currentSong}`}
                    className="custom-media"
                />
            </div>
        </Container>
    )
}