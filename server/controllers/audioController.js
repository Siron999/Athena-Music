import fs from "fs";
import Song from "../models/songs.js";
import mongoose from 'mongoose';
import {Duplex} from 'stream';
import {Readable} from 'stream'

export const addSong = async (req, res) => {
    let song = req.body;
    const file = song.file.data;
    const buffer = new Buffer(file);
    console.log(song.fileName)
    fs.writeFile(`audio/${song.fileName}`, buffer, () => {
        console.log("created")
    })
    delete song.file;
    const newSong = new Song(song);
    try {
        await newSong.save();
        res.status(201).json(newSong);
    } catch (error) {
        res.status(409).json(error);
    }

};


export const getAudio = async (req, res) => {
    const id = req.params.id;
    const range = req.headers.range;

    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const {fileName} = await Song.findOne({_id: id}, 'fileName');
    console.log(fileName);

    // get video stats (about 61MB)
    const videoPath = `audio/${fileName}`;
    const videoSize = fs.statSync(videoPath).size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);

};


export const getAll = async (req, res) => {
    const data = await Song.find({}, 'id name');
    res.send(data);
}