import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import Login from './Component/SignIn';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')
export default   function Prueba(){

  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }
    return (
      <>
      <Button variant="text" color ="inherit" onClick={openModal}>
                        Iniciar Sesion
                    </Button>
       

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <Login/>
        </Modal>
      </>
    );
}
