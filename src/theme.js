import createMuiTheme from "material-ui/styles/createMuiTheme";
import colors, {
  cyan100,
  cyan200,
  blue300,
  brown500,
  black
} from "material-ui/colors";

// usage #mixDark(c1, c2, c3, c4)
const mix = () => (
  primary1Color,
  primary2Color,
  primary3Color,
  accent1Color,
  accent2Color
) =>
  createMuiTheme({
    fontFamily: "font-secondary",
    rawTheme: { fontFamily: "font-secondary" },
    palette: {
      primary1Color,
      primary2Color,
      primary3Color,
      accent1Color,
      accent2Color
    }
  });

// const mixDark = mix(darkBaseTheme);
// const mixLight = mix(lightBaseTheme);
const mixLight = mix();

/*
All avilable color variables:
        primary1Color
        primary2Color
        primary3Color
        accent1Color
        accent2Color
        accent3Color
        textColor
        secondaryTextColor
        alternateTextColor
        canvasColor
        borderColor
        disabledColor
        pickerHeaderColor
        clockCircleColor
        shadowColor
*/

// basic
// eslint-disable-next-line
const theme0 = createMuiTheme();
const theme1 = createMuiTheme({
  palette: { type: 'dark' }
});

// beginning of https://designschool.canva.com/blog/website-color-schemes/
const NAVY_BLUE = "#18121E";
const GUN_METAL = "#233237";
const RUSTY_RED = "#984843";
const WARM_YELLOW = "#EAC67A";
const coolVsWarm = mixLight(NAVY_BLUE, GUN_METAL, RUSTY_RED, WARM_YELLOW);

const PAPAYA = "#E24E42";
const MUSTARD = "#E9B000";
const BLUSH = "#EB6E80";
const AQUA = "#008F95";
const boldAndPunchy = mixLight(PAPAYA, MUSTARD, BLUSH, AQUA);

const PRUSSIAN_BLUE = "#0b3c5d";
const SKY_BLUE = "#328cc1";
const GOLD_LEAF = "#d9B310";
const IVORY_BLACK = "#1D2731";
const elegantAndSophisticated = mixLight(
  PRUSSIAN_BLUE,
  SKY_BLUE,
  GOLD_LEAF,
  IVORY_BLACK
);

const NAVY_BLUE2 = "#0F1626";
const LEATHER = "#ab987a";
const CORAL = "#ff533d";
const EGGSHELL = "#f5f5f5";
const luxuriousAndModern = mixLight(NAVY_BLUE2, LEATHER, CORAL, EGGSHELL);

const AQUA2 = "#6bbaa7";
const SUNSHINE = "#fba100";
const LAVENDER = "#6c64bb";
const DUSTY_ROSE = "#b6a19e";
const coolAndCalm = mixLight(AQUA2, SUNSHINE, LAVENDER, DUSTY_ROSE);
// end of https://designschool.canva.com/blog/website-color-schemes/

window.colors = colors;

window.testColor = color => console.log("%c COLOR", `color: ${color}`);

const choice = theme1;
export default (window.theme = choice);
