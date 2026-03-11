// turns 10000000 into 10 000 000

export function formatAmount(number?: number) {
    if (number) {
      const integerPart = Math.floor(number); // yoki parseInt(number.toString(), 10)
  
      const numStr = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
      return numStr;
    }
    return '';
  }
  