export const formatDate = (date) => {
  let data = new Date(date);
  let day = data.getDate().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
  let month = (data.getMonth() + 1).toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
  let year = data.getFullYear();
  return `${day}/${month}/${year}`;
}