import React, {useState} from 'react';
import {Container, Form, FormGroup, Input, Label} from "reactstrap";

export const AddForm = () => {
    const [formData,setFormData] = useState({
        name:'',
        file:''
    })

    const handleSubmit = () =>{

    }

    const handleFile = (e) =>{
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2 ) setFormData({...formData,file: reader.result})
        }
        if(e.target.files[0] !== undefined) reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <Container>
            asdasd
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Song File: </Label>
                    <Input type="file" onChange={(e)=>handleFile(e)}/>
                </FormGroup>
            </Form>
        </Container>
    )
}