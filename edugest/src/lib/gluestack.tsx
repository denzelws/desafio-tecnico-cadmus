import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Fab,
  FabIcon,
  FabLabel,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Input,
  InputField,
  InputSlot,
  Menu,
  MenuItem,
  MenuItemLabel,
  Pressable,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  Toast,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import { ElementType } from "react";

type GluestackComponent = React.FC<any>;

/**
 * Função utilitária para "limpar" a tipagem do Gluestack v1 no VS Code
 * O sistema de estilo do Gluestack v1 gera conflitos de tipos com
 * TypeScript 5+ devido à sua camada interna de styled-components.
 * O uso de `any` aqui é intencional e isolado — não afeta a
 * tipagem do restante do projeto.
 */
const wrap = (Component: ElementType): GluestackComponent =>
  Component as GluestackComponent;

export const GBox = wrap(Box);
export const GText = wrap(Text);
export const GHeading = wrap(Heading);
export const GVStack = wrap(VStack);
export const GHStack = wrap(HStack);
export const GPressable = wrap(Pressable);
export const GButton = wrap(Button);
export const GButtonText = wrap(ButtonText);
export const GButtonSpinner = wrap(ButtonSpinner);
export const GInput = wrap(Input);
export const GInputField = wrap(InputField);
export const GInputSlot = wrap(InputSlot);
export const GBadge = wrap(Badge);
export const GBadgeText = wrap(BadgeText);
export const GFab = wrap(Fab);
export const GFabIcon = wrap(FabIcon);
export const GFabLabel = wrap(FabLabel);
export const GFormControl = wrap(FormControl);
export const GFormControlLabel = wrap(FormControlLabel);
export const GFormControlLabelText = wrap(FormControlLabelText);
export const GFormControlError = wrap(FormControlError);
export const GFormControlErrorText = wrap(FormControlErrorText);
export const GSelect = wrap(Select);
export const GSelectTrigger = wrap(SelectTrigger);
export const GSelectInput = wrap(SelectInput);
export const GSelectPortal = wrap(SelectPortal);
export const GSelectBackdrop = wrap(SelectBackdrop);
export const GSelectContent = wrap(SelectContent);
export const GSelectItem = wrap(SelectItem);
export const GToast = wrap(Toast);
export const GToastTitle = wrap(ToastTitle);
export const GMenu = wrap(Menu);
export const GMenuItem = wrap(MenuItem);
export const GMenuItemLabel = wrap(MenuItemLabel);
export const GSelectDragIndicator = wrap(SelectDragIndicator);
export const GSelectDragIndicatorWrapper = wrap(SelectDragIndicatorWrapper);
