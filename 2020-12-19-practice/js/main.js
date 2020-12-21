let str = 'block_element--modificator';
let str2 = str.replaceAll("--", "-").replaceAll("__", "-").replaceAll("_", "-").split("-")
    .reduce((str, elem, index) => (index > 0) ? `${str}${elem[0].toUpperCase()}${elem.substring(1)}` : elem);
console.log(str2);