import { CartType } from "../../utils/type";

export const addItem = (prevState: CartType[], item: CartType) => {
  const existingItem = prevState.find(
    existingItem => existingItem.id === item.id
  );
  if (!existingItem) return [...prevState, item];

  return prevState.map(item => {
    return item.id === existingItem.id
      ? {
          ...item,
          count: item.count + 1
        }
      : item;
  });
};

export const deleteItem = (prevState: CartType[], id: CartType["id"]) => {
  const newState = prevState.map(item => {
    return item.id === id
      ? {
          ...item,
          count: item.count - 1
        }
      : item;
  });
  return newState.filter(item => item.count > 0);
};
