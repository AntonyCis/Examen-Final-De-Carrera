import { 
    Table, // El componente para la tabla
    TableHeader, // El componente para la cabecera de la tabla
    TableColumn, // El componente para las columnas de la tabla
    TableBody, // El componente para el cuerpo de la tabla
    TableRow, // El componente para las filas de la tabla
    TableCell, // El componente para las celdas de la tabla
    Button, // El componente para los botones
    Tooltip, // El componente para mensajes flotantes
    Spinner // El componente para la animación de carga
 } from '@heroui/react';

import { 
    Edit, // Para el ícono de editar
    Trash2 // Ícono para eliminar
} from 'lucide-react';

// Creación del componente
export default function TableAll({ columns, data, onEdit, onDelete, isLoading }) {

    // Función para renderizar el contenido de la tabla
    const renderCell = ( item, columnKey ) => {
        const cellValue = item[columnKey];

        switch (cellValue) {
            case 'actions':
                return (

                    <div className='flex items-center gap-2'>

                        <Tooltip content='Editar'>

                            <Button 
                                isIconOnly
                                size='sm'
                                variant='light'
                                color='primary'
                                onPress={() => onEdit(item)}
                            > 

                                <Edit size={18}/>

                            </Button>

                        </Tooltip>

                        <Tooltip content='Eliminar'>

                            <Button 
                                isIconOnly
                                size='sm'
                                variant='light'
                                color='danger'
                                onPress={() => onDelete(item)}
                            > 

                                <Trash2 size={18}/>

                            </Button>

                        </Tooltip>

                    </div>

                );
            default:
                // Si es un objeto como una fecha se convierte en String
                return typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue;
        }   
    };

    return(

        // Contenedor de la tabla
        <Table aria-label='Tabla de Gestión'>

            <TableHeader columns={columns}>

                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.name === 'actions' ? 'center' : 'start'}
                    >
                        {column.name}
                    </TableColumn>
                )}

            </TableHeader>

            <TableBody
                        items={data}
                        emptyContent={isLoading ? <Spinner label='Cargando datos...'/> : 'No hay registros.'}
                        isLoading={isLoading}
            >

                { (Array.isArray(data) ? data : []).map( (item) => (
                    <TableRow key={item.id || item._id || Math.random()}>

                        { columns.map( (column) => (

                            <TableCell key={`${item.id}-${column.uid}`}>
                                {renderCell(item, column.uid)}
                            </TableCell>

                        ) ) }

                    </TableRow>
                ) ) }


            </TableBody>
            


        </Table>

    );

}