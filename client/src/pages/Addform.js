import React, {useState} from 'react';
import {Button, Container, Form, FormGroup, Input, Label, Media} from "reactstrap";
import axios from 'axios';
import FileBase from 'react-file-base64';

export const AddForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        fileName: '',
        cover: '',
        file: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/audio/add', formData);
        setFormData({
            name: '',
            fileName: '',
            cover: '',
            file: ''
        });

    }
    const toBuffer = (data) => {
        let buffer = new Buffer(data.byteLength);
        let view = new Uint8Array(data);
        for (let i = 0; i < buffer.length; ++i) {
            buffer[i] = view[i];
        }
        console.log(buffer)
        return buffer;
    }
    const handleFile = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) setFormData({
                ...formData,
                file: toBuffer(reader.result),
                fileName: e.target.files[0].name
            })
        }
        if (e.target.files[0] !== undefined) {
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    return (
        <Container className="mt-2 mx-2 ">
            <h3 className="mt-2">Add Song</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name: </Label>
                    <Input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <Label>Song File: </Label>
                    <Input type="file" onChange={(e) => handleFile(e)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Cover: </Label><br/>
                    <FileBase type="file" multiple={false}
                              onDone={({base64}) => setFormData({...formData, cover: base64})}/>
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Submit</Button>
                </FormGroup>
                <audio src={formData.file} autoPlay/>
            </Form>
        </Container>
    )
}