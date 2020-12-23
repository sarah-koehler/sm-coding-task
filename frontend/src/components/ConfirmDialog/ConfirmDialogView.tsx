import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    show: boolean,
    onHide: () => any,
    onConfirm: (() => any) | null,
    children: (JSX.Element | string | null)[] | JSX.Element | string | null,
};

const ConfirmDialog = ({
    children, show, onHide, onConfirm,
}: Props): JSX.Element => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm || undefined}>
                OK
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ConfirmDialog;
