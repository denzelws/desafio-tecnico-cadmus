import { useSchoolStore } from "../../application/store/schoolStore";

describe("schoolStore", () => {
  beforeEach(() => {
    useSchoolStore.getState().setSchools([]);
  });

  it("should add a school", () => {
    const school = {
      id: "1",
      name: "Escola Teste",
      address: "Rua Teste, 100",
      classCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    useSchoolStore.getState().addSchool(school);

    const schools = useSchoolStore.getState().schools;
    expect(schools).toHaveLength(1);
    expect(schools[0].name).toBe("Escola Teste");
  });

  it("should remove a school", () => {
    const school = {
      id: "1",
      name: "Escola Teste",
      address: "Rua Teste, 100",
      classCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    useSchoolStore.getState().addSchool(school);
    useSchoolStore.getState().removeSchool("1");

    const schools = useSchoolStore.getState().schools;
    expect(schools).toHaveLength(0);
  });
});
