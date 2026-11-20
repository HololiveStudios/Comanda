import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Save, Trash2, Edit2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addStaff, updateStaff, deleteStaff } from '@/store/slices/staffSlice';

interface StaffMember {
  id: string;
  name: string;
  role: 'manager' | 'waiter' | 'chef' | 'other';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export const StaffManagement = () => {
  const dispatch = useDispatch();
  const staffMembers = useSelector((state: RootState) => state.staff.members);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Partial<StaffMember>>({
    name: '',
    role: 'waiter',
    email: '',
    phone: '',
    status: 'active'
  });
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);

  const handleSubmit = () => {
    if (currentStaff.id) {
      dispatch(updateStaff(currentStaff as StaffMember));
    } else {
      dispatch(addStaff({ ...currentStaff, id: Date.now().toString() }));
    }
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStaff(id));
    setDeleteConfirmOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            Gestão de Funcionários
          </CardTitle>
          <Button onClick={() => { setIsEditing(true); setCurrentStaff({}); }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Funcionário
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            <AnimatePresence>
              {staffMembers.map((member) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <span className="capitalize">{member.role}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{member.email}</span>
                      <span className="text-sm text-gray-500">{member.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setIsEditing(true); setCurrentStaff(member); }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => { setStaffToDelete(member.id); setDeleteConfirmOpen(true); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {/* Edição/Criação de Funcionário */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentStaff?.id ? 'Editar Funcionário' : 'Novo Funcionário'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={currentStaff?.name || ''}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role">Cargo</Label>
                <Select
                  value={currentStaff?.role}
                  onValueChange={(value) => setCurrentStaff({ ...currentStaff, role: value as any })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="waiter">Garçom</SelectItem>
                    <SelectItem value="chef">Chef de Cozinha</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentStaff?.email || ''}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={currentStaff?.phone || ''}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, phone: e.target.value })}
                  className="col-span-3"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmação de Exclusão */}
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <p className="text-sm text-gray-500 mt-2">
                Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.
              </p>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => staffToDelete && handleDelete(staffToDelete)}
              >
                Confirmar Exclusão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default StaffManagement;