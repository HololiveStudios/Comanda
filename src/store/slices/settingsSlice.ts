// src/store/slices/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defina a interface para as configurações fiscais
interface TaxSettings {
  serviceTax: number;
  municipalTax: number;
  stateTax: number;
  includeTaxes: boolean;
  taxIdentification: string;
}

// Defina o estado inicial
interface SettingsState {
  taxSettings: TaxSettings;
}

const initialState: SettingsState = {
  taxSettings: {
    serviceTax: 10, // Taxa de serviço padrão
    municipalTax: 5, // Imposto municipal padrão
    stateTax: 7, // Imposto estadual padrão
    includeTaxes: false, // Incluir impostos nos preços?
    taxIdentification: '', // CNPJ ou identificação fiscal
  },
};

// Crie o slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Ação para atualizar as configurações fiscais
    setTaxSettings(state, action: PayloadAction<TaxSettings>) {
      state.taxSettings = action.payload;
    },
  },
});

// Exporte as ações e o reducer
export const { setTaxSettings } = settingsSlice.actions;
export default settingsSlice.reducer;