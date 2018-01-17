import React from "react";
import { Button, Modal, Divider, Form } from 'semantic-ui-react';


const ModalComponent = ({ size, open, edit, current_user, children, edit_status, close}) => {
    
    return (
        <Modal size={size} open={open} onClose={close}>
            <Modal.Header>
                {current_user.selected && edit ? "This is your information" :
                    (current_user.selected ? "Edit your info" : "Enter name and phone number")}
            </Modal.Header>
            <Modal.Content>
                { children }
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => edit_status(edit)}>
                    {edit && current_user.selected ? "Edit time" : "See time"}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalComponent;


