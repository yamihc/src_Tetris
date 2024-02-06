import React from "preact/compat";

interface ModaleProps {
    isOpen: boolean;
    onClose: () => void;
}


const Modale: React.FC<ModaleProps> = ({isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div>
            <h1>Setting</h1>
            {children}
            <button onClick={onClose}>Retour</button>
        </div>

    )

}


export default Modale;