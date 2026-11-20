import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeliveryZone {
  id: number;
  name: string;
  fee: number;
  estimatedTime: string;
  minOrderValue: number;
  active: boolean;
}

interface DeliverySettings {
  enabled: boolean;
  defaultFee: number;
  minOrderValue: number;
  maxDistance: number;
  freeDeliveryThreshold: number;
  workingHours: {
    start: string;
    end: string;
  };
  zones: DeliveryZone[];
}

const initialDeliverySettings: DeliverySettings = {
  enabled: true,
  defaultFee: 5.00,
  minOrderValue: 15.00,
  maxDistance: 10,
  freeDeliveryThreshold: 50.00,
  workingHours: {
    start: '11:00',
    end: '22:00',
  },
  zones: [
    {
      id: 1,
      name: 'Centro',
      fee: 3.50,
      estimatedTime: '20-30',
      minOrderValue: 15.00,
      active: true,
    },
    {
      id: 2,
      name: 'Zona Norte',
      fee: 5.00,
      estimatedTime: '30-45',
      minOrderValue: 20.00,
      active: true,
    },
    {
      id: 3,
      name: 'Zona Sul',
      fee: 7.00,
      estimatedTime: '40-55',
      minOrderValue: 25.00,
      active: true,
    }
  ]
};

export const DeliverySettings = () => {
  const [settings, setSettings] = useState<DeliverySettings>(initialDeliverySettings);
  const [zoneFormOpen, setZoneFormOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState('general');
  
  const [zoneForm, setZoneForm] = useState<DeliveryZone>({
    id: 0,
    name: '',
    fee: 5.00,
    estimatedTime: '30-45',
    minOrderValue: 15.00,
    active: true,
  });

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof DeliverySettings] as object),
          [child]: type === 'number' ? parseFloat(value) : value,
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value,
      }));
    }
  };

  const handleToggleDelivery = (checked: boolean) => {
    setSettings(prev => ({ ...prev, enabled: checked }));
  };

  const handleZoneFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setZoneForm(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleZoneActiveToggle = (checked: boolean) => {
    setZoneForm(prev => ({ ...prev, active: checked }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
  };

  const handleSaveZone = () => {
    setSettings(prev => {
      const newZone = zoneForm.id === 0
        ? { ...zoneForm, id: Math.max(0, ...prev.zones.map(z => z.id)) + 1 }
        : zoneForm;

      const updatedZones = zoneForm.id === 0
        ? [...prev.zones, newZone]
        : prev.zones.map(zone => zone.id === zoneForm.id ? zoneForm : zone);

      return { ...prev, zones: updatedZones };
    });
    
    setZoneFormOpen(false);
    resetZoneForm();
  };

  const handleDeleteZone = () => {
    if (zoneToDelete !== null) {
      setSettings(prev => ({
        ...prev,
        zones: prev.zones.filter(zone => zone.id !== zoneToDelete),
      }));
      setConfirmDeleteOpen(false);
      setZoneToDelete(null);
    }
  };

  const handleEditZone = (zone: DeliveryZone) => {
    setZoneForm(zone);
    setZoneFormOpen(true);
  };

  const resetZoneForm = () => {
    setZoneForm({
      id: 0,
      name: '',
      fee: 5.00,
      estimatedTime: '30-45',
      minOrderValue: 15.00,
      active: true,
    });
  };

  const handleAddZone = () => {
    resetZoneForm();
    setZoneFormOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Configurações de Entrega</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="delivery-enabled">Entregas Ativas</Label>
            <Switch 
              id="delivery-enabled" 
              checked={settings.enabled} 
              onCheckedChange={handleToggleDelivery}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="general">Configurações Gerais</TabsTrigger>
            <TabsTrigger value="zones">Zonas de Entrega</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="defaultFee">Taxa de Entrega Padrão (R$)</Label>
                  <Input 
                    id="defaultFee" 
                    name="defaultFee" 
                    type="number" 
                    step="0.50"
                    min="0"
                    value={settings.defaultFee} 
                    onChange={handleSettingChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="minOrderValue">Valor Mínimo do Pedido (R$)</Label>
                  <Input 
                    id="minOrderValue" 
                    name="minOrderValue" 
                    type="number" 
                    step="0.50"
                    min="0"
                    value={settings.minOrderValue} 
                    onChange={handleSettingChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="freeDeliveryThreshold">Valor Mínimo p/ Entrega Grátis (R$)</Label>
                  <Input 
                    id="freeDeliveryThreshold" 
                    name="freeDeliveryThreshold" 
                    type="number" 
                    step="0.50"
                    min="0"
                    value={settings.freeDeliveryThreshold} 
                    onChange={handleSettingChange}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="maxDistance">Distância Máxima (km)</Label>
                  <Input 
                    id="maxDistance" 
                    name="maxDistance" 
                    type="number" 
                    step="0.5"
                    min="0"
                    value={settings.maxDistance} 
                    onChange={handleSettingChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="workingHours.start">Horário de Início das Entregas</Label>
                  <Input 
                    id="workingHours.start" 
                    name="workingHours.start" 
                    type="time" 
                    value={settings.workingHours.start} 
                    onChange={handleSettingChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="workingHours.end">Horário de Término das Entregas</Label>
                  <Input 
                    id="workingHours.end" 
                    name="workingHours.end" 
                    type="time" 
                    value={settings.workingHours.end} 
                    onChange={handleSettingChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="zones" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">Zonas de Entrega</h3>
                <p className="text-sm text-gray-500">
                  Configure diferentes zonas com taxas e tempos específicos
                </p>
              </div>
              
              <Button onClick={handleAddZone}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Zona
              </Button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left">Nome da Zona</th>
                    <th className="py-3 px-4 text-left">Taxa (R$)</th>
                    <th className="py-3 px-4 text-left">Tempo Estimado (min)</th>
                    <th className="py-3 px-4 text-left">Pedido Mínimo (R$)</th>
                    <th className="py-3 px-4 text-center">Ativa</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {settings.zones.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-gray-500">
                          Nenhuma zona de entrega cadastrada
                        </td>
                      </tr>
                    ) : (
                      settings.zones.map(zone => (
                        <motion.tr 
                          key={zone.id} 
                          className="border-b hover:bg-gray-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <td className="py-3 px-4">{zone.name}</td>
                          <td className="py-3 px-4">R$ {zone.fee.toFixed(2)}</td>
                          <td className="py-3 px-4">{zone.estimatedTime} min</td>
                          <td className="py-3 px-4">R$ {zone.minOrderValue.toFixed(2)}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              zone.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {zone.active ? 'Sim' : 'Não'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditZone(zone)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                onClick={() => {
                                  setZoneToDelete(zone.id);
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
        </Tabs>
        
        <Dialog open={zoneFormOpen} onOpenChange={setZoneFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{zoneForm.id ? 'Editar Zona de Entrega' : 'Nova Zona de Entrega'}</DialogTitle>
              <DialogDescription>
                Configure os detalhes da zona de entrega e clique em salvar quando concluir.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome da Zona
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={zoneForm.name}
                  onChange={handleZoneFormChange}
                  className="col-span-3"
                  placeholder="Ex: Centro, Zona Norte, etc."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fee" className="text-right">
                  Taxa (R$)
                </Label>
                <Input
                  id="fee"
                  name="fee"
                  type="number"
                  step="0.50"
                  min="0"
                  value={zoneForm.fee}
                  onChange={handleZoneFormChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estimatedTime" className="text-right">
                  Tempo (min)
                </Label>
                <Input
                  id="estimatedTime"
                  name="estimatedTime"
                  value={zoneForm.estimatedTime}
                  onChange={handleZoneFormChange}
                  className="col-span-3"
                  placeholder="Ex: 20-30, 30-45, etc."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minOrderValue" className="text-right">
                  Pedido Mínimo (R$)
                </Label>
                <Input
                  id="minOrderValue"
                  name="minOrderValue"
                  type="number"
                  step="0.50"
                  min="0"
                  value={zoneForm.minOrderValue}
                  onChange={handleZoneFormChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="active" className="text-right">
                  Zona Ativa
                </Label>
                <div className="col-span-3 flex items-center">
                  <Switch 
                    id="active" 
                    checked={zoneForm.active} 
                    onCheckedChange={handleZoneActiveToggle}
                  />
                  <Label htmlFor="active" className="ml-2">
                    {zoneForm.active ? 'Sim' : 'Não'}
                  </Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setZoneFormOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveZone}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir esta zona de entrega? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteZone}
              >
                Excluir Zona
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DeliverySettings;