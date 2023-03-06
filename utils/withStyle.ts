import { SystemStyleObject, ChakraComponent, styled, As } from '@chakra-ui/react';

function withStyle<T extends As>(
  Component: T,
  baseStyle: SystemStyleObject,
): T extends string ? ChakraComponent<T>: T {
  return styled(Component, {baseStyle}) as never;
}
export default withStyle;