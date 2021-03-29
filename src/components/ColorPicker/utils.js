import tinycolor from "tinycolor2";

export const limitatePercent = (num) => Math.max(0, Math.min(1, num));

export const getValidColor = (input) => {
  
  if(typeof input !== "string"){
    
    for(const key in input){
      if(isNaN(input[key])){
        return false;
      }
    }

    const {h, s, l, v, r, g, b, a} = input;

    if(
      (h !== null && (h < 0 || h > 360)) ||
      (a !== null && (a < 0 || a > 1)) ||
      (s !== null && (s < 0 || s > 1)) ||
      (v !== null && (v < 0 || v > 1)) ||
      (l !== null && (l < 0 || l > 1)) ||
      (r !== null && (r < 0 || r > 255)) ||
      (g !== null && (g < 0 || g > 255)) ||
      (b !== null && (b < 0 || b > 255))
    ) return false;
  }
  
  const color = tinycolor(input);
  return color.isValid() && color;
}