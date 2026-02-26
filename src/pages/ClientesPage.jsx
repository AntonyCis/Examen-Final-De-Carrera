import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useFetch } from "../hooks/useFetch"; // Tu hook maestro
import TableAll from "../components/TableAll";
import ModalAll from "../components/ModalAll";
import { toast } from "react-toastify";

export default function ClientesPage() {
  const fetchBackend = useFetch(); // Hook para peticiones
  const [data, setData] = useState([]); // Datos de la tabla
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Si es null, estamos creando. Si tiene objeto, editando.
  const [isLoading, setIsLoading] = useState(true);

  const ENDPOINT = "/clientes"; // Endpoint del backend
  const COLUMNS = [
    { name: "Nombre", uid: "nombre" },
    { name: "Apellido", uid: "apellido" },
    { name: "Cédula", uid: "cedula" },
    { name: "Ciudad", uid: "ciudad" },
    { name: "Acciones", uid: "actions" },
  ];
  const FORM_FIELDS = [
    { name: "nombre", label: "Nombre" },
    { name: "apellido", label: "Apellido" },
    { name: "cedula", label: "Cédula" },
    { name: "fecha_nacimiento", label: "Fecha Nacimiento", type: "date" },
    { name: "ciudad", label: "Ciudad" },
    { name: "direccion", label: "Dirección (Max 10 letras)" },
    { name: "telefono", label: "Teléfono" },
    { name: "email", label: "Email", type: "email" },
    { name: "dependencia", label: "Dependencias"},
  ];

  // 1. LEER (GET)
  const loadData = async () => {
    setIsLoading(true);
    const result = await fetchBackend(ENDPOINT);
    console.log("🔍 LO QUE LLEGÓ DEL BACKEND:", result);
    if (result) setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. 
  const handleSave = async (formData) => {
    if (editingItem) {
      await fetchBackend(`${ENDPOINT}/${editingItem.id}`, formData, "PUT");
    } else {
      await fetchBackend(ENDPOINT, formData, "POST");
    }
    loadData(); // Recargar tabla
    setIsModalOpen(false);
  };

  // 3. BORRAR (DELETE)
  const handleDelete = async (item) => {
    if (window.confirm(`¿Seguro que quieres eliminar a ${item.nombre}?`)) {
      await fetchBackend(`${ENDPOINT}/${item.id}`, null, "DELETE");
      loadData();
    }
  };

  // Manejadores del Modal
  const openCreate = () => {
    setEditingItem(null); // Limpiamos para crear nuevo
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item); // Cargamos datos existentes
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <Button color="primary" endContent={<Plus />} onPress={openCreate}>
          Nuevo Cliente
        </Button>
      </div>

      <TableAll 
        columns={COLUMNS} 
        data={data}
        isLoading={isLoading}
        onEdit={openEdit} 
        onDelete={handleDelete} 
      />

      <ModalAll
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Editar Cliente" : "Nuevo Cliente"}
        fields={FORM_FIELDS}
        initialData={editingItem}
        onSubmit={handleSave}
      />
    </div>
  );
}