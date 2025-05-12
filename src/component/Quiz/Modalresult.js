import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Modalresult = (props) => {
    const { show, setshow, dataModalResult } = props;
    const handleClose = () => {
    setshow(false);

  };
    return (
            <div>
                <>
                <Modal show={show}
                    onHide={handleClose}
                    keyboard={false}
                    className='Modal-Result'
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='count'>
                            countCorrect: {dataModalResult.countCorrect}
                            
                        </div>
                        <div>
                            countTotal: {dataModalResult.countTotal}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
            
        </div>
    )
}
export default Modalresult;