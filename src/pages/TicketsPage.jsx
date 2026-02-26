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
    const [clientes, tecnicos] = await Promise.all([
      fetchBackend("/clientes"),
      fetchBackend("/tecnicos")
    ]);

    const cOpts = Array.isArray(clientes) 
      ? clientes.map(e => ({ value: e.id, label: `${e.nombre} ${e.apellido}` })) 
      : [];
    
    const tOpts = Array.isArray(tecnicos) 
      ? tecnicos.map(m => ({ value: m.id, label: `${m.nombre} ${m.apellido}` })) 
      : [];

    setClientesOpts(cOpts);
    setTecnicosOpts(tOpts);

    return { cOpts, tOpts }; 
  };

  useEffect(() => {
    const init = async () => {
      // 1. Esperamos a tener las relaciones y las guardamos en variables
      const { cOpts, tOpts } = await loadRelations();
      
      // 2. Le pasamos esas variables a loadData para que cruce los datos correctamente
      await loadData(cOpts, tOpts);
    };

    init();
  }, []);

  // Columnas de la tabla
  const COLUMNS = [
    { name: "Código", uid: "codigo" }, 
    { name: "Cliente", uid: "cliente_nombre" }, 
    { name: "Técnico", uid: "tecnico_nombre" },       
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
  const loadData = async (currentClientes = clientesOpts, currentTecnicos = tecnicosOpts) => {
    setIsLoading(true);
    const result = await fetchBackend(ENDPOINT);

    if (Array.isArray(result)) {
      const dataEnriquecida = result.map(ticket => {
        // Buscamos en los parámetros que pasamos, no en el estado global directamente
        const cliente = currentClientes.find(c => c.value === ticket.id_cliente);
        const tecnico = currentTecnicos.find(t => t.value === ticket.id_tecnico);

        return {
          ...ticket,
          cliente_nombre: cliente ? cliente.label : "Sin asignar",
          tecnico_nombre: tecnico ? tecnico.label : "Sin asignar"
        };
      });
      setData(dataEnriquecida);
    }
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