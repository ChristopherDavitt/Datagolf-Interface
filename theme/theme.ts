import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { components } from "./components";
import { semanticTokens } from "./semanticTokens";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config: config,
  components: {
    ...components,
  },
  semanticTokens: {
    ...semanticTokens,
  },
})
export default theme;