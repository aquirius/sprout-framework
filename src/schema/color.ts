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

type Gradient = {
  direction: string;
  color1: string;
  intensity1: string;
  color2: string;
  intensity2: string;
  color3?: string;
  intensity3?: string;
  color4?: string;
  intensity4?: string;
  color5?: string;
  intensity5?: string;
}

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

const SkyGradient : Gradient[] = [
  {
    direction: "to bottom",
    color1: "#00000c",
    intensity1: "100%",
    color2: "#00000c",
    intensity2: "100%",

  },
  {
    direction: "to bottom",
    color1: "#020111",
    intensity1: "85%",
    color2: "#191621",
    intensity2: "100%"
  },
  {
    direction: "to bottom",
    color1: "#020111",
    intensity1: "60%",
    color2: "#20202c",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#020111",
    intensity1: "10%",
    color2: "#3a3a52",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#20202c",
    intensity1: "0%",
    color2: "#515175",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#40405c",
    intensity1: "0%",
    color2: "#6f71aa",
    intensity2: "80%",
    color3: "#8a76ab",
    intensity3: "100%",
  },
  {
    direction: "to bottom",
    color1: "#4a4969",
    intensity1: "0%",
    color2: "#7072ab",
    intensity2: "50%",
    color3: "#cd82a0",
    intensity3: "100%"
  },
  {
    direction: "to bottom",
    color1: "#757abf",
    intensity1: "0%",
    color2: "#8583be",
    intensity2: "60%",
    color3: "#eab0d1",
    intensity3: "100%",
  },
  {
    direction: "to bottom",
    color1: "#82addb",
    intensity1: "0%",
    color2: "#ebb2b1",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#94c5f8",
    intensity1: "1%",
    color2: "#a6e6ff",
    intensity2: "70%",
    color3: "#b1b5ea",
    intensity3: "100%",
  },
  {
    direction: "to bottom",
    color1: "#b7eaff",
    intensity1: "0%",
    color2: "#94dfff",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#9be2fe",
    intensity1: "0%",
    color2: "#67d1fb",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#90dffe",
    intensity1: "0%",
    color2: "#38a3d1",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#57c1eb",
    intensity1: "0%",
    color2: "#246fa8",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#2d91c2",
    intensity1: "0%",
    color2: "#1e528e",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#2473ab",
    intensity1: "0%",
    color2: "#1e528e",
    intensity2: "70%",
    color3: "#5b7983",
    intensity3: "100%",
  },
  {
    direction: "to bottom",
    color1: "#1e528e",
    intensity1: "0%",
    color2: "#265889",
    intensity2: "50%",
    color3: "#9da671",
    intensity3: "100%",
  },
  {
    direction: "to bottom",
    color1: "#1e528e",
    intensity1: "0%",
    color2: "#728a7c",
    intensity2: "50%",
    color3: "#e9ce5d",
    intensity3: "100%",
  },
  {
    direction: "to bottom",
    color1: "#154277",
    intensity1: "0%",
    color2: "#576e71",
    intensity2: "30%",
    color3: "#e1c45e",
    intensity3: "70%",
    color4: "#b26339",
    intensity4: "100%",
  },
  {
    direction: "to bottom",
    color1: "#163C52",
    intensity1: "0%",
    color2: "#4F4F47",
    intensity2: "30%",
    color3: "#C5752D",
    intensity3: "60%",
    color4: "#B7490F",
    intensity4: "80%",
    color5: "#2F1107",
    intensity5: "100%",
  },
  {
    direction: "to bottom",
    color1: "#071B26",
    intensity1: "0%",
    color2: "#071B26",
    intensity2: "30%",
    color3: "#8A3B12",
    intensity3: "80%",
    color4: "#240E03",
    intensity4: "100%",
  },
  {
    direction: "to bottom",
    color1: "#010A10",
    intensity1: "30%",
    color2: "#59230B",
    intensity2: "80%",
    color3: "#2F1107",
    intensity3: "100%",
  },
  {
    direction: "to bottom",
    color1: "#090401",
    intensity1: "50%",
    color2: "#4B1D06",
    intensity2: "100%",
  },
  {
    direction: "to bottom",
    color1: "#00000c",
    intensity1: "80%",
    color2: "#150800",
    intensity2: "100%",
  },
]


/*
primary : "#63ac20",
secondary: "#095a04",
light: "#f9f9f9",
contrast: "#717171"
*/

export { LightTheme, SkyGradient };
