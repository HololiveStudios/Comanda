import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Save } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTaxSettings } from '@/store/slices/settingsSlice';

interface TaxSettingsState {
  serviceTax: number;
  municipalTax: number;
  stateTax: number;
  includeTaxes: boolean;
  taxIdentification: string;
}

export const TaxSettings = () => {
  const dispatch = useDispatch();
  const savedSettings = useSelector((state: RootState) => state.settings.taxSettings);
  
  const [settings, setSettings] = useState<TaxSettingsState>({
    serviceTax: savedSettings?.serviceTax || 10,
    municipalTax: savedSettings?.municipalTax || 5,
    stateTax: savedSettings?.stateTax || 7,
    includeTaxes: savedSettings?.includeTaxes || false,
    taxIdentification: savedSettings?.taxIdentification || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name.includes('Tax') ? Math.min(100, Math.max(0, Number(value))) : value
    }));
  };

  const handleSave = () => {
    dispatch(setTaxSettings(settings));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏛️ Configurações Fiscais</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="taxIdentification">CNPJ</Label>
              <Input
                id="taxIdentification"
                name="taxIdentification"
                value={settings.taxIdentification}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
              />
            </div>
            
            <div>
              <Label htmlFor="serviceTax">Taxa de Serviço (%)</Label>
              <Input
                type="number"
                id="serviceTax"
                name="serviceTax"
                value={settings.serviceTax}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="municipalTax">ISS (Imposto Municipal) (%)</Label>
              <Input
                type="number"
                id="municipalTax"
                name="municipalTax"
                value={settings.municipalTax}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>

            <div>
              <Label htmlFor="stateTax">ICMS (Imposto Estadual) (%)</Label>
              <Input
                type="number"
                id="stateTax"
                name="stateTax"
                value={settings.stateTax}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="includeTaxes"
            checked={settings.includeTaxes}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeTaxes: checked }))}
          />
          <Label htmlFor="includeTaxes">Incluir impostos automaticamente nos preços</Label>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxSettings;