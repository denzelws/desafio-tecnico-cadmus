import { GBox } from "@/lib/gluestack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  fab?: React.ReactNode;
  bg?: string;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  header,
  fab,
  bg = "$trueGray50",
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <GBox flex={1} bg={bg}>
        {header}
        <GBox flex={1}>{children}</GBox>
        {fab}
      </GBox>
    </SafeAreaView>
  );
};
