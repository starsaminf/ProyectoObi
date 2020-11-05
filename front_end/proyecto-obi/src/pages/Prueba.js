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
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000000';
  }

  function closeModal(){
    setIsOpen(false);
  }
    return (
      <div>

        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={openModal}
              >
              Iniciar Sesion
            </Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={openModal}
              >
                
              Iniciar Sesion
            </Button>
          </form>
          <div><Login/></div>
        </Modal>
      </div>
    );
}
