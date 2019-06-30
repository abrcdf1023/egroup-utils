import React from 'react';

export default function useHandleIsOpen(value) {
  const [isOpen, setIsOpen] = React.useState(value);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handleOpen,
    handleClose
  };
}
