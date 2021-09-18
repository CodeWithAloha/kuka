export const formatDescription = input => {
  let re = /\.\.(Title|Description|Status|Note)/g;
  return input.replace(re, '<Text>$1</Text>');
};
