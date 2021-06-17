export function titleCase (string) {
  let split = string.replace('-', ' ').split('');
  let space = false;
  let rearrange = split.map((s, si) => {
    if(si === 0) {
      return s.toUpperCase();
    } else if(s === ' ') { 
      space = true; 
      return s;
    } else if(space) { 
      space = false;
      return s.toUpperCase();
    } else {
      return s;
    }
  })
  return rearrange.join('');
}