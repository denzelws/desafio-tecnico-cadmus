import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "edugest",
  slug: "edugest",
  extra: {
    useMSW: process.env.APP_ENV === "development",
  },
};

export default config;
