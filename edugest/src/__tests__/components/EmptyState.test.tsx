import { render } from "@testing-library/react-native";
import { EmptyState } from "../../presentation/components/common/EmptyState";

describe("EmptyState", () => {
  it("should render title correctly", () => {
    const { getByText } = render(
      <EmptyState title="Nenhuma escola encontrada" />,
    );

    expect(getByText("Nenhuma escola encontrada")).toBeTruthy();
  });

  it("should render description when provided", () => {
    const { getByText } = render(
      <EmptyState
        title="Nenhuma escola"
        description="Toque no botão para adicionar"
      />,
    );

    expect(getByText("Toque no botão para adicionar")).toBeTruthy();
  });
});
