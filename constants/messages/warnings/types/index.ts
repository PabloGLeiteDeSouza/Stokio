export type TypeDeleteMessages = {
  empresa: string;
  cliente: string;
  produto: string;
  ua: string;
  pedido: string;
};

export type TypeOperationCancel = {
  delete_messages: {
    empresa: string;
    cliente: string;
    produto: string;
    ua: string;
    pedido: string;
  };
};
