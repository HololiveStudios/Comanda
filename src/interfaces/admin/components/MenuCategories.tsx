import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Save, Trash2, Edit2, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { addCategory, updateCategory, deleteCategory } from '@/store/slices/menuCatedogy';

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  active: boolean;
}

export const MenuCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.menu.categories as MenuCategory[]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<MenuCategory>>({
    name: '',
    description: '',
    order: categories.length + 1,
    active: true
  });
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleSubmit = () => {
    if (
      currentCategory.name &&
      currentCategory.description &&
      currentCategory.order !== undefined &&
      currentCategory.active !== undefined
    ) {
      const category: MenuCategory = {
        id: currentCategory.id || Date.now().toString(),
        name: currentCategory.name,
        description: currentCategory.description,
        order: currentCategory.order,
        active: currentCategory.active,
      };

      if (currentCategory.id) {
        dispatch(updateCategory(category));
      } else {
        dispatch(addCategory(category));
      }
      setIsEditing(false);
    } else {
      console.error('Todos os campos são obrigatórios');
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id));
    setDeleteConfirmOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-6 w-6" />
            Categorias do Cardápio
          </CardTitle>
          <Button onClick={() => { setIsEditing(true); setCurrentCategory({}); }}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            <AnimatePresence>
              {categories.sort((a, b) => a.order - b.order).map((category: MenuCategory) => (
                <motion.tr
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.order}</TableCell>
                  <TableCell>
                    <Switch
                      checked={category.active}
                      onCheckedChange={(active) => dispatch(updateCategory({ ...category, active }))}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setIsEditing(true); setCurrentCategory(category); }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => { setCategoryToDelete(category.id); setDeleteConfirmOpen(true); }}
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

        {/* Edição/Criação de Categoria */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentCategory?.id ? 'Editar Categoria' : 'Nova Categoria'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={currentCategory?.name || ''}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={currentCategory?.description || ''}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={currentCategory?.order || ''}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, order: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={currentCategory?.active || false}
                  onCheckedChange={(active) => setCurrentCategory({ ...currentCategory, active })}
                />
                <Label htmlFor="active">Categoria Ativa</Label>
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
                Tem certeza que deseja excluir esta categoria? Todos os itens vinculados serão removidos.
              </p>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => categoryToDelete && handleDelete(categoryToDelete)}
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

export default MenuCategories;