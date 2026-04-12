import { GBox } from "@/lib/gluestack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f5f9",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
      }}
    >
      <Ionicons name="search" size={18} color="#94A3B8" />
      <TextInput
        style={{ flex: 1, marginLeft: 8, fontSize: 16, color: "#011e2e" }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        returnKeyType="search"
        blurOnSubmit={false}
      />
    </View>
  </GBox>
);
