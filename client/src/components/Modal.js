import React from "react";
import { Button, Modal } from "semantic-ui-react";


const ModalComponent = ({ size, open, current_user: { edit, selected }, children, edit_status, close }) => {

    return (
        <Modal size={size} open={open} onClose={close}>
            <Modal.Header>
                {selected && !edit ? "This is your information" :
                    (selected ? "Edit your info" : "Enter name and phone number")}
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => edit_status(!edit)}>
                    {!edit && selected ? "Edit time" : "See time"}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalComponent;


