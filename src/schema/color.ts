type DefaultTheme = {
    font: Object;
    palette: Palette;
}

type Font = {
    sans: string;
    mono: string;
}
type Palette = {
    primary: string;
    secondary: string;
    light: string;
    contrast:string;
}
const LightTheme: DefaultTheme = {
	font: {
		sans: "",
		mono: "",
	},
	palette: {
		primary : "#C1DB3C",
        secondary: "#39A845",
        light: "#f9f9f9",
        contrast: "#717171"
	},
};

/*
primary : "#63ac20",
secondary: "#095a04",
light: "#f9f9f9",
contrast: "#717171"
*/

export { LightTheme };