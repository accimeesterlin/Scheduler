
import React from "react";
import { Form, Button } from "semantic-ui-react";

const FormComponent = ({
    submit_result,
    get_values
}) => {

    return (
        <Form size={"small"} >
            <Form.Group widths='equal'>
                <Form.Field
                    label='Name'
                    control='input'
                    name="name"
                    placeholder='Name...'
                    onChange={get_values} />
                <Form.Field
                    label='Phone number'
                    control='input'
                    name="phoneNumber"
                    type="number"
                    placeholder='(xxx) xxx-xxxx'
                    onChange={get_values} />
            </Form.Group>
            <Button type='submit' onClick={submit_result}>Submit</Button>
        </Form>
    );
};

export default FormComponent;