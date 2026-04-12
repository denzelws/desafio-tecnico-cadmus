import { EmptyState } from "../../presentation/components/common/EmptyState";
import { renderWithProviders } from "../utils/renderWithProviders";

describe("EmptyState", () => {
  it("should render title correctly", () => {
    const { getByText } = renderWithProviders(
      <EmptyState title="Nenhuma escola encontrada" />,
    );
    expect(getByText("Nenhuma escola encontrada")).toBeTruthy();
  });

  it("should render description when provided", () => {
    const { getByText } = renderWithProviders(
      <EmptyState
        title="Nenhuma escola"
        description="Toque no botão para adicionar"
      />,
    );
    expect(getByText("Toque no botão para adicionar")).toBeTruthy();
  });
});
