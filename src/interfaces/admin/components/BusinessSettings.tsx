import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Save } from 'lucide-react';

export const BusinessSettings = () => {
  const [settings, setSettings] = useState({
    businessName: '',
    cnpj: '',
    address: '',
    openingTime: '09:00',
    closingTime: '18:00',
    active: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (checked: boolean) => {
    setSettings(prev => ({ ...prev, active: checked }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Negócio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessName">Nome do Estabelecimento</Label>
            <Input
              id="businessName"
              name="businessName"
              value={settings.businessName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              name="cnpj"
              value={settings.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="address">Endereço Completo</Label>
            <Input
              id="address"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="openingTime">Horário de Abertura</Label>
            <Input
              type="time"
              id="openingTime"
              name="openingTime"
              value={settings.openingTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="closingTime">Horário de Fechamento</Label>
            <Input
              type="time"
              id="closingTime"
              name="closingTime"
              value={settings.closingTime}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={settings.active}
              onCheckedChange={handleToggle}
            />
            <Label htmlFor="active">Estabelecimento Ativo</Label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSettings;