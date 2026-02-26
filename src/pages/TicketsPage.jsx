import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useFetch } from "../hooks/useFetch"; 
import TableAll from "../components/TableAll";
import ModalAll from "../components/ModalAll";

export default function MatriculasPage() {
  const fetchBackend = useFetch();
  const [data, setData] = useState([]); 
  const [clientesOpts, setClientesOpts] = useState([]); // Opciones para el select
  const [tecnicosOpts, setTecnicosOpts] = useState([]);       // Opciones para el select
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 

  const ENDPOINT = "/tickets";

  const loadRelations = async () => {
    // 1. Cargamos clientes y los convertimos a formato { value, label } para el select
    const clientes = await fetchBackend("/clientes");
    if (Array.isArray(clientes)) {
      setClientesOpts(clientes.map(e => ({ value: e.id, label: `${e.nombre} ${e.apellido}` })));
    }

    // 2. Cargamos tecnicos
    const tecnicos = await fetchBackend("/tecnicos");
    if (Array.isArray(tecnicos)) {
      setTecnicosOpts(tecnicos.map(m => ({ value: m.id, label: `${m.nombre} ${m.apellido}` })));
    }
  };

  useEffect(() => {
    loadData();
    loadRelations(); // Cargar las listas al iniciar
  }, []);

  // Columnas de la tabla
  const COLUMNS = [
    { name: "Código", uid: "codigo" }, 
    { name: "Cliente", uid: "id_cliente" }, 
    { name: "Técnico", uid: "id_tecnico" },       
    { name: "Descripción", uid: "descripcion" },
    { name: "Acciones", uid: "actions" },
  ];

  // Campos con SELECTS
  const FORM_FIELDS = [
    { 
      name: "id_cliente", // Cambiado de estudianteId
      label: "Cliente", 
      type: "select", 
      options: clientesOpts // Pasamos la lista cargada
    },
    { 
      name: "id_tecnico", // Cambiado de materiaId
      label: "Técnico", 
      type: "select", 
      options: tecnicosOpts // Pasamos la lista cargada
    },
    { name: "codigo", label: "Código Ticket", type: "number" },
    { name: "descripcion", label: "Descripción" },
  ];

  // --- LÓGICA ESTÁNDAR ---
  const loadData = async () => {
    setIsLoading(true);
    const result = await fetchBackend(ENDPOINT);
    if (result) setData(Array.isArray(result) ? result : []);
    setIsLoading(false);
  };

  const handleSave = async (formData) => {
    if (editingItem) {
      await fetchBackend(`${ENDPOINT}/${editingItem.id}`, formData, "PUT");
    } else {
      await fetchBackend(ENDPOINT, formData, "POST");
    }
    loadData();
    setIsModalOpen(false);
  };

  const handleDelete = async (item) => {
    if (window.confirm("¿Eliminar matrícula?")) {
      await fetchBackend(`${ENDPOINT}/${item.id}`, null, "DELETE");
      loadData();
    }
  };

  const openCreate = () => { setEditingItem(null); setIsModalOpen(true); };
  const openEdit = (item) => { setEditingItem(item); setIsModalOpen(true); };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Tickets</h1>
        <Button color="primary" endContent={<Plus />} onPress={openCreate}>
          Nuevo Ticket
        </Button>
      </div>
      <TableAll columns={COLUMNS} data={data} isLoading={isLoading} onEdit={openEdit} onDelete={handleDelete} />
      <ModalAll
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Editar Ticket" : "Nueva Ticket"}
        fields={FORM_FIELDS}
        initialData={editingItem}
        onSubmit={handleSave}
      />
    </div>
  );
}