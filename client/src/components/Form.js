
import React from "react";
import { Form, Button } from "semantic-ui-react";



const FormComponent = ({
    submit_result,
    get_values,
    current_user
}) => {

    let name, phoneNumber, info;

    try {
        name = current_user.info.name;
        phoneNumber = current_user.info.phoneNumber;
        info = current_user.info;
    } catch (error) {
        
    }

    return (
        <Form size={"small"} >
            <Form.Group widths='equal'>
                <Form.Field
                    label='Name'
                    control='input'
                    name="name"
                    value = {info ? name : ''}
                    placeholder='Name...'
                    onChange={get_values} />
                <Form.Field
                    label='Phone number'
                    control='input'
                    name="phoneNumber"
                    type="tel"
                    value = {info ? phoneNumber : ''}
                    placeholder='xxx-xxx-xxx'
                    onChange={get_values} />
            </Form.Group>
            <Button type='submit' onClick={submit_result}>Submit</Button>
        </Form>
    );
};

export default FormComponent;