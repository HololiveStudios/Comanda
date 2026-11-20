import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setTables, updateTable } from '../../../store/slices/tablesSlice';
import { Table, TableStatus } from '../../../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mocked table sections for the restaurant
const TABLE_SECTIONS = ['Pátio', 'Interno', 'Varanda', 'Bar', 'VIP', 'Família'];

interface TableFormData {
  id: number | null;
  number: number;
  seats: number;
  status: TableStatus;
  section: string;
}

export const TableManagement = () => {
  const dispatch = useDispatch();
  const { tables, loading } = useSelector((state: RootState) => state.tables);
  
  const [tableFormOpen, setTableFormOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'grid'>('grid');
  const [selectedSection, setSelectedSection] = useState<string | 'all'>('all');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tableToDelete, setTableToDelete] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<TableFormData>({
    id: null,
    number: 1,
    seats: 4,
    status: 'available',
    section: TABLE_SECTIONS[0],
  });
  
  const [draggedTable, setDraggedTable] = useState<number | null>(null);
  const [tablePositions, setTablePositions] = useState<Record<number, {x: number, y: number}>>({});
  
  // Handle input changes for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'number' || name === 'seats' ? parseInt(value, 10) : value,
    });
  };
  
  // Handle select changes for status and section
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Add or update a table
  const handleSaveTable = () => {
    if (formData.id === null) {
      // Add new table
      const newTable: Table = {
        id: Math.max(0, ...tables.map(t => t.id)) + 1,
        number: formData.number,
        seats: formData.seats,
        status: formData.status,
        section: formData.section,
      };
      dispatch(setTables([...tables, newTable]));
    } else {
      // Update existing table
      const updatedTable: Table = {
        id: formData.id,
        number: formData.number,
        seats: formData.seats,
        status: formData.status,
        section: formData.section,
      };
      dispatch(updateTable(updatedTable));
    }
    
    setTableFormOpen(false);
    resetForm();
  };
  
  // Delete a table
  const handleDeleteTable = () => {
    if (tableToDelete !== null) {
      const updatedTables = tables.filter(table => table.id !== tableToDelete);
      dispatch(setTables(updatedTables));
      setConfirmDeleteOpen(false);
      setTableToDelete(null);
    }
  };
  
  // Edit a table
  const handleEditTable = (table: Table) => {
    setFormData({
      id: table.id,
      number: table.number,
      seats: table.seats,
      status: table.status,
      section: table.section || TABLE_SECTIONS[0],
    });
    setTableFormOpen(true);
  };
  
  // Reset form data
  const resetForm = () => {
    setFormData({
      id: null,
      number: tables.length > 0 ? Math.max(...tables.map(t => t.number)) + 1 : 1,
      seats: 4,
      status: 'available',
      section: TABLE_SECTIONS[0],
    });
  };
  
  // Open form for a new table
  const handleAddTable = () => {
    resetForm();
    setTableFormOpen(true);
  };
  
  // Start drag operation
  const handleDragStart = (tableId: number) => {
    setDraggedTable(tableId);
  };
  
  // Handle drag operation
  const handleDrag = (tableId: number, e: React.DragEvent<HTMLDivElement>) => {
    if (draggedTable === tableId) {
      setTablePositions({
        ...tablePositions,
        [tableId]: { 
          x: e.clientX, 
          y: e.clientY 
        }
      });
    }
  };
  
  // End drag operation
  const handleDragEnd = () => {
    setDraggedTable(null);
    
    // Here you would typically save the new position to your backend
    // This is just a placeholder for the drag functionality
  };
  
  // Filter tables by section
  const filteredTables = selectedSection === 'all' 
    ? tables 
    : tables.filter(table => table.section === selectedSection);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Gerenciamento de Mesas</CardTitle>
          <div className="flex space-x-2">
            <Tabs value={currentView} onValueChange={setCurrentView as (value: string) => void} className="w-auto">
              <TabsList className="grid grid-cols-2 w-[160px]">
                <TabsTrigger value="grid">Layout</TabsTrigger>
                <TabsTrigger value="list">Lista</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={handleAddTable}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Mesa
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-4 items-center">
            <Label className="whitespace-nowrap">Filtrar por Seção:</Label>
            <Select 
              value={selectedSection} 
              onValueChange={setSelectedSection as (value: string) => void}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione uma seção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Seções</SelectItem>
                {TABLE_SECTIONS.map(section => (
                  <SelectItem key={section} value={section}>{section}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="grid" className="mt-6">
          <div className="bg-white p-4 border rounded-md h-[600px] relative">
            {filteredTables.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p>Nenhuma mesa cadastrada nesta seção</p>
                <Button variant="outline" onClick={handleAddTable} className="mt-2">
                  Adicionar Mesa
                </Button>
              </div>
            ) : (
              <div className="w-full h-full">
                {filteredTables.map(table => (
                  <motion.div
                    key={table.id}
                    className={`absolute cursor-move p-2 rounded-md border-2 ${
                      table.status === 'available' ? 'bg-green-100 border-green-500' :
                      table.status === 'occupied' ? 'bg-red-100 border-red-500' :
                      table.status === 'reserved' ? 'bg-yellow-100 border-yellow-500' : 
                      'bg-gray-100 border-gray-500'
                    }`}
                    style={{
                      width: `${Math.min(120, 80 + table.seats * 10)}px`,
                      height: `${Math.min(120, 80 + table.seats * 10)}px`,
                      left: tablePositions[table.id]?.x || `${(table.number % 5) * 150 + 50}px`,
                      top: tablePositions[table.id]?.y || `${Math.floor(table.number / 5) * 150 + 50}px`,
                    }}
                    draggable
                    onDragStart={() => handleDragStart(table.id)}
                    onDrag={(e) => handleDrag(table.id, e)}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="font-bold">{table.number}</div>
                      <div className="text-xs">{table.seats} lugares</div>
                      <div className="text-xs mt-1">{table.section}</div>
                    </div>
                    <div className="absolute top-0 right-0 flex space-x-1 p-1">
                      <button 
                        onClick={() => handleEditTable(table)}
                        className="bg-blue-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button 
                        onClick={() => {
                          setTableToDelete(table.id);
                          setConfirmDeleteOpen(true);
                        }}
                        className="bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-left">Número</th>
                  <th className="py-3 px-4 text-left">Lugares</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Seção</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredTables.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-gray-500">
                        Nenhuma mesa cadastrada nesta seção
                      </td>
                    </tr>
                  ) : (
                    filteredTables.map(table => (
                      <motion.tr 
                        key={table.id} 
                        className="border-b hover:bg-gray-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="py-3 px-4">{table.number}</td>
                        <td className="py-3 px-4">{table.seats}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            table.status === 'available' ? 'bg-green-100 text-green-800' :
                            table.status === 'occupied' ? 'bg-red-100 text-red-800' :
                            table.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {table.status === 'available' ? 'Disponível' :
                             table.status === 'occupied' ? 'Ocupada' :
                             table.status === 'reserved' ? 'Reservada' : 'Em limpeza'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{table.section || '-'}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditTable(table)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                              onClick={() => {
                                setTableToDelete(table.id);
                                setConfirmDeleteOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        {/* Table Form Dialog */}
        <Dialog open={tableFormOpen} onOpenChange={setTableFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{formData.id ? 'Editar Mesa' : 'Adicionar Nova Mesa'}</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da mesa e clique em salvar quando concluir.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Número
                </Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="seats" className="text-right">
                  Lugares
                </Label>
                <Input
                  id="seats"
                  name="seats"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="occupied">Ocupada</SelectItem>
                    <SelectItem value="reserved">Reservada</SelectItem>
                    <SelectItem value="cleaning">Em Limpeza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="section" className="text-right">
                  Seção
                </Label>
                <Select 
                  value={formData.section} 
                  onValueChange={(value) => handleSelectChange('section', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a seção" />
                  </SelectTrigger>
                  <SelectContent>
                    {TABLE_SECTIONS.map(section => (
                      <SelectItem key={section} value={section}>{section}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setTableFormOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveTable}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Confirm Delete Dialog */}
        <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir esta mesa? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteTable}
              >
                Excluir Mesa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TableManagement;