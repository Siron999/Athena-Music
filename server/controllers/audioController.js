import fs from "fs";
import Song from "../models/songs.js";
import mongoose from 'mongoose';
import {Duplex} from 'stream';
import { Readable } from 'stream'

export const addSong = async (req, res) => {
    const song = req.body;
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
    const range=req.headers.range;
    await Song.findById(id, (err, result) => {
        const data = result.file;
        const fileSize = Buffer.byteLength(data)
        const CHUNK_SIZE = 10 ** 6;
        console.log(CHUNK_SIZE)// 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            'Content-Length': fileSize,
            'Content-Type': 'audio/mp3',
        };
        res.writeHead(200, head);
        const file= Readable.from(data);
        file.pipe(res);
    });
};

export const getAll = async (req, res) => {
   const data= await Song.find({},'id name');
    res.send(data);
}