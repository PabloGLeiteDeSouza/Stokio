import { config } from '@gluestack-ui/config';
import { Theme } from '@react-navigation/native';

export const ColorsLightMode = {
  Text: {
    Title1: config.tokens.colors.textLight950,
    Title2: config.tokens.colors.textLight900,
    Title3: config.tokens.colors.textLight800,
    Title4: config.tokens.colors.textLight700,
    paragraph: config.tokens.colors.textLight600,
  },
};

export const ColorsDarkMode = {
  Text: {
    Title1: config.tokens.colors.textDark0,
    Title2: config.tokens.colors.textLight50,
    Title3: config.tokens.colors.textLight100,
    Title4: config.tokens.colors.textLight200,
    paragraph: config.tokens.colors.textLight300,
  },
};

export const ConfigTheme = {
  dark: {
    dark: true,
    colors: {
      background: config.tokens.colors.backgroundDark950,
      card: config.tokens.colors.backgroundDark900,
      border: config.tokens.colors.borderDark50,
      notification: config.tokens.colors.purple600,
      primary: config.tokens.colors.purple600,
      text: config.tokens.colors.textDark200,
    },
  } as Theme,
  light: {
    dark: false,
    colors: {
      background: config.tokens.colors.backgroundLight100,
      card: config.tokens.colors.backgroundLight0,
      border: config.tokens.colors.borderLight900,
      notification: config.tokens.colors.purple400,
      primary: config.tokens.colors.purple400,
      text: config.tokens.colors.textLight800,
    },
  } as Theme,
};

export const ColorsCards = {
  bgColorLight: config.tokens.colors.blueGray200,
  bgColorDark: config.tokens.colors.blueGray800,
};

export default { ColorsDarkMode, ColorsLightMode, ConfigTheme, ColorsCards };
