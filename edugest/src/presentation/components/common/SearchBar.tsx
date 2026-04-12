import { GBox, GInput, GInputField, GInputSlot } from "@/lib/gluestack";
import { colors } from "@/presentation/theme/token";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Buscar...",
}) => (
  <GBox px="$4" py="$2">
    <GInput variant="rounded" size="md" bg="$trueGray100">
      <GInputSlot pl="$3">
        <Ionicons name="search" size={18} color={colors.on_surface_muted} />
      </GInputSlot>
      <GInputField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </GInput>
  </GBox>
);
