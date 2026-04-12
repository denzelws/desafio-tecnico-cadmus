import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useSchools } from "../../application/hooks/useSchools";

jest.mock("../../application/services/schoolService", () => ({
  schoolService: {
    getAll: jest
      .fn()
      .mockResolvedValue([
        { id: "1", name: "Escola A", address: "Rua A", classCount: 0 },
      ]),
  },
}));

describe("useSchools", () => {
  it("should load schools on mount", async () => {
    const { result } = renderHook(() => useSchools());

    await waitFor(() => {
      expect(result.current.schools.length).toBeGreaterThan(0);
    });
  });

  it("should filter schools by search query", async () => {
    const { result } = renderHook(() => useSchools());

    await waitFor(() => {
      expect(result.current.schools.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.setSearchQuery("Escola A");
    });

    expect(result.current.schools[0].name).toBe("Escola A");
  });
});
