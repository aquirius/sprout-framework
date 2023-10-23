type DefaultTheme = {
  font: Font;
  palette: Palette;
};

type FontSize = {
  small: string;
  medium: string;
  big: string;
};

type Font = {
  sans: string;
  mono: string;
  size: FontSize;
};
type Palette = {
  primary: string;
  secondary: string;
  light: string;
  contrast: string;
};
const LightTheme: DefaultTheme = {
  font: {
    sans: "",
    mono: "",
    size: {
      small: "0.5rem",
      medium: "1rem",
      big: "1.5rem",
    },
  },
  palette: {
    primary: "#C1DB3C",
    secondary: "#39A845",
    light: "#f9f9f9",
    contrast: "#717171",
  },
};

/*
primary : "#63ac20",
secondary: "#095a04",
light: "#f9f9f9",
contrast: "#717171"
*/

export { LightTheme };
