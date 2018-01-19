
import React from "react";
import { Form, Button } from "semantic-ui-react";

const FormComponent = ({
    submit_result,
    get_values,
    current_user
}) => {

    console.log("Current User: ", current_user);

    return (
        <Form size={"small"} >
            <Form.Group widths='equal'>
                <Form.Field
                    label='Name'
                    control='input'
                    name="name"
                    value = {current_user.info ? current_user.info.name : ''}
                    placeholder='Name...'
                    onChange={get_values} />
                <Form.Field
                    label='Phone number'
                    control='input'
                    name="phoneNumber"
                    type="number"
                    value = {current_user.info ? current_user.info.phoneNumber : ''}
                    placeholder='(xxx) xxx-xxxx'
                    onChange={get_values} />
            </Form.Group>
            <Button type='submit' onClick={submit_result}>Submit</Button>
        </Form>
    );
};

export default FormComponent;