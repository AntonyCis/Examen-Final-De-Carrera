import { 
    Modal, // Contenedor del modal
    ModalContent, // Contenido del modal
    ModalHeader, // Cabecera del header
    ModalBody, // Cuerpo del modal
    ModalFooter, // Footer del modal
    Button, // Para los botones
    Input, // Para la entrada de texto
    Select, // Para el menú desplegable
    SelectItem // Para cada item del select
 } from '@heroui/react';

import { 
    useState, // Para las variables con estado interno
    useEffect // Para ejecutar código cuando renderiza el components
 } from 'react';

// Creación del componente
export default function ModalAll({ isOpen, onClose, title, fields, initialData, onSubmit }) {
    // Hooks
    const [ formData, setFormData ] = useState({});
    
    // useEffect que reacciona a cambios en initialData e isOpen
    useEffect(() => {
        if (formData) {
            setFormData(initialData);
        } else {
            setFormData({});
        }
    }, [initialData, isOpen]);

    // Función para que el modal funcione
    const handleChange = (name, value) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSave = () => {
        onSubmit(formData);
        onClose();
    };

    return(
        <Modal isOpen={isOpen} onClose={onClose} backdrop='blur'>

            <ModalContent>

                <ModalHeader className='flex items-center gap-1'>{title}</ModalHeader>

                <ModalBody>
                    { fields.map((field) => {
                        // Lógica para el select
                        if (field.type === 'select') {
                            return(
                                <Select
                                    key={field.name}
                                    label={field.label}
                                    placeholder={`Selecciona ${field.label.toLowerCase()}`}
                                    selectedKeys={formData[field.name] ? [String(formData[field.name])] : []}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                >

                                    {/* debe ser un array */}
                                    { (field.options || []).map( (opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ) ) }
                                    
                                </Select>
                            );
                        }

                        return(
                            <Input
                                isRequired
                                key={field.name}
                                label={field.label}
                                placeholder={`Ingresa ${field.label.toLowerCase()}`}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                type={field.type || 'text'}
                                variant='bordered'
                            />
                        );
                    }) }
                </ModalBody>

                <ModalFooter>
                    <Button
                        color='danger'
                        variant='light'
                        onPress={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        color='primary'
                        onPress={handleSave}
                    >
                        Guardar
                    </Button>
                </ModalFooter>


            </ModalContent>

        </Modal>
    );
    
}