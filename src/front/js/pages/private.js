import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

export const Private = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      actions.logout();
    }
  }, [actions]);

  return (
    <div>
      <h1>Página Privada</h1>
      <p>Pagina solo para usuarios registrados </p> 
    </div>
  );
};