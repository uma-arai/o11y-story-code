import { ComponentStyleConfig } from "@chakra-ui/react"

export const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {
    fontsize: "md",
    px: 2,
    py: 1,
    borderRadius: "5px",
  },
  sizes: {
    sm: {
      height: "30px",
    },
    md: {
      height: "40px",
    },
    lg: {
      height: "50px",
    },
  },
  variants: {
    primary: {
      backgroundColor: "primary.100",
      color: "text.contrasted",
      _hover: {
        bg: "primary.70",
        _disabled: { bg: "primary.40" },
      },
      _disabled: {
        background: "primary.40",
      },
    },
    secondary: {
      backgroundColor: "grey.100",
      color: "text.contrasted",
      _hover: {
        bg: "grey.70",
        _disabled: { bg: "grey.40" },
      },
      _disabled: { bg: "grey.40" },
    },
  },
  defaultProps: {
    size: "md",
    variant: "primary",
  },
}
