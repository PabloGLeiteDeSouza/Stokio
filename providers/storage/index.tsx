import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';

interface State {
  [key: string]: any;
}

type Action = 
  | { type: 'SET_ITEM'; key: string; value: any }
  | { type: 'SET_MULTI_ITEMS'; items: { [key: string]: any } }
  | { type: 'REMOVE_ITEM'; key: string }
  | { type: 'REMOVE_MULTI_ITEMS'; keys: string[] }
  | { type: 'CLEAR' };

const StorageContext = createContext<{
  state: State,
  dispatch: Dispatch<Action>,
  getItem: (key: string) => any,
  getAllItems: () => State,
  getMultiItems: (keys: string[]) => { [key: string]: any },
  setItem: (key: string, value: any) => void,
  setMultiItems: (items: { [key: string]: any }) => void,
  clearItem: (key: string) => void,
  clearMultiItems: (keys: string[]) => void,
  clearAll: () => void
} | undefined>(undefined);

const storageReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ITEM':
      return { ...state, [action.key]: action.value };
    case 'SET_MULTI_ITEMS':
      return { ...state, ...action.items };
    case 'REMOVE_ITEM':
      const { [action.key]: _, ...rest } = state;
      return rest;
    case 'REMOVE_MULTI_ITEMS':
      return action.keys.reduce((acc, key) => {
        const { [key]: _, ...rest } = acc;
        return rest;
      }, state);
    case 'CLEAR':
      return {};
    default:
      return state;
  }
};

interface StorageProviderProps { children: ReactNode; }

export const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(storageReducer, {});

  const getItem = (key: string) => state[key];
  const getAllItems = () => state;
  const getMultiItems = (keys: string[]) => keys.reduce((acc, key) => ({ ...acc, [key]: state[key] }), {});
  const setItem = (key: string, value: any) => dispatch({ type: 'SET_ITEM', key, value });
  const setMultiItems = (items: { [key: string]: any }) => dispatch({ type: 'SET_MULTI_ITEMS', items });
  const clearItem = (key: string) => dispatch({ type: 'REMOVE_ITEM', key });
  const clearMultiItems = (keys: string[]) => dispatch({ type: 'REMOVE_MULTI_ITEMS', keys });
  const clearAll = () => dispatch({ type: 'CLEAR' });

  return (
    <StorageContext.Provider value={{ state, dispatch, getItem, getAllItems, getMultiItems, setItem, setMultiItems, clearItem, clearMultiItems, clearAll }}>
      {children}
    </StorageContext.Provider>
  );
};

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage deve ser usado dentro de um StorageProvider');
  }
  return context;
}
