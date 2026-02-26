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
export default function GenericModal({ isOpen, onClose, title, fields, initialData, onSubmit }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData, isOpen]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          {fields.map((field) => {
            // LÓGICA PARA SELECT (DROPDOWN)
            if (field.type === "select") {
              return (
                <Select
                  key={field.name}
                  label={field.label}
                  placeholder={`Selecciona ${field.label.toLowerCase()}`}
                  selectedKeys={formData[field.name] ? [String(formData[field.name])] : []}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  {/* options debe ser un array: [{value: "1", label: "Juan"}, ...] */}
                  {(field.options || []).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </Select>
              );
            }

            // LÓGICA PARA INPUT NORMAL
            return (
              <Input
                isRequired
                key={field.name}
                label={field.label}
                placeholder={`Ingresa ${field.label.toLowerCase()}`}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                type={field.type || "text"}
                variant="bordered"
              />
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}