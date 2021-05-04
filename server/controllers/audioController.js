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
    console.log(id);
    await Song.findById(id, (err, result) => {
        const data = result.file;
        const head = {
            'Content-Type': 'audio/mpeg',
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