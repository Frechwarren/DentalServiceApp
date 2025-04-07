export default function useShowDialog(open, type, data) {
  if (type === "cancel") {
    test(open, type, data);
  }
  //   const [isOpen, setIsOpen] = useState(open);
  //   const [dialogType, setDialogType] = useState(null);
  //   const [dialogData, setDialogData] = useState(null);

  //   const showDialog = (type, data) => {
  //     setIsOpen(true);
  //     setDialogType(type);
  //     setDialogData(data);
  //   };

  //   const hideDialog = () => {
  //     setIsOpen(false);
  //     setDialogType(null);
  //     setDialogData(null);
  //   };

  return { open, type, data };
}

export async function test(open, type, data) {
//   console.log(open, type, data);

  return { open, type, data };
}
