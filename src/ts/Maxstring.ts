export default function maxstring(s: string, l: number){
    if (s.length > l) return s.substring(0, l)+'..'
    else return s
  }