import React, { useState } from 'react';
import Dialog from './dialog';

export const useDialog = () => {
  const [dialog, setDialog] = useState<{ title: string, message: string, onClose: () => void } | null>(null);

  const showDialog = (title: string, message: string, onClose: () => void) => {
    setDialog({ title, message, onClose });
  };

  const hideDialog = () => {
    setDialog(null);
  };

  const DialogComponent = () => (
    dialog ? <Dialog title={dialog.title} message={dialog.message} onClose={dialog.onClose} /> : null
  );

  return { showDialog, hideDialog, DialogComponent };
};
